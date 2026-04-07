import { Inject, Injectable } from '@nestjs/common';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import type { StockBalanceType } from '../../../shared/domain';
import { toStockBalanceType } from '../../../shared/domain/mappers';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { InventoryRepository } from '../repositories/inventory.repository';
import { AdjustStockByReferenceDto } from '../dto/stock-locations.dto';
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
        productId: item.product.id,
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
      productId: payload.productId,
      locationId: payload.locationId,
      lotId: payload.lotId ?? null,
      deltaQuantity: payload.deltaQuantity,
      reason: payload.reason,
      performedByUserId,
      reorderMinQty: payload.reorderMinQty ?? null,
      reorderMaxQty: payload.reorderMaxQty ?? null,
    });

    return toStockBalanceType(stockBalance);
  }
}
