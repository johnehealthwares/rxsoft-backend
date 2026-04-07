// Domain model for receivable ledger entries.
export class ReceivableTransaction {
  constructor(
    public readonly id: string,
    public readonly receivableId: string,
    public readonly transactionType: 'charge' | 'payment' | 'adjustment' | 'write_off',
    public readonly amount: number,
    public readonly transactionDate: Date,
    public readonly paymentMethodId: string | null,
    public readonly referenceNumber: string | null,
    public readonly receivedByUserId: string | null,
    public readonly note: string | null,
  ) {}
}
