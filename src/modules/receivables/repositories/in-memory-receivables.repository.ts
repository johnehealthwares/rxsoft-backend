import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AccountReceivable } from '../domains/account-receivable.entity';
import { ReceivableTransaction } from '../domains/receivable-transaction.entity';
import {
  ApplyAdjustmentPayload,
  CollectPaymentPayload,
  CollectPaymentResult,
  ReceivableListQuery,
  ReceivableTransactionListQuery,
  ReceivablesRepository,
  WriteOffPayload,
} from './receivables.repository';

@Injectable()
export class InMemoryReceivablesRepository implements ReceivablesRepository {
  private readonly receivables = new Map<string, AccountReceivable>([
    [
      'ar1',
      new AccountReceivable(
        'ar1',
        'org1',
        'cust1',
        null,
        'sale1',
        'AR-SALE-0001',
        100,
        100,
        'open',
        new Date('2026-02-20T10:00:00.000Z'),
        null,
      ),
    ],
  ]);
  private readonly transactions = new Map<string, ReceivableTransaction[]>();

  async list(query: ReceivableListQuery): Promise<{ items: AccountReceivable[]; total: number }> {
    let items = [...this.receivables.values()].filter((item) => item.organizationId === query.organizationId);

    if (query.status) {
      items = items.filter((item) => item.status === query.status);
    }

    if (query.customerId) {
      items = items.filter((item) => item.customerId === query.customerId);
    }

    return {
      items: items.slice(query.offset, query.offset + query.limit),
      total: items.length,
    };
  }

  async collectPayment(payload: CollectPaymentPayload): Promise<CollectPaymentResult> {
    const receivable = this.receivables.get(payload.receivableId);
    if (!receivable || receivable.organizationId !== payload.organizationId) {
      throw new NotFoundException('Receivable not found');
    }
    if (receivable.status === 'written_off') {
      throw new BadRequestException('Cannot collect payment for a written-off receivable');
    }
    if (receivable.status === 'closed' || receivable.outstandingAmount <= 0) {
      throw new BadRequestException('Cannot collect payment for a closed receivable');
    }
    if (payload.amount > receivable.outstandingAmount) {
      throw new BadRequestException('Payment amount cannot exceed outstanding amount');
    }

    receivable.outstandingAmount = Number((receivable.outstandingAmount - payload.amount).toFixed(2));
    if (receivable.outstandingAmount <= 0) {
      receivable.outstandingAmount = 0;
      receivable.status = 'closed';
      receivable.closedAt = payload.transactionDate;
    } else {
      receivable.status = 'partially_paid';
    }

    this.receivables.set(receivable.id, receivable);

    const transactionId = randomUUID();
    const existing = this.transactions.get(receivable.id) ?? [];
    this.transactions.set(
      receivable.id,
      [
        new ReceivableTransaction(
          transactionId,
          receivable.id,
          'payment',
          payload.amount,
          payload.transactionDate,
          payload.paymentMethodId,
          payload.referenceNumber,
          payload.receivedByUserId,
          payload.note,
        ),
        ...existing,
      ],
    );

    return {
      receivable,
      transactionId,
    };
  }

  async applyAdjustment(payload: ApplyAdjustmentPayload): Promise<CollectPaymentResult> {
    const receivable = this.receivables.get(payload.receivableId);
    if (!receivable || receivable.organizationId !== payload.organizationId) {
      throw new NotFoundException('Receivable not found');
    }
    if (receivable.status === 'written_off') {
      throw new BadRequestException('Cannot adjust a written-off receivable');
    }

    // Signed adjustment: positive increases outstanding, negative decreases outstanding.
    receivable.outstandingAmount = Number((receivable.outstandingAmount + payload.amount).toFixed(2));
    if (receivable.outstandingAmount <= 0) {
      receivable.outstandingAmount = 0;
      receivable.status = 'closed';
      receivable.closedAt = payload.transactionDate;
    } else if (receivable.outstandingAmount < receivable.originalAmount) {
      receivable.status = 'partially_paid';
      receivable.closedAt = null;
    } else {
      receivable.status = 'open';
      receivable.closedAt = null;
    }

    this.receivables.set(receivable.id, receivable);

    const transactionId = randomUUID();
    const existing = this.transactions.get(receivable.id) ?? [];
    this.transactions.set(
      receivable.id,
      [
        new ReceivableTransaction(
          transactionId,
          receivable.id,
          'adjustment',
          payload.amount,
          payload.transactionDate,
          null,
          payload.referenceNumber,
          payload.adjustedByUserId,
          payload.note,
        ),
        ...existing,
      ],
    );

    return {
      receivable,
      transactionId,
    };
  }

  async writeOff(payload: WriteOffPayload): Promise<CollectPaymentResult> {
    const receivable = this.receivables.get(payload.receivableId);
    if (!receivable || receivable.organizationId !== payload.organizationId) {
      throw new NotFoundException('Receivable not found');
    }
    if (receivable.status === 'written_off') {
      throw new BadRequestException('Receivable is already written off');
    }
    if (receivable.outstandingAmount <= 0) {
      throw new BadRequestException('Only receivables with outstanding balance can be written off');
    }

    const writtenOffAmount = receivable.outstandingAmount;
    receivable.outstandingAmount = 0;
    receivable.status = 'written_off';
    receivable.closedAt = payload.transactionDate;

    this.receivables.set(receivable.id, receivable);

    const transactionId = randomUUID();
    const existing = this.transactions.get(receivable.id) ?? [];
    this.transactions.set(
      receivable.id,
      [
        new ReceivableTransaction(
          transactionId,
          receivable.id,
          'write_off',
          writtenOffAmount,
          payload.transactionDate,
          null,
          null,
          payload.writtenOffByUserId,
          payload.note,
        ),
        ...existing,
      ],
    );

    return {
      receivable,
      transactionId,
    };
  }

  async listTransactions(
    query: ReceivableTransactionListQuery,
  ): Promise<{ items: ReceivableTransaction[]; total: number }> {
    const receivable = this.receivables.get(query.receivableId);
    if (!receivable || receivable.organizationId !== query.organizationId) {
      return { items: [], total: 0 };
    }

    let items = this.transactions.get(query.receivableId) ?? [];
    if (query.transactionType) {
      items = items.filter((item) => item.transactionType === query.transactionType);
    }

    return {
      items: items.slice(query.offset, query.offset + query.limit),
      total: items.length,
    };
  }
}
