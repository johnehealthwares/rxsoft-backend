import { Inject, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { PRODUCT_REPOSITORY } from './catalog.di-tokens';
import type { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(productId: string, organizationId: string): Promise<NonNullable<Awaited<ReturnType<ProductRepository['findById']>>>> {
    const key = `catalog:get:${organizationId}:${productId}`;
    const cached = await this.cacheService?.get<Awaited<ReturnType<ProductRepository['findById']>>>(key);
    if (cached) {
      return cached;
    }

    const product = await this.productRepository.findById(productId, organizationId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.cacheService?.set(key, product, 120);
    return product;
  }
}
