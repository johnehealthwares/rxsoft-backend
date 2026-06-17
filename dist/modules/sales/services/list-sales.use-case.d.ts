import { AppCacheService } from '../../../common/cache/cache.service';
import { ListSalesDto } from '../dto/list-sales.dto';
import type { SalesRepository } from '../repositories/sales.repository';
export declare class ListSalesUseCase {
    private readonly salesRepository;
    private readonly cacheService?;
    constructor(salesRepository: SalesRepository, cacheService?: AppCacheService | undefined);
    execute(query: ListSalesDto, organizationId: string): Promise<Awaited<ReturnType<SalesRepository['list']>>>;
}
