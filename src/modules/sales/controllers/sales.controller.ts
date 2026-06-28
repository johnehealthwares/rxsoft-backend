import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
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
import { SaleResponseDto } from '../dto/sale-response.dto';
import { CreateSaleRefundUseCase } from '../services/create-sale-refund.use-case';
import { CreateSaleUseCase } from '../services/create-sale.use-case';
import { ListSalesUseCase } from '../services/list-sales.use-case';
import { SALES_REPOSITORY } from '../services/sales.di-tokens';
import type { SalesRepository, SalesMetricsQuery } from '../repositories/sales.repository';

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
  ) {}

  @Get()
  @Roles('admin', 'super_admin', 'cashier', 'auditor')
  @ApiOperation({ summary: 'List sales with pagination and optional status filter' })
  async listSales(
    @Query() query: ListSalesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<SalesListResponse> {
    const result = await this.listSalesUseCase.execute(query, currentUser.organizationId);

    return {
      data: result.items.map((sale): SaleResponseDto => ({
        id: sale.id,
        saleNumber: sale.saleNumber,
        saleChannel: sale.saleChannel,
        storeId: sale.storeId,
        storeName: sale.storeName,
        status: sale.status,
        totalAmount: sale.totalAmount,
        paidAmount: sale.paidAmount,
        changeAmount: sale.changeAmount,
        saleDate: new Date(sale.saleDate).toISOString(),
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
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
