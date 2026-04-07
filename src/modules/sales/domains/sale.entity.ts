export class Sale {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly saleNumber: string,
    public readonly saleChannel: 'pos' | 'invoice' | 'mobile',
    public readonly status: 'draft' | 'posted' | 'voided' | 'refunded',
    public readonly totalAmount: number,
    public readonly paidAmount: number,
    public readonly changeAmount: number,
    public readonly saleDate: Date,
  ) {}
}
