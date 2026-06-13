import { Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { ITEM_REPOSITORY } from './catalog.di-tokens';
import type { ItemRepository } from '../repositories/item.repository';
import { ListItemsDto } from '../dto/list-items.dto';

@Injectable()
export class ListItemsUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    payload: ListItemsDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ItemRepository['list']>>> {
    const key = [
      'catalog:list',
      organizationId,
      payload.page,
      payload.limit,
      payload.search ?? '',
      payload.categoryCode ?? '',
      payload.sortBy,
      payload.sortOrder,
    ].join(':');

    const cached = await this.cacheService?.get<Awaited<ReturnType<ItemRepository['list']>>>(key);
    if (cached) {
      return cached;
    }
    const result = await this.productRepository.list({
      organizationId,
      offset: payload.offset,
      limit: payload.limit,
      search: payload.search,
      categoryCode: payload.categoryCode,
      sortBy: payload.sortBy,
      sortOrder: payload.sortOrder,
    });
    

    await this.cacheService?.set(key, result, 60);
    return result;
  }
}
