import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { CreateStockAdjustmentDto } from '../dto/create-stock-adjustment.dto';
import type { InventoryRepository } from '../repositories/inventory.repository';
export declare class CreateStockAdjustmentUseCase {
    private readonly inventoryRepository;
    private readonly cacheService?;
    private readonly accountingIntegration?;
    private readonly logger;
    constructor(inventoryRepository: InventoryRepository, cacheService?: AppCacheService | undefined, accountingIntegration?: AccountingIntegrationService | undefined);
    execute(payload: CreateStockAdjustmentDto, performedByUserId: string, organizationId: string): Promise<Awaited<ReturnType<InventoryRepository['applyStockAdjustment']>>>;
}
