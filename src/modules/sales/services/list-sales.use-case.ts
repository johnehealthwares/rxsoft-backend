import { Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { ListSalesDto } from '../dto/list-sales.dto';
import type { SalesRepository } from '../repositories/sales.repository';
import { SALES_REPOSITORY } from './sales.di-tokens';

@Injectable()
export class ListSalesUseCase {
  constructor(
    @Inject(SALES_REPOSITORY)
    private readonly salesRepository: SalesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    query: ListSalesDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<SalesRepository['list']>>> {
    const key = ['sales:list', organizationId, query.page, query.limit, query.status ?? ''].join(':');
    const cached = await this.cacheService?.get<Awaited<ReturnType<SalesRepository['list']>>>(key);
    if (cached) {
      return cached;
    }

    const result = await this.salesRepository.list({
      organizationId,
      offset: query.offset,
      limit: query.limit,
      status: query.status,
    });

    await this.cacheService?.set(key, result, 30);
    return result;
  }
}
