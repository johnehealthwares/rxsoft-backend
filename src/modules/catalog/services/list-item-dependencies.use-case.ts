import { Inject, Injectable } from '@nestjs/common';
import { ITEM_REPOSITORY } from './catalog.di-tokens';
import type { ItemRepository } from '../repositories/item.repository';
import { ListItemDependenciesDto } from '../dto/list-item-dependencies.dto';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';

@Injectable()
export class ListItemDependenciesUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
    private readonly genericDrugCache: GenericDrugCacheService,
  ) {}

  async listCategories(
    payload: ListItemDependenciesDto,
    _organizationId: string,
  ): Promise<Awaited<ReturnType<ItemRepository['listCategories']>>> {
    return this.productRepository.listCategories({
      offset: payload.offset,
      limit: payload.limit,
      search: payload.search,
    });
  }

  async listGenericProducts(
    payload: ListItemDependenciesDto,
    _organizationId: string,
  ): Promise<{ items: Array<{ id: string; code: string; name: string }>; total: number }> {
    const result = this.genericDrugCache.searchLightweight(
      payload.search ?? '',
      payload.offset,
      payload.limit,
    );
    return { items: result.items, total: result.total };
  }

  async listUoms(
    payload: ListItemDependenciesDto,
    _organizationId: string,
  ): Promise<Awaited<ReturnType<ItemRepository['listUoms']>>> {
    return this.productRepository.listUoms({
      offset: payload.offset,
      limit: payload.limit,
      search: payload.search,
    });
  }
}
