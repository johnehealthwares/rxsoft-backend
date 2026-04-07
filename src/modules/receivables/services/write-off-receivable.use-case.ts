import { Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { WriteOffReceivableDto } from '../dto/write-off-receivable.dto';
import type { ReceivablesRepository } from '../repositories/receivables.repository';
import { RECEIVABLES_REPOSITORY } from './receivables.di-tokens';

@Injectable()
export class WriteOffReceivableUseCase {
  constructor(
    @Inject(RECEIVABLES_REPOSITORY)
    private readonly receivablesRepository: ReceivablesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    receivableId: string,
    payload: WriteOffReceivableDto,
    organizationId: string,
    writtenOffByUserId: string,
  ): Promise<Awaited<ReturnType<ReceivablesRepository['writeOff']>>> {
    // Write-off closes receivable at its current outstanding amount.
    const result = await this.receivablesRepository.writeOff({
      organizationId,
      receivableId,
      writtenOffByUserId,
      note: payload.note ?? null,
      transactionDate: new Date(),
    });

    await this.cacheService?.invalidateByPrefix(`receivables:list:${organizationId}:`);
    await this.cacheService?.invalidateByPrefix(`receivables:tx:${organizationId}:${receivableId}:`);
    return result;
  }
}
