import { AppCacheService } from '../../../common/cache/cache.service';
import { ListReceivablesDto } from '../dto/list-receivables.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
export declare class ListReceivablesUseCase {
    private readonly receivablesRepository;
    private readonly cacheService?;
    constructor(receivablesRepository: ReceivablesRepository, cacheService?: AppCacheService | undefined);
    execute(query: ListReceivablesDto, organizationId: string): Promise<Awaited<ReturnType<ReceivablesRepository['list']>>>;
}
