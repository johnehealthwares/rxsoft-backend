import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { CreateSaleRefundDto } from '../dto/create-sale-refund.dto';
import type { SalesRepository } from '../repositories/sales.repository';
export declare class CreateSaleRefundUseCase {
    private readonly salesRepository;
    private readonly cacheService?;
    private readonly accountingIntegration?;
    private readonly logger;
    constructor(salesRepository: SalesRepository, cacheService?: AppCacheService | undefined, accountingIntegration?: AccountingIntegrationService | undefined);
    execute(saleId: string, payload: CreateSaleRefundDto, organizationId: string, userId: string): Promise<Awaited<ReturnType<SalesRepository['createRefund']>>>;
}
