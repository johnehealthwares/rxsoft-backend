import { Inject, Injectable } from '@nestjs/common';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import type { StockBalanceType } from '../../../shared/domain';
import { toStockBalanceType } from '../../../shared/domain/mappers';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { InventoryRepository } from '../repositories/inventory.repository';
import { AdjustStockByReferenceDto } from '../dto/stock-locations.dto';
import { CreateStockTransferDto } from '../dto/create-stock-transfer.dto';
import { INVENTORY_REPOSITORY } from './inventory.di-tokens';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
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

    return {
      fromBalance: toStockBalanceType(result.fromBalance),
      toBalance: toStockBalanceType(result.toBalance),
    };
  }
}
