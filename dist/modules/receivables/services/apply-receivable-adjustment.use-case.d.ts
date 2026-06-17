import { AppCacheService } from '../../../common/cache/cache.service';
import { ApplyReceivableAdjustmentDto } from '../dto/apply-receivable-adjustment.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
export declare class ApplyReceivableAdjustmentUseCase {
    private readonly receivablesRepository;
    private readonly cacheService?;
    constructor(receivablesRepository: ReceivablesRepository, cacheService?: AppCacheService | undefined);
    execute(receivableId: string, payload: ApplyReceivableAdjustmentDto, organizationId: string, adjustedByUserId: string): Promise<Awaited<ReturnType<ReceivablesRepository['applyAdjustment']>>>;
}
