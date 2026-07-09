import { BadRequestException, Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { ApplyReceivableAdjustmentDto } from '../dto/apply-receivable-adjustment.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
import { RECEIVABLES_REPOSITORY } from './receivables.di-tokens';

@Injectable()
export class ApplyReceivableAdjustmentUseCase {
  private readonly logger = new Logger(ApplyReceivableAdjustmentUseCase.name);

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
    payload: ApplyReceivableAdjustmentDto,
    organizationId: string,
    adjustedByUserId: string,
  ): Promise<Awaited<ReturnType<ReceivablesRepository['applyAdjustment']>>> {
    if (payload.amount === 0) {
      throw new BadRequestException('Adjustment amount cannot be zero');
    }

    const result = await this.receivablesRepository.applyAdjustment({
      organizationId,
      receivableId,
      amount: payload.amount,
      adjustedByUserId,
      referenceNumber: payload.referenceNumber ?? null,
      note: payload.note ?? null,
      transactionDate: new Date(),
    });

    await this.cacheService?.invalidateByPrefix(`receivables:list:${organizationId}:`);
    await this.cacheService?.invalidateByPrefix(`receivables:tx:${organizationId}:${receivableId}:`);

    if (this.accountingIntegration) {
      this.accountingIntegration
        .recordReceivableAdjustment(
          organizationId,
          { id: receivableId, receivableNumber: result.receivable.receivableNumber },
          { amount: payload.amount },
        )
        .catch((err: Error) => this.logger.error(`Accounting: failed to record adjustment: ${err.message}`, err.stack));
    }

    return result;
  }
}
