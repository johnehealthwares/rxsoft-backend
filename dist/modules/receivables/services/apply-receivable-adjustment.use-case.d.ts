import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { ApplyReceivableAdjustmentDto } from '../dto/apply-receivable-adjustment.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
export declare class ApplyReceivableAdjustmentUseCase {
    private readonly receivablesRepository;
    private readonly cacheService?;
    private readonly accountingIntegration?;
    private readonly logger;
    constructor(receivablesRepository: ReceivablesRepository, cacheService?: AppCacheService | undefined, accountingIntegration?: AccountingIntegrationService | undefined);
    execute(receivableId: string, payload: ApplyReceivableAdjustmentDto, organizationId: string, adjustedByUserId: string): Promise<Awaited<ReturnType<ReceivablesRepository['applyAdjustment']>>>;
}
