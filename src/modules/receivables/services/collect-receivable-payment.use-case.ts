import { BadRequestException, Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { CollectReceivablePaymentDto } from '../dto/collect-receivable-payment.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
import { RECEIVABLES_REPOSITORY } from './receivables.di-tokens';

@Injectable()
export class CollectReceivablePaymentUseCase {
  constructor(
    @Inject(RECEIVABLES_REPOSITORY)
    private readonly receivablesRepository: ReceivablesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    receivableId: string,
    payload: CollectReceivablePaymentDto,
    organizationId: string,
    receivedByUserId: string,
  ): Promise<Awaited<ReturnType<ReceivablesRepository['collectPayment']>>> {
    if (payload.amount <= 0) {
      throw new BadRequestException('Payment amount must be greater than zero');
    }

    // One payment operation always records a transaction and updates outstanding.
    const result = await this.receivablesRepository.collectPayment({
      organizationId,
      receivableId,
      amount: payload.amount,
      paymentMethodId: payload.paymentMethodId,
      receivedByUserId,
      referenceNumber: payload.referenceNumber ?? null,
      note: payload.note ?? null,
      transactionDate: new Date(),
    });

    await this.cacheService?.invalidateByPrefix(`receivables:list:${organizationId}:`);
    await this.cacheService?.invalidateByPrefix(`receivables:tx:${organizationId}:${receivableId}:`);
    return result;
  }
}
