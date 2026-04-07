import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from './catalog.di-tokens';
import type { ProductRepository } from '../repositories/product.repository';
import { ListProductDependenciesDto } from '../dto/list-product-dependencies.dto';

@Injectable()
export class ListProductDependenciesUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async listCategories(
    payload: ListProductDependenciesDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ProductRepository['listCategories']>>> {
    return this.productRepository.listCategories({
      organizationId,
      offset: payload.offset,
      limit: payload.limit,
      search: payload.search,
    });
  }

  async listGenericProducts(
    payload: ListProductDependenciesDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ProductRepository['listGenericProducts']>>> {
    return this.productRepository.listGenericProducts({
      organizationId,
      offset: payload.offset,
      limit: payload.limit,
      search: payload.search,
    });
  }

  async listUoms(
    payload: ListProductDependenciesDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ProductRepository['listUoms']>>> {
    return this.productRepository.listUoms({
      organizationId,
      offset: payload.offset,
      limit: payload.limit,
      search: payload.search,
    });
  }
}
