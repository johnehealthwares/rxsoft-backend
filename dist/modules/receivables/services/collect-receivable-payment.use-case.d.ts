import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { CollectReceivablePaymentDto } from '../dto/collect-receivable-payment.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
export declare class CollectReceivablePaymentUseCase {
    private readonly receivablesRepository;
    private readonly cacheService?;
    private readonly accountingIntegration?;
    private readonly logger;
    constructor(receivablesRepository: ReceivablesRepository, cacheService?: AppCacheService | undefined, accountingIntegration?: AccountingIntegrationService | undefined);
    execute(receivableId: string, payload: CollectReceivablePaymentDto, organizationId: string, receivedByUserId: string): Promise<Awaited<ReturnType<ReceivablesRepository['collectPayment']>>>;
}
