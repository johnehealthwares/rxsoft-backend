import { AppCacheService } from '../../../common/cache/cache.service';
import { CollectReceivablePaymentDto } from '../dto/collect-receivable-payment.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
export declare class CollectReceivablePaymentUseCase {
    private readonly receivablesRepository;
    private readonly cacheService?;
    constructor(receivablesRepository: ReceivablesRepository, cacheService?: AppCacheService | undefined);
    execute(receivableId: string, payload: CollectReceivablePaymentDto, organizationId: string, receivedByUserId: string): Promise<Awaited<ReturnType<ReceivablesRepository['collectPayment']>>>;
}
