import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderOrmEntity, OrderItemOrmEntity } from '../../website/entities';
import { SaleOrmEntity, SalePaymentOrmEntity } from '../../sales/entities';
import { PaymentMethodOrmEntity } from '../../sales/entities/payment-method.orm-entity';
import { PaymentMethodProviderOrmEntity } from '../entities/payment-method-provider.orm-entity';
import { PaymentTransactionOrmEntity } from '../entities';
import { OrdersService } from '../../orders/orders.service';
import { CustomerWalletService } from './customer-wallet.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';

export function generatePaymentReference(prefix = 'PMT'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

@Injectable()
export class PaymentCompletionService {
  private readonly logger = new Logger(PaymentCompletionService.name);

  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepo: Repository<OrderOrmEntity>,
    @InjectRepository(SaleOrmEntity)
    private readonly saleRepo: Repository<SaleOrmEntity>,
    @InjectRepository(SalePaymentOrmEntity)
    private readonly salePaymentRepo: Repository<SalePaymentOrmEntity>,
    @InjectRepository(PaymentMethodOrmEntity)
    private readonly paymentMethodRepo: Repository<PaymentMethodOrmEntity>,
    @InjectRepository(PaymentMethodProviderOrmEntity)
    private readonly methodProviderRepo: Repository<PaymentMethodProviderOrmEntity>,
    private readonly ordersService: OrdersService,
    private readonly walletService: CustomerWalletService,
    private readonly accounting: AccountingIntegrationService,
  ) {}

  /**
   * Applies a confirmed (paid) payment transaction to its source document.
   * Idempotent: callers must not invoke this more than once per transaction —
   * the webhook/verify path guards on tx.status before calling.
   */
  async handleSuccess(tx: PaymentTransactionOrmEntity): Promise<void> {
    switch (tx.sourceType) {
      case 'order':
        if (!tx.sourceId)
          throw new BadRequestException('Order payment missing sourceId');
        const sourceId = tx.sourceId;
        await this.completeOrderPayment(tx, sourceId);
        break;
      case 'wallet_deposit':
        if (!tx.userId)
          throw new BadRequestException('Wallet deposit missing userId');
        await this.completeWalletDeposit(tx);
        break;
      case 'sale':
        // Sale payments are recorded by the sale creation flow (POST /sales)
        // which carries `paymentReference`; nothing further to apply here.
        break;
      case 'receivable':
      default:
        this.logger.warn(
          `No completion handler for sourceType "${tx.sourceType}" (tx ${tx.id})`,
        );
    }
  }

  private async completeWalletDeposit(
    tx: PaymentTransactionOrmEntity,
  ): Promise<void> {
    const amount = tx.amountPaid || tx.amount;
    await this.walletService.credit(tx.organizationId, tx.userId!, amount, {
      paymentReference: tx.reference,
      sourceType: 'wallet_deposit',
      sourceId: tx.sourceId ?? undefined,
      reference: tx.reference,
      note: `Wallet funded via ${tx.providerType} (${tx.reference})`,
    });
  }

  private async completeOrderPayment(
    tx: PaymentTransactionOrmEntity,
    orderIdInput: string,
  ): Promise<void> {
    const orderId = orderIdInput ?? '';
    const order = await this.orderRepo.findOne({
      where: { id: orderId, organizationId: tx.organizationId },
    });
    if (!order) throw new NotFoundException('Order not found for payment');

    if (!order.saleId) {
      // Move pending → confirmed so the order can be posted as a sale.
      if (order.orderStatus === 'pending') {
        order.orderStatus = 'confirmed';
        await this.orderRepo.save(order);
      } else if (order.orderStatus !== 'confirmed') {
        throw new BadRequestException(
          `Order cannot be paid in status ${order.orderStatus}`,
        );
      }

      const currentUser = {
        organizationId: tx.organizationId,
        sub: tx.userId ?? 'system',
      };
      await this.ordersService.postOrderAsSale(
        orderId,
        { organizationId: tx.organizationId },
        currentUser,
      );
      const updated = await this.orderRepo.findOne({ where: { id: orderId } });
      if (!updated?.saleId)
        throw new BadRequestException('Order was not converted to a sale');

      await this.ordersService.completeSale(updated.saleId, currentUser);
      await this.attachSalePayment(tx, updated.saleId, order.totalAmount);

      this.logger.log(
        `Order ${order.orderNumber} paid, sale ${updated.saleId} completed (tx ${tx.reference})`,
      );
    } else {
      // Order already has a sale (likely posted unpaid) — attach the payment.
      const existingSale = await this.saleRepo.findOne({
        where: { id: order.saleId },
      });
      if (!existingSale)
        throw new NotFoundException('Sale not found for order payment');
      await this.attachSalePayment(tx, order.saleId, order.totalAmount);
    }

    await this.accounting.recordOnlinePayment(
      tx.organizationId,
      {
        reference: tx.reference,
        provider: tx.providerType,
        channel: tx.channel,
        amount: tx.amountPaid || tx.amount,
        sourceType: 'order',
        sourceId: orderId,
      },
      { revenue: true, outstanding: 0 },
    );
  }

  private async attachSalePayment(
    tx: PaymentTransactionOrmEntity,
    saleId: string,
    amount: number,
  ): Promise<void> {
    const paymentMethodId = await this.resolvePaymentMethod(tx);
    await this.salePaymentRepo.save(
      this.salePaymentRepo.create({
        sale: { id: saleId } as never,
        paymentMethod: { id: paymentMethodId } as never,
        amount: tx.amountPaid || tx.amount || amount,
        paymentReference: tx.reference,
        paidAt: tx.paidAt ?? new Date(),
        receivedByUserId: tx.userId ?? null,
      }),
    );
    const paid = tx.amountPaid || tx.amount || amount;
    const sale = await this.saleRepo.findOne({ where: { id: saleId } });
    if (sale) {
      sale.paidAmount = sale.paidAmount ?? 0;
      sale.paidAmount = Number((sale.paidAmount + paid).toFixed(2));
      if (Math.abs(sale.paidAmount - sale.totalAmount) < 0.01) {
        sale.paidAmount = sale.totalAmount;
      }
      await this.saleRepo.save(sale);
    }
  }

  /** Posts the gateway-float → bank journal when a provider settles the payment. */
  async recordSettlement(tx: PaymentTransactionOrmEntity): Promise<void> {
    await this.accounting.recordSettlement(tx.organizationId, {
      reference: tx.reference,
      provider: tx.providerType,
      amount: tx.amountPaid || tx.amount,
    });
  }

  private async resolvePaymentMethod(
    tx: PaymentTransactionOrmEntity,
  ): Promise<string> {
    if (tx.paymentMethodId) return tx.paymentMethodId;

    const link = await this.methodProviderRepo
      .createQueryBuilder('mpp')
      .where('mpp.payment_provider_id = :providerId', {
        providerId: tx.paymentProviderId,
      })
      .andWhere('mpp.is_active = true')
      .orderBy('mpp.is_default', 'DESC')
      .getOne();
    if (link) return link.paymentMethodId;

    const fallback = await this.paymentMethodRepo.findOne({
      where: { code: 'WEB' },
    });
    if (fallback) return fallback.id;

    const transfer = await this.paymentMethodRepo.findOne({
      where: { methodType: 'transfer' },
    });
    if (transfer) return transfer.id;

    throw new BadRequestException(
      'No payment method could be resolved for this provider',
    );
  }
}
