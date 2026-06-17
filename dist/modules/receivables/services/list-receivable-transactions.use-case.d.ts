import { AppCacheService } from '../../../common/cache/cache.service';
import { ListReceivableTransactionsDto } from '../dto/list-receivable-transactions.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
export declare class ListReceivableTransactionsUseCase {
    private readonly receivablesRepository;
    private readonly cacheService?;
    constructor(receivablesRepository: ReceivablesRepository, cacheService?: AppCacheService | undefined);
    execute(receivableId: string, query: ListReceivableTransactionsDto, organizationId: string): Promise<Awaited<ReturnType<ReceivablesRepository['listTransactions']>>>;
}
