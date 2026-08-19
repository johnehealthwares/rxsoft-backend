import { Body, Controller, Get, Header, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { toCsv } from '../../../shared/utils/csv';
import { CreateStockAdjustmentDto } from '../dto/create-stock-adjustment.dto';
import { CreateStockTransferDto } from '../dto/create-stock-transfer.dto';
import { ListStockBalancesDto } from '../dto/list-stock-balances.dto';
import { ListStockMovementsDto } from '../dto/list-stock-movements.dto';
import { AdjustStockByReferenceDto } from '../dto/stock-locations.dto';
import { StockBalanceResponseDto } from '../dto/stock-balance-response.dto';
import { CreateStockAdjustmentUseCase } from '../services/create-stock-adjustment.use-case';
import { ListStockBalancesUseCase } from '../services/list-stock-balances.use-case';
import { ListStockMovementsUseCase } from '../services/list-stock-movements.use-case';
import { InventoryService } from '../services/inventory.service';

type InventoryListResponse<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number };
};

function mapBalance(balance: {
  id: string;
  item: { id: string; code: string | null; name: string };
  location: { id: string; name: string };
  lot: { id: string; code: string } | null;
  quantityOnHand: number;
  quantityReserved: number;
  averageCost: number;
  reorderMinQty: number | null;
  reorderMaxQty: number | null;
}): StockBalanceResponseDto {
  return {
    id: balance.id,
    item: balance.item,
    location: balance.location,
    lot: balance.lot,
    itemId: balance.item.id,
    locationId: balance.location.id,
    lotId: balance.lot?.id ?? null,
    quantityOnHand: balance.quantityOnHand,
    quantityReserved: balance.quantityReserved,
    averageCost: balance.averageCost,
    reorderMinQty: balance.reorderMinQty,
    reorderMaxQty: balance.reorderMaxQty,
  };
}

@ApiTags('inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly listStockBalancesUseCase: ListStockBalancesUseCase,
    private readonly listStockMovementsUseCase: ListStockMovementsUseCase,
    private readonly createStockAdjustmentUseCase: CreateStockAdjustmentUseCase,
    private readonly inventoryService: InventoryService,
  ) {}

  @Get('stock-balances')
  @Roles('admin', 'super_admin', 'inventory_clerk', 'pharmacist')
  @ApiOperation({ summary: 'List stock balances with pagination and filters' })
  async listStockBalances(
    @Query() query: ListStockBalancesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<InventoryListResponse<StockBalanceResponseDto>> {
    const result = await this.listStockBalancesUseCase.execute(query, currentUser.organizationId);

    return {
      data: result.items.map(mapBalance),
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Get('stock-movements')
  @Roles('admin', 'super_admin', 'inventory_clerk', 'pharmacist')
  @ApiOperation({ summary: 'List stock movements with pagination and optional movement type filter' })
  async listStockMovements(
    @Query() query: ListStockMovementsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<InventoryListResponse<Awaited<ReturnType<ListStockMovementsUseCase['execute']>>['items'][number]>> {
    const result = await this.listStockMovementsUseCase.execute(query, currentUser.organizationId);
    return {
      data: result.items,
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Get('stock-movements/export')
  @Roles('admin', 'super_admin', 'inventory_clerk')
  @ApiOperation({ summary: 'Export stock movements as CSV' })
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="stock_movements.csv"')
  async exportStockMovements(
    @Query() query: ListStockMovementsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<string> {
    const result = await this.listStockMovementsUseCase.execute(query, currentUser.organizationId);
    return toCsv(result.items as unknown as Array<Record<string, unknown>>);
  }

  @Post('adjustments')
  @Roles('admin', 'super_admin', 'inventory_clerk')
  @AuditAction('inventory.stock.adjust')
  @ApiOperation({ summary: 'Apply stock adjustment to an existing stock balance record' })
  async createAdjustment(
    @Body() payload: CreateStockAdjustmentDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StockBalanceResponseDto> {
    const result = await this.createStockAdjustmentUseCase.execute(
      payload,
      currentUser.sub,
      currentUser.organizationId,
    );
    return mapBalance(result);
  }

  @Post('adjust-quantity')
  @Roles('admin', 'super_admin', 'inventory_clerk')
  @AuditAction('inventory.stock.adjust_by_reference')
  @ApiOperation({ summary: 'Adjust stock quantity by product and location, creating balance if needed' })
  async adjustQuantity(
    @Body() payload: AdjustStockByReferenceDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StockBalanceResponseDto> {
    const result = await this.inventoryService.adjustByReference(
      payload,
      currentUser.sub,
      currentUser.organizationId,
    );
    return mapBalance(result);
  }

  @Post('transfers')
  @Roles('admin', 'super_admin', 'inventory_clerk')
  @AuditAction('inventory.stock.transfer')
  @ApiOperation({ summary: 'Transfer stock between locations' })
  async transferStock(
    @Body() payload: CreateStockTransferDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<{ message: string; fromBalance: StockBalanceResponseDto; toBalance: StockBalanceResponseDto }> {
    const result = await this.inventoryService.transfer(
      payload,
      currentUser.sub,
      currentUser.organizationId,
    );
    return {
      message: 'Stock transferred successfully',
      fromBalance: mapBalance(result.fromBalance),
      toBalance: mapBalance(result.toBalance),
    };
  }
}
