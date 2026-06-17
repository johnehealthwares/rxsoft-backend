import { AppCacheService } from '../../../common/cache/cache.service';
import { ReceiveGoodsDto } from '../dto/goods-receipt.dto';
import type { PurchasesRepository } from '../repositories/purchases.repository';
export declare class ReceiveGoodsUseCase {
    private readonly purchasesRepository;
    private readonly cacheService?;
    constructor(purchasesRepository: PurchasesRepository, cacheService?: AppCacheService | undefined);
    execute(payload: ReceiveGoodsDto, organizationId: string, userId: string): Promise<import("../repositories/purchases.repository").ReceiveGoodsResult>;
}
