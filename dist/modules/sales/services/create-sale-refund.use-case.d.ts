import { AppCacheService } from '../../../common/cache/cache.service';
import { CreateSaleRefundDto } from '../dto/create-sale-refund.dto';
import type { SalesRepository } from '../repositories/sales.repository';
export declare class CreateSaleRefundUseCase {
    private readonly salesRepository;
    private readonly cacheService?;
    constructor(salesRepository: SalesRepository, cacheService?: AppCacheService | undefined);
    execute(saleId: string, payload: CreateSaleRefundDto, organizationId: string, userId: string): Promise<Awaited<ReturnType<SalesRepository['createRefund']>>>;
}
