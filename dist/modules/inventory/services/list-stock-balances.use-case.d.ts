import { AppCacheService } from '../../../common/cache/cache.service';
import type { InventoryRepository } from '../repositories/inventory.repository';
import { ListStockBalancesDto } from '../dto/list-stock-balances.dto';
export declare class ListStockBalancesUseCase {
    private readonly inventoryRepository;
    private readonly cacheService?;
    constructor(inventoryRepository: InventoryRepository, cacheService?: AppCacheService | undefined);
    execute(query: ListStockBalancesDto, organizationId: string): Promise<Awaited<ReturnType<InventoryRepository['listStockBalances']>>>;
}
