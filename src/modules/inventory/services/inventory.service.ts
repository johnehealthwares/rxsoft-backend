import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import type { StockBalanceType } from '../../../shared/domain';
import { toStockBalanceType } from '../../../shared/domain/mappers';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import type { InventoryRepository } from '../repositories/inventory.repository';
import { AdjustStockByReferenceDto } from '../dto/stock-locations.dto';
import { CreateStockTransferDto } from '../dto/create-stock-transfer.dto';
import { INVENTORY_REPOSITORY } from './inventory.di-tokens';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    @Optional()
    private readonly accountingIntegration?: AccountingIntegrationService,
  ) {}

  async list(query: ListQueryDto): Promise<{ data: Array<Record<string, unknown>>; total: number }> {
    const result = await this.inventoryRepository.listStockBalances({
      organizationId: DEFAULT_ORGANIZATION_ID,
      offset: query.offset,
      limit: query.limit,
    });

    return {
      data: result.items.map((item) => ({
        id: item.id,
        itemId: item.item.id,
        branchId: item.location.id,
        quantity: item.quantityOnHand,
        reorderLevel: 0,
        createdAt: null,
        updatedAt: null,
        archivedAt: null,
      })),
      total: result.total,
    };
  }

  async listAll(): Promise<Array<{ quantity: number }>> {
    const result = await this.inventoryRepository.listStockBalances({
      organizationId: DEFAULT_ORGANIZATION_ID,
      offset: 0,
      limit: 10000,
    });

    return result.items.map((item) => ({
      quantity: item.quantityOnHand,
    }));
  }

  async adjustByReference(
    payload: AdjustStockByReferenceDto,
    performedByUserId: string,
    organizationId: string,
  ): Promise<StockBalanceType> {
    const stockBalance = await this.inventoryRepository.adjustStockByReference({
      organizationId,
      itemId: payload.itemId,
      locationId: payload.locationId,
      lotId: payload.lotId ?? null,
      deltaQuantity: payload.deltaQuantity,
      reason: payload.reason,
      performedByUserId,
      uomId: payload.uomId ?? null,
      reorderMinQty: payload.reorderMinQty ?? null,
      reorderMaxQty: payload.reorderMaxQty ?? null,
    });

    if (this.accountingIntegration) {
      this.accountingIntegration
        .recordStockAdjustment(organizationId, {
          stockBalanceId: stockBalance.id,
          deltaQuantity: payload.deltaQuantity,
          reason: payload.reason,
          averageCost: stockBalance.averageCost,
        })
        .catch((err: Error) => this.logger.error(`Accounting: failed to record adjust-by-ref: ${err.message}`, err.stack));
    }

    return toStockBalanceType(stockBalance);
  }

  async transfer(
    payload: CreateStockTransferDto,
    performedByUserId: string,
    organizationId: string,
  ): Promise<{ fromBalance: StockBalanceType; toBalance: StockBalanceType }> {
    const result = await this.inventoryRepository.transferStock({
      organizationId,
      fromLocationId: payload.fromLocationId,
      toLocationId: payload.toLocationId,
      itemId: payload.itemId,
      lotId: payload.lotId ?? null,
      quantity: payload.quantity,
      reason: payload.reason ?? 'stock_transfer',
      performedByUserId,
    });

    if (this.accountingIntegration) {
      this.accountingIntegration
        .recordStockTransfer(organizationId, {
          itemId: payload.itemId,
          quantity: payload.quantity,
          fromLocationId: payload.fromLocationId,
          toLocationId: payload.toLocationId,
        })
        .catch((err: Error) => this.logger.error(`Accounting: failed to record stock transfer: ${err.message}`, err.stack));
    }

    return {
      fromBalance: toStockBalanceType(result.fromBalance),
      toBalance: toStockBalanceType(result.toBalance),
    };
  }
}
