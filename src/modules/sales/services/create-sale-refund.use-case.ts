import { BadRequestException, Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { CreateSaleRefundDto } from '../dto/create-sale-refund.dto';
import type { SalesRepository } from '../repositories/sales.repository';
import { SALES_REPOSITORY } from './sales.di-tokens';

@Injectable()
export class CreateSaleRefundUseCase {
  private readonly logger = new Logger(CreateSaleRefundUseCase.name);

  constructor(
    @Inject(SALES_REPOSITORY)
    private readonly salesRepository: SalesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
    @Optional()
    private readonly accountingIntegration?: AccountingIntegrationService,
  ) {}

  async execute(
    saleId: string,
    payload: CreateSaleRefundDto,
    organizationId: string,
    userId: string,
  ): Promise<Awaited<ReturnType<SalesRepository['createRefund']>>> {
    if (!payload.lines.length) {
      throw new BadRequestException('At least one refund line is required');
    }

    const result = await this.salesRepository.createRefund({
      organizationId,
      saleId,
      refundNumber: `RF-${Date.now()}`,
      reason: payload.reason ?? null,
      refundedByUserId: userId,
      refundDate: new Date(),
      lines: payload.lines.map((line) => ({
        saleLineId: line.saleLineId,
        quantity: line.quantity,
      })),
    });

    await this.cacheService?.invalidateByPrefix(`sales:list:${organizationId}:`);

    if (this.accountingIntegration) {
      this.accountingIntegration
        .recordSaleRefund(organizationId, {
          id: result.id,
          saleId,
          totalAmount: result.totalAmount,
          refundNumber: result.refundNumber,
        })
        .catch((err: Error) => this.logger.error(`Accounting: failed to record refund: ${err.message}`, err.stack));
    }

    return result;
  }
}
