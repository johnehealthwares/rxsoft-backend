import { AppCacheService } from '../../../common/cache/cache.service';
import { CreateStockAdjustmentDto } from '../dto/create-stock-adjustment.dto';
import type { InventoryRepository } from '../repositories/inventory.repository';
export declare class CreateStockAdjustmentUseCase {
    private readonly inventoryRepository;
    private readonly cacheService?;
    constructor(inventoryRepository: InventoryRepository, cacheService?: AppCacheService | undefined);
    execute(payload: CreateStockAdjustmentDto, performedByUserId: string, organizationId: string): Promise<Awaited<ReturnType<InventoryRepository['applyStockAdjustment']>>>;
}
