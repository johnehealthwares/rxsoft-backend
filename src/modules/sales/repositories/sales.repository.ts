import { Sale } from '../domains/sale.entity';

export type SalesListQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  status?: 'draft' | 'posted' | 'voided' | 'refunded';
};

export type CreateSaleRepositoryPayload = {
  organizationId: string;
  saleNumber: string;
  saleChannel: 'pos' | 'invoice' | 'mobile';
  storeId: string;
  customerId: string | null;
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
  createWithSettlement(payload: CreateSaleRepositoryPayload): Promise<CreateSaleResult>;
  createRefund(payload: CreateSaleRefundRepositoryPayload): Promise<CreateSaleRefundResult>;
}
