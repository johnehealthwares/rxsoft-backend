import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { WriteOffReceivableDto } from '../dto/write-off-receivable.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
import { RECEIVABLES_REPOSITORY } from './receivables.di-tokens';

@Injectable()
export class WriteOffReceivableUseCase {
  private readonly logger = new Logger(WriteOffReceivableUseCase.name);

  constructor(
    @Inject(RECEIVABLES_REPOSITORY)
    private readonly receivablesRepository: ReceivablesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
    @Optional()
    private readonly accountingIntegration?: AccountingIntegrationService,
  ) {}

  async execute(
    receivableId: string,
    payload: WriteOffReceivableDto,
    organizationId: string,
    writtenOffByUserId: string,
  ): Promise<Awaited<ReturnType<ReceivablesRepository['writeOff']>>> {
    const result = await this.receivablesRepository.writeOff({
      organizationId,
      receivableId,
      writtenOffByUserId,
      note: payload.note ?? null,
      transactionDate: new Date(),
    });

    await this.cacheService?.invalidateByPrefix(`receivables:list:${organizationId}:`);
    await this.cacheService?.invalidateByPrefix(`receivables:tx:${organizationId}:${receivableId}:`);

    if (this.accountingIntegration) {
      const writeOffAmount = result.receivable.originalAmount;
      this.accountingIntegration
        .recordWriteOff(
          organizationId,
          { id: receivableId, receivableNumber: result.receivable.receivableNumber },
          writeOffAmount,
        )
        .catch((err: Error) => this.logger.error(`Accounting: failed to record write-off: ${err.message}`, err.stack));
    }

    return result;
  }
}
