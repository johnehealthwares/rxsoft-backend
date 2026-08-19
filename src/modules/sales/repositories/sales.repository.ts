import { Sale } from '../domains/sale.entity';

export type SalesListQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  status?: 'draft' | 'posted' | 'voided' | 'refunded';
  search?: string;
};

export type SalesMetricsQuery = {
  organizationId: string;
  search?: string;
};

export type SalesMetrics = {
  totalSales: number;
  totalRevenue: number;
  inProgress: number;
  byChannel: Record<string, { count: number; revenue: number }>;
  byCategory: Record<string, { count: number; revenue: number }>;
};

export type CreateSaleRepositoryPayload = {
  organizationId: string;
  saleNumber: string;
  saleChannel: 'pos' | 'invoice' | 'mobile' | 'website';
  storeId: string;
  customerId: string | null;
  stockLocationId: string | null;
  soldByUserId: string;
  saleDate: Date;
  subtotalAmount: number;
  totalAmount: number;
  paidAmount: number;
  changeAmount: number;
  lines: Array<{
    lineNumber: number;
    itemId: string;
    uomId: string;
    lotId: string | null;
    quantity: number;
    unitPrice: number;
    lineSubtotal: number;
    lineTotal: number;
  }>;
  payments: Array<{
    paymentMethodId: string;
    amount: number;
    paymentReference: string | null;
    paidAt: Date;
    receivedByUserId: string;
  }>;
  status?: 'draft' | 'posted';
  receivable: {
    customerId: string;
    receivableNumber: string;
    originalAmount: number;
    outstandingAmount: number;
  } | null;
};

export type CreateSaleResult = {
  sale: Sale;
  receivableCreated: boolean;
  receivableId: string | null;
  outstandingAmount: number;
};

export type CreateSaleRefundRepositoryPayload = {
  organizationId: string;
  saleId: string;
  refundNumber: string;
  reason: string | null;
  refundedByUserId: string;
  refundDate: Date;
  lines: Array<{
    saleLineId: string;
    quantity: number;
  }>;
};

export type CreateSaleRefundResult = {
  id: string;
  saleId: string;
  refundNumber: string;
  status: 'posted' | 'voided';
  totalAmount: number;
  refundDate: Date;
};

export interface SalesRepository {
  list(query: SalesListQuery): Promise<{ items: Sale[]; total: number }>;
  findById(organizationId: string, saleId: string): Promise<Sale | null>;
  createWithSettlement(payload: CreateSaleRepositoryPayload): Promise<CreateSaleResult>;
  postExistingSale(
    organizationId: string,
    saleId: string,
    stockLocationId: string | null,
    soldByUserId: string,
  ): Promise<Sale>;
  createRefund(payload: CreateSaleRefundRepositoryPayload): Promise<CreateSaleRefundResult>;
  findLastCreated(organizationId: string): Promise<Pick<Sale, 'saleNumber'> | null>;
  getMetrics(query: SalesMetricsQuery): Promise<SalesMetrics>;
}
