import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { WriteOffReceivableDto } from '../dto/write-off-receivable.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
export declare class WriteOffReceivableUseCase {
    private readonly receivablesRepository;
    private readonly cacheService?;
    private readonly accountingIntegration?;
    private readonly logger;
    constructor(receivablesRepository: ReceivablesRepository, cacheService?: AppCacheService | undefined, accountingIntegration?: AccountingIntegrationService | undefined);
    execute(receivableId: string, payload: WriteOffReceivableDto, organizationId: string, writtenOffByUserId: string): Promise<Awaited<ReturnType<ReceivablesRepository['writeOff']>>>;
}
