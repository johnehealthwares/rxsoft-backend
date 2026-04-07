// Domain model for customer balances created from underpaid sales.
export class AccountReceivable {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly customerId: string,
    public readonly saleId: string,
    public readonly receivableNumber: string,
    public readonly originalAmount: number,
    public outstandingAmount: number,
    public status: 'open' | 'partially_paid' | 'closed' | 'written_off',
    public readonly openedAt: Date,
    public closedAt: Date | null,
  ) {}
}
