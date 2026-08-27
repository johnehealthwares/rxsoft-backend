import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Sale } from '../domains/sale.entity';
import {
  CreateSaleRefundRepositoryPayload,
  CreateSaleRefundResult,
  CreateSaleRepositoryPayload,
  CreateSaleResult,
  SalesAnalytics,
  SalesAnalyticsQuery,
  SalesListQuery,
  SalesMetrics,
  SalesMetricsQuery,
  SalesRepository,
} from './sales.repository';

@Injectable()
export class InMemorySalesRepository implements SalesRepository {
  async findById(organizationId: string, saleId: string): Promise<Sale | null> {
    const sale = this.sales.find((s) => s.organizationId === organizationId && s.id === saleId);
    return sale ?? null;
  }

  async findLastCreated(organizationId: string): Promise<Pick<Sale, 'saleNumber'> | null> {
    const sale = this.sales.find((s) => s.organizationId === organizationId);
    return sale ? { saleNumber: sale.saleNumber } : null;
  }

  private readonly sales: Sale[] = [
    new Sale(
      's1',
      'org1',
      'SALE-0001',
      'pos',
      'store-1',
      null,
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
    // Empty organizationId = global super-admin browse: no tenant filter.
    let items = query.organizationId
      ? this.sales.filter((sale) => sale.organizationId === query.organizationId)
      : [...this.sales];

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
      payload.storeId,
      null,
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

  async postExistingSale(
    organizationId: string,
    saleId: string,
    _stockLocationId: string | null,
    _soldByUserId: string,
  ): Promise<Sale> {
    const sale = this.sales.find((s) => s.organizationId === organizationId && s.id === saleId);
    if (!sale) throw new Error('Draft sale not found');
    const posted = new Sale(
      sale.id,
      sale.organizationId,
      sale.saleNumber,
      sale.saleChannel,
      sale.storeId,
      sale.storeName,
      'posted',
      sale.totalAmount,
      sale.paidAmount,
      sale.changeAmount,
      sale.saleDate,
    );
    this.sales.splice(this.sales.indexOf(sale), 1, posted);
    return posted;
  }

  async getMetrics(query: SalesMetricsQuery): Promise<SalesMetrics> {
    let items = this.sales.filter((s) => s.organizationId === query.organizationId);

    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter(
        (s) => s.saleNumber.toLowerCase().includes(q) || s.saleChannel.toLowerCase().includes(q) || s.storeId.toLowerCase().includes(q),
      );
    }

    const posted = items.filter((s) => s.status === 'posted');
    const totalSales = posted.length;
    const inProgress = items.filter((s) => s.status === 'draft').length;
    const totalRevenue = posted.reduce((sum, s) => sum + s.totalAmount, 0);

    const byChannel: Record<string, { count: number; revenue: number }> = {};
    const byCategory: Record<string, { count: number; revenue: number }> = {};
    for (const s of posted) {
      if (!byChannel[s.saleChannel]) byChannel[s.saleChannel] = { count: 0, revenue: 0 };
      byChannel[s.saleChannel].count++;
      byChannel[s.saleChannel].revenue += s.totalAmount;
    }

    return { totalSales, totalRevenue, inProgress: 0, byChannel, byCategory };
  }

  async getAnalytics(query: SalesAnalyticsQuery): Promise<SalesAnalytics> {
    let items = this.sales.filter((s) => s.organizationId === query.organizationId);

    if (query.from) {
      items = items.filter((s) => new Date(s.saleDate).toISOString().slice(0, 10) >= query.from!);
    }
    if (query.to) {
      items = items.filter((s) => new Date(s.saleDate).toISOString().slice(0, 10) <= query.to!);
    }
    if (query.stockLocationId) {
      items = items.filter((s) => s.storeId === query.stockLocationId);
    }

    const posted = items.filter((s) => s.status === 'posted');
    const totalRevenue = posted.reduce((sum, s) => sum + s.totalAmount, 0);
    const totalSales = posted.length;

    const byDay = new Map<string, SalesAnalytics['trend'][number]>();
    for (const s of posted) {
      const day = s.saleDate.toISOString().slice(0, 10);
      const current = byDay.get(day) ?? { day, revenue: 0, orders: 0 };
      current.revenue += s.totalAmount;
      current.orders += 1;
      byDay.set(day, current);
    }

    return {
      summary: {
        totalRevenue,
        totalSales,
        averageOrderValue: totalSales > 0 ? Number((totalRevenue / totalSales).toFixed(2)) : 0,
        itemsSold: 0,
        refunds: 0,
      },
      trend: [...byDay.values()].sort((a, b) => a.day.localeCompare(b.day)),
      byCategory: [],
      byLocation: posted.map((s) => ({ stockLocationId: s.storeId, name: s.storeName ?? 'Unassigned', revenue: s.totalAmount })),
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
