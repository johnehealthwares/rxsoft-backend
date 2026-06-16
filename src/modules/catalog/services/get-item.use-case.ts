import { Inject, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { ITEM_REPOSITORY } from './catalog.di-tokens';
import type { ItemRepository } from '../repositories/item.repository';

@Injectable()
export class GetItemUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(productId: string, organizationId: string): Promise<NonNullable<Awaited<ReturnType<ItemRepository['findById']>>>> {
    const key = `catalog:get:${organizationId}:${productId}`;
    const cached = await this.cacheService?.get<Awaited<ReturnType<ItemRepository['findById']>>>(key);
    if (cached) {
      return cached;
    }

    const product = await this.productRepository.findById(productId, organizationId, false);
    if (!product) {
      throw new NotFoundException('Item not found');
    }

    await this.cacheService?.set(key, product, 120);
    return product;
  }
}
