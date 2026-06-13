import { Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { INVENTORY_REPOSITORY } from './inventory.di-tokens';
import type { InventoryRepository } from '../repositories/inventory.repository';
import { ListStockBalancesDto } from '../dto/list-stock-balances.dto';

@Injectable()
export class ListStockBalancesUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    query: ListStockBalancesDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<InventoryRepository['listStockBalances']>>> {
    const key = [
      'inventory:list',
      organizationId,
      query.page,
      query.limit,
      query.itemId ?? '',
      query.locationId ?? '',
    ].join(':');
    const cached = await this.cacheService?.get<Awaited<ReturnType<InventoryRepository['listStockBalances']>>>(key);
    if (cached) {
      return cached;
    }

    const result = await this.inventoryRepository.listStockBalances({
      organizationId,
      offset: query.offset,
      limit: query.limit,
      itemId: query.itemId,
      locationId: query.locationId,
    });

    await this.cacheService?.set(key, result, 30);
    return result;
  }
}
