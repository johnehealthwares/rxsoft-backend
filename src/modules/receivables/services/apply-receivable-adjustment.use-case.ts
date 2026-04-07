import { BadRequestException, Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { ApplyReceivableAdjustmentDto } from '../dto/apply-receivable-adjustment.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
import { RECEIVABLES_REPOSITORY } from './receivables.di-tokens';

@Injectable()
export class ApplyReceivableAdjustmentUseCase {
  constructor(
    @Inject(RECEIVABLES_REPOSITORY)
    private readonly receivablesRepository: ReceivablesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
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
    return result;
  }
}
