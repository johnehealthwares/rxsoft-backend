import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DEFAULT_ORGANIZATION_ID, DEFAULT_SYSTEM_USER_ID, DEFAULT_UOM_ID } from '../../../shared/constants/persistence-scope';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { WarehouseOrmEntity } from '../../inventory/entities';
import { CreatePurchaseDto, PurchaseLineDto, UpdatePurchaseDto } from '../dto/purchases.dto';
import { PurchaseOrderLineOrmEntity, PurchaseOrderOrmEntity } from '../entities';

type PurchaseSummaryType = {
  id: string;
  supplierId: string;
  warehouseId: string;
  branchId: string;
  currencyCode: string;
  orderDate: string;
  expectedDate: string | null;
  totalCost: number;
  invoiceNumber: string;
  status: 'draft' | 'approved' | 'partially_received' | 'received' | 'cancelled';
  note: string | null;
  lines: Array<{
    id: string;
    itemId: string;
    orderedQty: number;
    receivedQty: number;
    uomId: string;
    unitCost: number;
    discountPercent: number;
    taxPercent: number;
    lineSubtotal: number;
    lineTotal: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: null;
};

@Injectable()
export class PurchasesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(PurchaseOrderOrmEntity)
    private readonly purchaseOrderRepository: Repository<PurchaseOrderOrmEntity>,
    @InjectRepository(PurchaseOrderLineOrmEntity)
    private readonly purchaseOrderLineRepository: Repository<PurchaseOrderLineOrmEntity>,
    @InjectRepository(WarehouseOrmEntity)
    private readonly warehouseRepository: Repository<WarehouseOrmEntity>,
  ) {}

  async list(query: ListQueryDto, organizationId = DEFAULT_ORGANIZATION_ID): Promise<{ data: PurchaseSummaryType[]; total: number }> {
    const qb = this.purchaseOrderRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.lines', 'line')
      .where('purchase.organization_id = :organizationId', { organizationId });

    if (query.search) {
      qb.andWhere('(purchase.purchase_order_number LIKE :search OR purchase.status LIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    if (query.filter) {
      qb.andWhere('(purchase.purchase_order_number LIKE :filter OR purchase.status LIKE :filter)', {
        filter: `%${query.filter}%`,
      });
    }

    qb.orderBy(this.resolveSortColumn(query.sortBy), query.sortOrder.toUpperCase() as 'ASC' | 'DESC')
      .skip(query.offset)
      .take(query.limit);

    const [rows, total] = await qb.getManyAndCount();

    return {
      data: rows.map((row) => {
        const firstLine = row.lines[0] ?? null;
        return {
          id: row.id,
          supplierId: row.supplierId,
          warehouseId: row.warehouseId,
          branchId: row.warehouseId,
          currencyCode: row.currencyCode,
          orderDate: row.orderDate,
          expectedDate: row.expectedDate,
          totalCost: Number(row.totalAmount),
          invoiceNumber: row.purchaseOrderNumber,
          status: row.status,
          note: row.note,
          lines: row.lines.map((line) => this.mapLine(line)),
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          archivedAt: null,
        };
      }),
      total,
    };
  }

  async createPurchase(payload: CreatePurchaseDto, currentUser: RequestUser): Promise<PurchaseSummaryType> {
    return this.dataSource.transaction(async (manager) => {
      const purchaseOrderRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const purchaseOrderLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);
      const warehouseRepo = manager.getRepository(WarehouseOrmEntity);

      const warehouse = await this.resolveWarehouse(payload.warehouseId ?? payload.branchId ?? '', warehouseRepo, currentUser.organizationId);
      const linesPayload = this.normalizeLines(payload);
      const totals = this.calculateTotals(linesPayload);
      const purchaseOrderNumber = payload.purchaseOrderNumber?.trim() || payload.invoiceNumber?.trim() || `PO-${Date.now()}`;

      const purchaseOrder = await purchaseOrderRepo.save(
        purchaseOrderRepo.create({
          organizationId: currentUser.organizationId,
          purchaseOrderNumber,
          supplierId: payload.supplierId,
          warehouseId: warehouse.id,
          currencyCode: payload.currencyCode ?? 'USD',
          orderDate: payload.orderDate ?? new Date().toISOString().slice(0, 10),
          expectedDate: payload.expectedDate ?? null,
          status: payload.status ?? 'draft',
          subtotalAmount: totals.subtotalAmount,
          taxAmount: totals.taxAmount,
          totalAmount: totals.totalAmount,
          createdByUserId: currentUser.sub ?? DEFAULT_SYSTEM_USER_ID,
          approvedByUserId: payload.status === 'approved' || payload.status === 'received' ? currentUser.sub ?? DEFAULT_SYSTEM_USER_ID : null,
          approvedAt: payload.status === 'approved' || payload.status === 'received' ? new Date() : null,
          note: payload.note ?? null,
        }),
      );

      const lines = await purchaseOrderLineRepo.save(
        linesPayload.map((line) =>
          purchaseOrderLineRepo.create({
            purchaseOrder,
      itemId: line.itemId,
            orderedQty: line.orderedQty,
            receivedQty: line.receivedQty ?? 0,
            uomId: line.uomId,
            unitCost: line.unitCost,
            discountPercent: line.discountPercent ?? 0,
            taxPercent: line.taxPercent ?? 0,
            lineSubtotal: this.computeLineSubtotal(line),
            lineTotal: this.computeLineTotal(line),
          }),
        ),
      );

      return {
        id: purchaseOrder.id,
        supplierId: purchaseOrder.supplierId,
        warehouseId: purchaseOrder.warehouseId,
        branchId: purchaseOrder.warehouseId,
        currencyCode: purchaseOrder.currencyCode,
        orderDate: purchaseOrder.orderDate,
        expectedDate: purchaseOrder.expectedDate,
        totalCost: Number(purchaseOrder.totalAmount),
        invoiceNumber: purchaseOrder.purchaseOrderNumber,
        status: purchaseOrder.status,
        note: purchaseOrder.note,
        lines: lines.map((line) => this.mapLine(line)),
        createdAt: purchaseOrder.createdAt,
        updatedAt: purchaseOrder.updatedAt,
        archivedAt: null,
      };
    });
  }

  private async resolveWarehouse(idOrCode: string, repo: Repository<WarehouseOrmEntity>, organizationId: string): Promise<WarehouseOrmEntity> {
    if (!idOrCode) throw new BadRequestException('warehouseId is required');
    const byId = await repo.findOne({ where: { id: idOrCode, organizationId } });
    if (byId) {
      return byId;
    }

    const byCode = await repo.findOne({ where: { code: idOrCode, organizationId } });
    if (byCode) {
      return byCode;
    }

    return repo.save(
      repo.create({
        organizationId,
        storeId: null,
        code: idOrCode,
        name: `Warehouse ${idOrCode}`,
        isActive: true,
      }),
    );
  }

  async getById(purchaseId: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<PurchaseSummaryType> {
    const row = await this.purchaseOrderRepository.findOne({
      where: { id: purchaseId, organizationId },
      relations: ['lines'],
    });

    if (!row) {
      throw new NotFoundException('Purchase order not found');
    }

    const firstLine = row.lines[0] ?? null;
    return {
      id: row.id,
      supplierId: row.supplierId,
      warehouseId: row.warehouseId,
      branchId: row.warehouseId,
      currencyCode: row.currencyCode,
      orderDate: row.orderDate,
      expectedDate: row.expectedDate,
      totalCost: Number(row.totalAmount),
      invoiceNumber: row.purchaseOrderNumber,
      status: row.status,
      note: row.note,
      lines: row.lines.map((line) => this.mapLine(line)),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      archivedAt: null,
    };
  }

  async updatePurchase(purchaseId: string, payload: UpdatePurchaseDto, currentUser: RequestUser): Promise<PurchaseSummaryType> {
    return this.dataSource.transaction(async (manager) => {
      const purchaseOrderRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const purchaseOrderLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);
      const warehouseRepo = manager.getRepository(WarehouseOrmEntity);

      const order = await purchaseOrderRepo.findOne({
        where: { id: purchaseId, organizationId: currentUser.organizationId },
        relations: ['lines'],
      });
      if (!order) throw new NotFoundException('Purchase order not found');

      if (payload.supplierId !== undefined) order.supplierId = payload.supplierId;
      if (payload.warehouseId !== undefined || payload.branchId !== undefined) {
        const warehouse = await this.resolveWarehouse(payload.warehouseId ?? payload.branchId ?? '', warehouseRepo, currentUser.organizationId);
        order.warehouseId = warehouse.id;
      }
      if (payload.purchaseOrderNumber !== undefined) order.purchaseOrderNumber = payload.purchaseOrderNumber;
      if (payload.invoiceNumber !== undefined && payload.purchaseOrderNumber === undefined) order.purchaseOrderNumber = payload.invoiceNumber;
      if (payload.currencyCode !== undefined) order.currencyCode = payload.currencyCode;
      if (payload.orderDate !== undefined) order.orderDate = payload.orderDate;
      if (payload.expectedDate !== undefined) order.expectedDate = payload.expectedDate ?? null;
      if (payload.status !== undefined) {
        order.status = payload.status;
        order.approvedByUserId =
          payload.status === 'approved' || payload.status === 'received' ? currentUser.sub ?? DEFAULT_SYSTEM_USER_ID : order.approvedByUserId;
        order.approvedAt = payload.status === 'approved' || payload.status === 'received' ? new Date() : order.approvedAt;
      }
      if (payload.note !== undefined) order.note = payload.note ?? null;

      if (payload.lines || payload.itemId || payload.quantity || payload.unitCost) {
        await purchaseOrderLineRepo.delete({ purchaseOrder: { id: order.id } });
        const linesPayload = this.normalizeLines(payload);
        const totals = this.calculateTotals(linesPayload);
        order.subtotalAmount = totals.subtotalAmount;
        order.taxAmount = totals.taxAmount;
        order.totalAmount = totals.totalAmount;
        order.lines = await purchaseOrderLineRepo.save(
          linesPayload.map((line) =>
            purchaseOrderLineRepo.create({
              purchaseOrder: order,
            itemId: line.itemId,
              orderedQty: line.orderedQty,
              receivedQty: line.receivedQty ?? 0,
              uomId: line.uomId,
              unitCost: line.unitCost,
              discountPercent: line.discountPercent ?? 0,
              taxPercent: line.taxPercent ?? 0,
              lineSubtotal: this.computeLineSubtotal(line),
              lineTotal: this.computeLineTotal(line),
            }),
          ),
        );
      }

      const saved = await purchaseOrderRepo.save(order);
      return this.getById(saved.id, currentUser.organizationId);
    });
  }

  async removePurchase(purchaseId: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<void> {
    const result = await this.purchaseOrderRepository.delete({ id: purchaseId, organizationId });
    if (!result.affected) throw new NotFoundException('Purchase order not found');
  }

  private resolveSortColumn(sortBy: string): string {
    const map: Record<string, string> = {
      status: 'purchase.status',
      invoiceNumber: 'purchase.purchase_order_number',
      totalCost: 'purchase.total_amount',
      updatedAt: 'purchase.updated_at',
      createdAt: 'purchase.created_at',
    };

    return map[sortBy] ?? 'purchase.created_at';
  }

  private normalizeLines(payload: CreatePurchaseDto | UpdatePurchaseDto): PurchaseLineDto[] {
    if (payload.lines?.length) {
      return payload.lines;
    }

    if (!payload.itemId || !payload.quantity || payload.unitCost === undefined) {
      throw new BadRequestException('Either lines or itemId/quantity/unitCost must be provided');
    }

    return [
      {
        itemId: payload.itemId,
        orderedQty: payload.quantity,
        receivedQty: payload.quantity,
        uomId: DEFAULT_UOM_ID,
        unitCost: payload.unitCost,
        discountPercent: 0,
        taxPercent: 0,
      },
    ];
  }

  private computeLineSubtotal(line: PurchaseLineDto): number {
    const gross = Number(line.orderedQty) * Number(line.unitCost);
    const discount = gross * (Number(line.discountPercent ?? 0) / 100);
    return Number((gross - discount).toFixed(2));
  }

  private computeLineTotal(line: PurchaseLineDto): number {
    const subtotal = this.computeLineSubtotal(line);
    const tax = subtotal * (Number(line.taxPercent ?? 0) / 100);
    return Number((subtotal + tax).toFixed(2));
  }

  private calculateTotals(lines: PurchaseLineDto[]): { subtotalAmount: number; taxAmount: number; totalAmount: number } {
    const subtotalAmount = Number(lines.reduce((sum, line) => sum + this.computeLineSubtotal(line), 0).toFixed(2));
    const totalAmount = Number(lines.reduce((sum, line) => sum + this.computeLineTotal(line), 0).toFixed(2));
    return {
      subtotalAmount,
      taxAmount: Number((totalAmount - subtotalAmount).toFixed(2)),
      totalAmount,
    };
  }

  private mapLine(line: PurchaseOrderLineOrmEntity) {
    return {
      id: line.id,
      itemId: line.itemId,
      orderedQty: Number(line.orderedQty),
      receivedQty: Number(line.receivedQty),
      uomId: line.uomId,
      unitCost: Number(line.unitCost),
      discountPercent: Number(line.discountPercent),
      taxPercent: Number(line.taxPercent),
      lineSubtotal: Number(line.lineSubtotal),
      lineTotal: Number(line.lineTotal),
    };
  }
}
