import { BadRequestException, Inject, Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AppCacheService } from '../../../common/cache/cache.service';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { SALES_REPOSITORY } from './sales.di-tokens';
import type { SalesRepository } from '../repositories/sales.repository';
import { validateSequentialCode } from '../../../shared/utils/code-validation';
import { UomOrmEntity } from '../entities';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject(SALES_REPOSITORY)
    private readonly salesRepository: SalesRepository,
    @InjectRepository(UomOrmEntity)
    private readonly uomRepository: Repository<UomOrmEntity>,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    payload: CreateSaleDto,
    organizationId: string,
    userId: string,
  ): Promise<Awaited<ReturnType<SalesRepository['createWithSettlement']>>> {
    // const last = await this.salesRepository.findLastCreated(organizationId);
    // const { valid, expectedCode } = validateSequentialCode({
    //   providedCode: payload.saleNumber,
    //   lastCode: last?.saleNumber,
    //   override: payload.overrideCodeValidation,
    // });
    // if (!valid) {
    //   throw new BadRequestException(`Invalid code '${payload.saleNumber}'. Expected '${expectedCode}'.`);
    // }

    if (!payload.lines.length) {
      throw new BadRequestException('At least one sale line is required');
    }

    const uomIds = [...new Set(payload.lines.map((l) => l.uomId))];
    const uoms = await this.uomRepository.find({
      where: { id: In(uomIds), organizationId },
      select: ['id', 'factor'],
    });
    const uomFactorMap = new Map(uoms.map((u) => [u.id, u.factor]));

    const lines = payload.lines.map((line, index) => {
      const factor = uomFactorMap.get(line.uomId) ?? 1;
      const lineSubtotal = Number((line.quantity * line.unitPrice * factor).toFixed(2));
      return {
        lineNumber: index + 1,
        itemId: line.itemId,
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

    if (outstandingAmount > 0 && !payload.customerId) {
      throw new BadRequestException('Customer is required when sale is underpaid');
    }

    const isHold = payload.hold === true;

    const result = await this.salesRepository.createWithSettlement({
      organizationId,
      saleNumber: payload.saleNumber,
      saleChannel: payload.saleChannel,
      storeId: payload.storeId,
      customerId: payload.customerId ?? null,
      stockLocationId: payload.stockLocationId ?? null,
      soldByUserId: userId,
      saleDate: new Date(),
      subtotalAmount,
      totalAmount,
      paidAmount,
      changeAmount,
      lines,
      payments: isHold ? [] : payments,
      status: isHold ? 'draft' : 'posted',
      receivable:
        !isHold && outstandingAmount > 0
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
