export type ReceivableTransactionType = {
  id: string;
  receivableId: string;
  transactionType: 'charge' | 'payment' | 'adjustment' | 'write_off';
  amount: number;
  transactionDate: string;
  paymentMethodId: string | null;
  referenceNumber: string | null;
  receivedByUserId: string | null;
  note: string | null;
  createdAt: string;
};
