import { AppCacheService } from '../../../common/cache/cache.service';
import { WriteOffReceivableDto } from '../dto/write-off-receivable.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
export declare class WriteOffReceivableUseCase {
    private readonly receivablesRepository;
    private readonly cacheService?;
    constructor(receivablesRepository: ReceivablesRepository, cacheService?: AppCacheService | undefined);
    execute(receivableId: string, payload: WriteOffReceivableDto, organizationId: string, writtenOffByUserId: string): Promise<Awaited<ReturnType<ReceivablesRepository['writeOff']>>>;
}
