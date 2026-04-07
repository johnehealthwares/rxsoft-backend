import { Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { PRODUCT_REPOSITORY } from './catalog.di-tokens';
import type { ProductRepository } from '../repositories/product.repository';
import { ListProductsDto } from '../dto/list-products.dto';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    payload: ListProductsDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ProductRepository['list']>>> {
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

    const cached = await this.cacheService?.get<Awaited<ReturnType<ProductRepository['list']>>>(key);
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
