import { AccountReceivable } from '../domains/account-receivable.entity';
import { ReceivableTransaction } from '../domains/receivable-transaction.entity';

export type ReceivableListQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  status?: 'open' | 'partially_paid' | 'closed' | 'written_off';
  customerId?: string;
};

export type CollectPaymentPayload = {
  organizationId: string;
  receivableId: string;
  amount: number;
  paymentMethodId: string;
  receivedByUserId: string;
  referenceNumber: string | null;
  note: string | null;
  transactionDate: Date;
};

export type CollectPaymentResult = {
  receivable: AccountReceivable;
  transactionId: string;
};

export type ApplyAdjustmentPayload = {
  organizationId: string;
  receivableId: string;
  amount: number;
  adjustedByUserId: string;
  referenceNumber: string | null;
  note: string | null;
  transactionDate: Date;
};

export type WriteOffPayload = {
  organizationId: string;
  receivableId: string;
  writtenOffByUserId: string;
  note: string | null;
  transactionDate: Date;
};

export type ReceivableTransactionListQuery = {
  organizationId: string;
  receivableId: string;
  offset: number;
  limit: number;
  transactionType?: 'charge' | 'payment' | 'adjustment' | 'write_off';
};

export interface ReceivablesRepository {
  list(query: ReceivableListQuery): Promise<{ items: AccountReceivable[]; total: number }>;
  collectPayment(payload: CollectPaymentPayload): Promise<CollectPaymentResult>;
  applyAdjustment(payload: ApplyAdjustmentPayload): Promise<CollectPaymentResult>;
  writeOff(payload: WriteOffPayload): Promise<CollectPaymentResult>;
  listTransactions(
    query: ReceivableTransactionListQuery,
  ): Promise<{ items: ReceivableTransaction[]; total: number }>;
}
