import { BadRequestException, Inject, Injectable, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { SALES_REPOSITORY } from './sales.di-tokens';
import type { SalesRepository } from '../repositories/sales.repository';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject(SALES_REPOSITORY)
    private readonly salesRepository: SalesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    payload: CreateSaleDto,
    organizationId: string,
    userId: string,
  ): Promise<Awaited<ReturnType<SalesRepository['createWithSettlement']>>> {
    if (!payload.lines.length) {
      throw new BadRequestException('At least one sale line is required');
    }

    // Price math is centralized here so persistence receives normalized amounts.
    const lines = payload.lines.map((line, index) => {
      const lineSubtotal = Number((line.quantity * line.unitPrice).toFixed(2));
      return {
        lineNumber: index + 1,
        productId: line.productId,
        uomId: line.uomId,
        lotId: line.lotId ?? null,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        lineSubtotal,
        lineTotal: lineSubtotal,
      };
    });

    const subtotalAmount = Number(lines.reduce((sum, line) => sum + line.lineTotal, 0).toFixed(2));
    const totalAmount = subtotalAmount;

    // Payments are aggregated once to derive paid/change/outstanding consistently.
    const payments = payload.payments.map((payment) => ({
      paymentMethodId: payment.paymentMethodId,
      amount: payment.amount,
      paymentReference: payment.paymentReference ?? null,
      paidAt: new Date(),
      receivedByUserId: userId,
    }));
    const paidAmount = Number(payments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2));

    const changeAmount = paidAmount > totalAmount ? Number((paidAmount - totalAmount).toFixed(2)) : 0;
    const outstandingAmount = paidAmount < totalAmount ? Number((totalAmount - paidAmount).toFixed(2)) : 0;

    // Underpaid sales must be collectible from a known customer.
    if (outstandingAmount > 0 && !payload.customerId) {
      throw new BadRequestException('Customer is required when sale is underpaid');
    }

    const result = await this.salesRepository.createWithSettlement({
      organizationId,
      saleNumber: payload.saleNumber,
      saleChannel: payload.saleChannel,
      storeId: payload.storeId,
      customerId: payload.customerId ?? null,
      soldByUserId: userId,
      saleDate: new Date(),
      subtotalAmount,
      totalAmount,
      paidAmount,
      changeAmount,
      lines,
      payments,
      receivable:
        outstandingAmount > 0
          ? {
              customerId: payload.customerId!,
              receivableNumber: `AR-${payload.saleNumber}`,
              originalAmount: outstandingAmount,
              outstandingAmount,
            }
          : null,
    });

    await this.cacheService?.invalidateByPrefix(`sales:list:${organizationId}:`);
    await this.cacheService?.invalidateByPrefix(`receivables:list:${organizationId}:`);
    return result;
  }
}
