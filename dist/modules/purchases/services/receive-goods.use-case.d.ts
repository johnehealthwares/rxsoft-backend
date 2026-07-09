import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { ReceiveGoodsDto } from '../dto/goods-receipt.dto';
import type { PurchasesRepository } from '../repositories/purchases.repository';
export declare class ReceiveGoodsUseCase {
    private readonly purchasesRepository;
    private readonly cacheService?;
    private readonly accountingIntegration?;
    private readonly logger;
    constructor(purchasesRepository: PurchasesRepository, cacheService?: AppCacheService | undefined, accountingIntegration?: AccountingIntegrationService | undefined);
    execute(payload: ReceiveGoodsDto, organizationId: string, userId: string): Promise<import("../repositories/purchases.repository").ReceiveGoodsResult>;
}
