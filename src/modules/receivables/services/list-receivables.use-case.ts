import { Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { ListReceivablesDto } from '../dto/list-receivables.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
import { RECEIVABLES_REPOSITORY } from './receivables.di-tokens';

@Injectable()
export class ListReceivablesUseCase {
  constructor(
    @Inject(RECEIVABLES_REPOSITORY)
    private readonly receivablesRepository: ReceivablesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    query: ListReceivablesDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ReceivablesRepository['list']>>> {
    const key = [
      'receivables:list',
      organizationId,
      query.page,
      query.limit,
      query.status ?? '',
      query.customerId ?? '',
    ].join(':');
    const cached = await this.cacheService?.get<Awaited<ReturnType<ReceivablesRepository['list']>>>(key);
    if (cached) {
      return cached;
    }

    const result = await this.receivablesRepository.list({
      organizationId,
      offset: query.offset,
      limit: query.limit,
      status: query.status,
      customerId: query.customerId,
    });

    await this.cacheService?.set(key, result, 30);
    return result;
  }
}
