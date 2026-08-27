import { Body, Controller, Get, Header, Inject, NotFoundException, Param, Post, Query, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { CreateSaleRefundDto } from '../dto/create-sale-refund.dto';
import { CreateSaleResponseDto } from '../dto/create-sale-response.dto';
import { CreateSaleRefundResponseDto } from '../dto/create-sale-refund-response.dto';
import { ListSalesDto } from '../dto/list-sales.dto';
import { ListSalesLinesDto } from '../dto/list-sales-lines.dto';
import { SaleResponseDto } from '../dto/sale-response.dto';
import { SaleDetailResponseDto } from '../dto/sale-detail-response.dto';
import { CreateSaleRefundUseCase } from '../services/create-sale-refund.use-case';
import { CreateSaleUseCase } from '../services/create-sale.use-case';
import { ListSalesUseCase } from '../services/list-sales.use-case';
import { SALES_REPOSITORY } from '../services/sales.di-tokens';
import type { SalesRepository, SalesMetricsQuery } from '../repositories/sales.repository';
import { SaleOrmEntity } from '../entities/sale.orm-entity';
import { SaleLineOrmEntity } from '../entities/sale-line.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toCsv } from '../../../shared/utils/csv';
import { buildTableHtml, prepareExportRows } from '../../../shared/utils/export';
import { PrintPdfService } from '../../print/services/print-pdf.service';
import { applyFilters } from '../../../database/list';

type SalesListResponse = {
  data: SaleResponseDto[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('sales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sales')
export class SalesController {
  constructor(
    private readonly listSalesUseCase: ListSalesUseCase,
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly createSaleRefundUseCase: CreateSaleRefundUseCase,
    @Inject(SALES_REPOSITORY)
    private readonly salesRepository: SalesRepository,
    @InjectRepository(SaleOrmEntity)
    private readonly saleOrmRepository: Repository<SaleOrmEntity>,
    @InjectRepository(SaleLineOrmEntity)
    private readonly saleLineOrmRepository: Repository<SaleLineOrmEntity>,
    private readonly printPdfService: PrintPdfService,
  ) {}

  private toLineSortColumn(sortBy: string): string {
    const map: Record<string, string> = {
      lineNumber: 'line.lineNumber',
      quantity: 'line.quantity',
      unitPrice: 'line.unitPrice',
      lineTotal: 'line.lineTotal',
      saleDate: 'sale.saleDate',
      createdAt: 'line.createdAt',
    };
    return map[sortBy] ?? 'line.lineNumber';
  }

  @Get('metrics')
  @Roles('super_admin', 'admin')
  @ApiOperation({ summary: 'Get sales metrics' })
  async metrics(
    @Query() query: ListSalesDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const metricsQuery: SalesMetricsQuery = {
      organizationId: currentUser.organizationId,
      search: query.search,
    };
    return this.salesRepository.getMetrics(metricsQuery);
  }

  @Get('export')
  @Roles('admin', 'super_admin', 'cashier', 'auditor')
  @Header('Content-Type', 'text/csv')
  @ApiOperation({ summary: 'Export sales as CSV' })
  async exportCsv(
    @Query() query: ListSalesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<string> {
    query.page = 1;
    query.limit = 1000000;
    const result = await this.listSalesUseCase.execute(query, currentUser.organizationId);
    const rows = result.items.map((sale) => this.toListResponse(sale));
    return toCsv(prepareExportRows(rows as unknown as Array<Record<string, unknown>>));
  }

  @Get('export/pdf')
  @Roles('admin', 'super_admin', 'cashier', 'auditor')
  @ApiOperation({ summary: 'Export sales as PDF' })
  async exportPdf(
    @Query() query: ListSalesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StreamableFile> {
    query.page = 1;
    query.limit = 1000000;
    const result = await this.listSalesUseCase.execute(query, currentUser.organizationId);
    const rows = prepareExportRows(result.items.map((sale) => this.toListResponse(sale)) as unknown as Array<Record<string, unknown>>);
    const { buffer, filename } = await this.printPdfService.generatePdf(
      buildTableHtml(rows, 'Sales Export'),
      { filename: 'sales.pdf' },
    );
    return new StreamableFile(buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${filename}"`,
    });
  }

  @Get('lines')
  @Roles('admin', 'super_admin', 'cashier', 'auditor')
  @ApiOperation({ summary: 'List sale lines with filters and pagination' })
  async listSalesLines(
    @Query() query: ListSalesLinesDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const qb = this.saleLineOrmRepository
      .createQueryBuilder('line')
      .innerJoinAndSelect('line.sale', 'sale')
      .innerJoinAndSelect('line.item', 'item')
      .innerJoinAndSelect('line.uom', 'uom')
      .where('sale.organization_id = :organizationId', {
        organizationId: currentUser.organizationId,
      });

    if (query.saleId) {
      qb.andWhere('sale.id = :saleId', { saleId: query.saleId });
    }

    if (query.search) {
      if (query.search.trim().startsWith('{')) {
        try {
          const filters: Record<string, string> = JSON.parse(query.search);
          const mapped: Record<string, string> = {};
          for (const [key, raw] of Object.entries(filters)) {
            if (!raw) {continue;}
            mapped[this.toLineFilterColumn(key)] = raw;
          }
          applyFilters(qb, 'line', mapped);
          return this.buildSalesLinesResponse(qb, query);
        } catch {
          // Not a filter DSL — fall through to plain ILIKE below.
        }
      }
      qb.andWhere(
        '(item.name ILIKE :search OR item.code ILIKE :search OR sale.sale_number ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return this.buildSalesLinesResponse(qb, query);
  }

  private toLineFilterColumn(key: string): string {
    const map: Record<string, string> = {
      saleNumber: 'sale.saleNumber',
      itemName: 'item.name',
      itemCode: 'item.code',
      uomName: 'uom.name',
      status: 'sale.status',
    };
    return map[key] ?? `line.${key}`;
  }

  private async buildSalesLinesResponse(
    qb: import('typeorm').SelectQueryBuilder<SaleLineOrmEntity>,
    query: ListSalesLinesDto,
  ) {
    const total = await qb.clone().orderBy().getCount();
    const rows = await qb
      .orderBy(this.toLineSortColumn(query.sortBy), query.sortOrder.toUpperCase() as 'ASC' | 'DESC')
      .skip(query.offset)
      .take(query.limit)
      .getMany();

    return {
      data: rows.map((line) => ({
        id: line.id,
        lineNumber: line.lineNumber,
        saleId: line.sale.id,
        saleNumber: line.sale.saleNumber,
        saleDate: line.sale.saleDate.toISOString(),
        status: line.sale.status,
        itemId: line.item.id,
        itemCode: line.item.code ?? null,
        itemName: line.item.name,
        uomId: line.uom?.id ?? null,
        uomName: line.uom?.name ?? null,
        quantity: Number(line.quantity),
        unitPrice: Number(line.unitPrice),
        discountPercent: Number(line.discountPercent ?? 0),
        taxPercent: Number(line.taxPercent ?? 0),
        lineSubtotal: Number(line.lineSubtotal),
        lineTotal: Number(line.lineTotal),
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        total,
      },
    };
  }

  @Get(':saleId')
  @Roles('admin', 'super_admin', 'cashier', 'auditor')
  @ApiOperation({ summary: 'Get sale detail by ID' })
  @ApiResponse({ status: 200, type: SaleDetailResponseDto })
  async getSale(
    @Param('saleId') saleId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<SaleDetailResponseDto> {
    const entity = await this.saleOrmRepository.findOne({
      where: {
        id: saleId,
        ...(currentUser.organizationId ? { organizationId: currentUser.organizationId } : {}),
      },
      relations: [
        'customer',
        'lines',
        'lines.item',
        'lines.item.category',
        'lines.item.baseUom',
        'lines.item.saleUom',
        'lines.uom',
        'payments',
        'payments.paymentMethod',
      ],
    });
    if (!entity) throw new NotFoundException('Sale not found');

    return {
      id: entity.id,
      saleNumber: entity.saleNumber,
      saleChannel: entity.saleChannel,
      customer: entity.customer
        ? {
            id: entity.customer.id,
            name: entity.customer.name,
            phone: entity.customer.phone ?? undefined,
            email: entity.customer.email ?? undefined,
          }
        : null,
      status: entity.status,
      totalAmount: entity.totalAmount,
      paidAmount: entity.paidAmount,
      lines: (entity.lines ?? []).map((line) => ({
        id: line.id,
        lineNumber: line.lineNumber,
        item: {
          id: line.item.id,
          code: null,
          name: line.item.name,
          category: line.item.category
            ? { id: line.item.category.id, name: line.item.category.name }
            : null,
          baseUomId: line.item.baseUomId,
          saleUomId: (line.item as any).saleUomId ?? undefined,
          saleUom: line.item.saleUom
            ? { id: line.item.saleUom.id, name: line.item.saleUom.name }
            : null,
          baseUom: line.item.baseUom
            ? { id: line.item.baseUom.id, name: line.item.baseUom.name }
            : null,
        },
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        lineTotal: line.lineTotal,
      })),
      payments: (entity.payments ?? []).map((payment) => ({
        id: payment.id,
        paymentMethod: {
          id: payment.paymentMethod.id,
          code: payment.paymentMethod.code,
          name: payment.paymentMethod.name,
          methodType: payment.paymentMethod.methodType,
          isActive: payment.paymentMethod.isActive,
        },
        amount: payment.amount,
      })),
      saleDate: entity.saleDate.toISOString(),
      notes: entity.notes ?? null,
    };
  }

  @Get(':saleId/receipt/pdf')
  @Roles('admin', 'super_admin', 'cashier', 'auditor')
  @ApiOperation({ summary: 'Print an A4 sales receipt as PDF' })
  async printReceipt(
    @Param('saleId') saleId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StreamableFile> {
    const entity = await this.saleOrmRepository.findOne({
      where: {
        id: saleId,
        ...(currentUser.organizationId ? { organizationId: currentUser.organizationId } : {}),
      },
      relations: [
        'customer',
        'lines',
        'lines.item',
        'lines.uom',
        'payments',
        'payments.paymentMethod',
      ],
    });
    if (!entity) throw new NotFoundException('Sale not found');

    const html = this.buildReceiptHtml(entity);
    const { buffer, filename } = await this.printPdfService.generatePdf(html, {
      filename: `receipt-${entity.saleNumber}.pdf`,
    });
    return new StreamableFile(buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${filename}"`,
    });
  }

  private escapeHtml(value: unknown): string {
    const raw =
      value == null
        ? ''
        : value instanceof Date
          ? value.toISOString()
          : typeof value === 'object'
            ? JSON.stringify(value)
            : String(value);
    return raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private buildReceiptHtml(entity: SaleOrmEntity & {
    customer?: { name?: string } | null;
    lines?: Array<{
      lineNumber: number;
      item: { id: string; code: string | null; name: string };
      uom?: { name?: string } | null;
      quantity: number;
      unitPrice: number;
      discountPercent: number;
      taxPercent: number;
      lineSubtotal: number;
      lineTotal: number;
    }>;
    payments?: Array<{ paymentMethod?: { name?: string } | null; amount: number; paidAt: Date }>;
  }): string {
    const linesHtml = (entity.lines ?? [])
      .map(
        (l) => `
      <tr>
        <td>${l.lineNumber}</td>
        <td>${this.escapeHtml(l.item.name)}</td>
        <td style="text-align:center">${Number(l.quantity)}</td>
        <td style="text-align:center">${this.escapeHtml(l.uom?.name ?? '')}</td>
        <td style="text-align:right">${Number(l.unitPrice).toFixed(2)}</td>
        <td style="text-align:right">${Number(l.lineTotal).toFixed(2)}</td>
      </tr>`,
      )
      .join('');

    const paymentsHtml = (entity.payments ?? [])
      .map(
        (p) => `
      <tr>
        <td>${this.escapeHtml(p.paymentMethod?.name ?? '')}</td>
        <td style="text-align:right">${Number(p.amount).toFixed(2)}</td>
        <td style="text-align:center">${new Date(p.paidAt).toLocaleString()}</td>
      </tr>`,
      )
      .join('');

    return `<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${this.escapeHtml(entity.saleNumber)}</title>
<style>
  body{font-family:Helvetica,Arial,sans-serif;color:#0f172a;padding:24px;}
  h1{font-size:22px;margin:0 0 4px;}
  .muted{color:#64748b;font-size:12px;}
  .info{display:flex;justify-content:space-between;margin:16px 0;border-bottom:2px solid #0f172a;padding-bottom:12px;}
  table{width:100%;border-collapse:collapse;font-size:12px;margin-top:8px;}
  th,td{border:1px solid #e2e8f0;padding:6px 8px;text-align:left;}
  th{background:#0f172a;color:#fff;}
  .totals{display:flex;justify-content:flex-end;margin-top:16px;font-size:14px;}
  .totals div{display:flex;gap:24px;}
  .total-row{border-top:2px solid #0f172a;font-weight:bold;}
  .footer{margin-top:24px;text-align:center;font-size:12px;color:#64748b;}
</style></head><body>
  <h1>${this.escapeHtml(entity.saleNumber)}</h1>
  <div class="muted">Sales Receipt</div>
  <div class="info">
    <div><strong>Customer:</strong> ${this.escapeHtml(entity.customer?.name ?? 'Walk-in')}</div>
    <div><strong>Date:</strong> ${new Date(entity.saleDate).toLocaleString()}</div>
    <div><strong>Status:</strong> ${this.escapeHtml(entity.status)}</div>
  </div>
  <table>
    <thead><tr><th>#</th><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:center">UOM</th><th style="text-align:right">Unit Price</th><th style="text-align:right">Line Total</th></tr></thead>
    <tbody>${linesHtml}</tbody>
  </table>
  <div class="totals">
    <div>
      <span>Total:</span><span>${Number(entity.totalAmount).toFixed(2)}</span>
      <span>Paid:</span><span>${Number(entity.paidAmount).toFixed(2)}</span>
      <span>Change:</span><span>${Number(entity.changeAmount).toFixed(2)}</span>
    </div>
  </div>
  <table>
    <thead><tr><th>Payment</th><th style="text-align:right">Amount</th><th style="text-align:center">Time</th></tr></thead>
    <tbody>${paymentsHtml}</tbody>
  </table>
  <div class="footer">Thank you for your patronage!</div>
</body></html>`;
  }

  @Get()
  @Roles('admin', 'super_admin', 'cashier', 'auditor')
  @ApiOperation({ summary: 'List sales with pagination and optional status filter' })
  async listSales(
    @Query() query: ListSalesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<SalesListResponse> {
    const result = await this.listSalesUseCase.execute(query, currentUser.organizationId);

    return {
      data: result.items.map((sale): SaleResponseDto => this.toListResponse(sale)),
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  private toListResponse(sale: {
    id: string;
    saleNumber: string;
    saleChannel: string;
    storeId: string;
    storeName: string | null;
    status: string;
    totalAmount: number;
    paidAmount: number;
    changeAmount: number;
    saleDate: Date;
  }): SaleResponseDto {
    return {
      id: sale.id,
      saleNumber: sale.saleNumber,
      saleChannel: sale.saleChannel as SaleResponseDto['saleChannel'],
      storeId: sale.storeId,
      storeName: sale.storeName,
      status: sale.status as SaleResponseDto['status'],
      totalAmount: sale.totalAmount,
      paidAmount: sale.paidAmount,
      changeAmount: sale.changeAmount,
      saleDate: new Date(sale.saleDate).toISOString(),
    };
  }

  @Post()
  @Roles('admin', 'super_admin', 'cashier')
  @AuditAction('sales.sale.create')
  @ApiOperation({ summary: 'Create posted sale and receivable on underpayment' })
  @ApiResponse({ status: 201, type: CreateSaleResponseDto })
  async createSale(
    @Body() payload: CreateSaleDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<CreateSaleResponseDto> {
    const result = await this.createSaleUseCase.execute(
      payload,
      currentUser.organizationId,
      currentUser.sub,
    );

    return {
      id: result.sale.id,
      saleNumber: result.sale.saleNumber,
      saleChannel: result.sale.saleChannel,
      storeId: result.sale.storeId,
      storeName: result.sale.storeName,
      status: result.sale.status,
      totalAmount: result.sale.totalAmount,
      paidAmount: result.sale.paidAmount,
      changeAmount: result.sale.changeAmount,
      saleDate: result.sale.saleDate.toISOString(),
      receivableCreated: result.receivableCreated,
      receivableId: result.receivableId,
      outstandingAmount: result.outstandingAmount,
    };
  }

  @Post(':saleId/refunds')
  @Roles('admin', 'super_admin', 'cashier')
  @AuditAction('sales.sale.refund.create')
  @ApiOperation({ summary: 'Create sale refund with quantity validation against original sale lines' })
  @ApiResponse({ status: 201, type: CreateSaleRefundResponseDto })
  async createRefund(
    @Param('saleId') saleId: string,
    @Body() payload: CreateSaleRefundDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<CreateSaleRefundResponseDto> {
    const result = await this.createSaleRefundUseCase.execute(
      saleId,
      payload,
      currentUser.organizationId,
      currentUser.sub,
    );

    return {
      id: result.id,
      saleId: result.saleId,
      refundNumber: result.refundNumber,
      status: result.status,
      totalAmount: result.totalAmount,
      refundDate: result.refundDate.toISOString(),
    };
  }
}
