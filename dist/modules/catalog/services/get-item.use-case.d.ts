import { AppCacheService } from '../../../common/cache/cache.service';
import type { ItemRepository } from '../repositories/item.repository';
export declare class GetItemUseCase {
    private readonly productRepository;
    private readonly cacheService?;
    constructor(productRepository: ItemRepository, cacheService?: AppCacheService | undefined);
    execute(productId: string, organizationId: string): Promise<NonNullable<Awaited<ReturnType<ItemRepository['findById']>>>>;
}
