import { Inject, Injectable } from '@nestjs/common';
import { ITEM_REPOSITORY } from './catalog.di-tokens';
import type { ItemRepository } from '../repositories/item.repository';
import { ListItemDependenciesDto } from '../dto/list-item-dependencies.dto';

@Injectable()
export class ListItemDependenciesUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
  ) {}

  async listCategories(
    payload: ListItemDependenciesDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ItemRepository['listCategories']>>> {
    return this.productRepository.listCategories({
      organizationId,
      offset: payload.offset,
      limit: payload.limit,
      search: payload.search,
    });
  }

  async listGenericProducts(
    payload: ListItemDependenciesDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ItemRepository['listGenericProducts']>>> {
    return this.productRepository.listGenericProducts({
      organizationId,
      offset: payload.offset,
      limit: payload.limit,
      search: payload.search,
    });
  }

  async listUoms(
    payload: ListItemDependenciesDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ItemRepository['listUoms']>>> {
    return this.productRepository.listUoms({
      organizationId,
      offset: payload.offset,
      limit: payload.limit,
      search: payload.search,
    });
  }
}
