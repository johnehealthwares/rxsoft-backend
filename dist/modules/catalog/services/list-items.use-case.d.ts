import { AppCacheService } from '../../../common/cache/cache.service';
import type { ItemRepository } from '../repositories/item.repository';
import { ListItemsDto } from '../dto/list-items.dto';
export declare class ListItemsUseCase {
    private readonly productRepository;
    private readonly cacheService?;
    constructor(productRepository: ItemRepository, cacheService?: AppCacheService | undefined);
    execute(payload: ListItemsDto, organizationId: string): Promise<Awaited<ReturnType<ItemRepository['list']>>>;
}
