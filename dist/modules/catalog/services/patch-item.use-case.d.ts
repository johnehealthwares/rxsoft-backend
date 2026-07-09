import type { ItemRepository } from '../repositories/item.repository';
import { Item } from '../domains/item.entity';
import type { PatchItemDto } from '../dto/patch-item.dto';
import { AppCacheService } from "../../../common/cache/cache.service";
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
export declare class PatchItemUseCase {
    private readonly productRepository;
    private readonly genericDrugCache;
    private readonly cacheService?;
    constructor(productRepository: ItemRepository, genericDrugCache: GenericDrugCacheService, cacheService?: AppCacheService | undefined);
    execute(itemId: string, payload: PatchItemDto, organizationId: string): Promise<Item>;
}
