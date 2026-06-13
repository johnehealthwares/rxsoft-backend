import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Sale } from '../domains/sale.entity';
import {
  CreateSaleRefundRepositoryPayload,
  CreateSaleRefundResult,
  CreateSaleRepositoryPayload,
  CreateSaleResult,
  SalesListQuery,
  SalesRepository,
} from './sales.repository';

@Injectable()
export class InMemorySalesRepository implements SalesRepository {
  private readonly sales: Sale[] = [
    new Sale(
      's1',
      'org1',
      'SALE-0001',
      'pos',
      'posted',
      125.5,
      130,
      4.5,
      new Date('2026-02-20T10:00:00.000Z'),
    ),
  ];
  private readonly receivables = new Map<
    string,
    { id: string; saleId: string; outstandingAmount: number; status: 'open' | 'partially_paid' | 'closed' | 'written_off' }
  >();

  async list(query: SalesListQuery): Promise<{ items: Sale[]; total: number }> {
    let items = this.sales.filter((sale) => sale.organizationId === query.organizationId);

    if (query.status) {
      items = items.filter((sale) => sale.status === query.status);
    }

    const total = items.length;
    return {
      items: items.slice(query.offset, query.offset + query.limit),
      total,
    };
  }

  async createWithSettlement(payload: CreateSaleRepositoryPayload): Promise<CreateSaleResult> {
    const sale = new Sale(
      randomUUID(),
      payload.organizationId,
      payload.saleNumber,
      payload.saleChannel,
      payload.status ?? 'posted',
      payload.totalAmount,
      payload.paidAmount,
      payload.changeAmount,
      payload.saleDate,
    );
    this.sales.unshift(sale);

    if (payload.receivable) {
      const id = randomUUID();
      this.receivables.set(id, {
        id,
        saleId: sale.id,
        outstandingAmount: payload.receivable.outstandingAmount,
        status: 'open',
      });

      return {
        sale,
        receivableCreated: true,
        receivableId: id,
        outstandingAmount: payload.receivable.outstandingAmount,
      };
    }

    return {
      sale,
      receivableCreated: false,
      receivableId: null,
      outstandingAmount: 0,
    };
  }

  async createRefund(payload: CreateSaleRefundRepositoryPayload): Promise<CreateSaleRefundResult> {
    // Lightweight in-memory approximation for test/dev mode; strict validation is in TypeORM repository.
    const totalAmount = Number(payload.lines.reduce((sum, line) => sum + line.quantity * 10, 0).toFixed(2));
    const receivable = [...this.receivables.values()].find(
      (item) => item.saleId === payload.saleId && item.status !== 'written_off',
    );
    if (receivable) {
      const creditAmount = Math.min(totalAmount, receivable.outstandingAmount);
      receivable.outstandingAmount = Number((receivable.outstandingAmount - creditAmount).toFixed(2));
      receivable.status = receivable.outstandingAmount <= 0 ? 'closed' : 'partially_paid';
    }

    return {
      id: randomUUID(),
      saleId: payload.saleId,
      refundNumber: payload.refundNumber,
      status: 'posted',
      totalAmount,
      refundDate: payload.refundDate,
    };
  }
}
