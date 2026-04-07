import { Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { ListReceivableTransactionsDto } from '../dto/list-receivable-transactions.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
import { RECEIVABLES_REPOSITORY } from './receivables.di-tokens';

@Injectable()
export class ListReceivableTransactionsUseCase {
  constructor(
    @Inject(RECEIVABLES_REPOSITORY)
    private readonly receivablesRepository: ReceivablesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    receivableId: string,
    query: ListReceivableTransactionsDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<ReceivablesRepository['listTransactions']>>> {
    const key = [
      'receivables:tx',
      organizationId,
      receivableId,
      query.page,
      query.limit,
      query.transactionType ?? '',
    ].join(':');
    const cached = await this.cacheService?.get<
      Awaited<ReturnType<ReceivablesRepository['listTransactions']>>
    >(key);
    if (cached) {
      return cached;
    }

    // Read-only query: pagination and filter are pushed to repository for efficient DB execution.
    const result = await this.receivablesRepository.listTransactions({
      organizationId,
      receivableId,
      offset: query.offset,
      limit: query.limit,
      transactionType: query.transactionType,
    });

    await this.cacheService?.set(key, result, 30);
    return result;
  }
}
