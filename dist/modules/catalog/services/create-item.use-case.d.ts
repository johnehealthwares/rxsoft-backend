import { AppCacheService } from '../../../common/cache/cache.service';
import { InventoryService } from '../../inventory/services/inventory.service';
import { PricingService } from '../../pricing/services/pricing.service';
import type { ItemRepository } from '../repositories/item.repository';
import { Item } from '../domains/item.entity';
import { CreateItemDto } from '../dto/create-item.dto';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
export declare class CreateItemUseCase {
    private readonly productRepository;
    private readonly cache;
    private readonly pricingService?;
    private readonly inventoryService?;
    private readonly cacheService?;
    constructor(productRepository: ItemRepository, cache: GenericDrugCacheService, pricingService?: PricingService | undefined, inventoryService?: InventoryService | undefined, cacheService?: AppCacheService | undefined);
    execute(payload: CreateItemDto, organizationId: string, performedByUserId?: string): Promise<Item>;
}
