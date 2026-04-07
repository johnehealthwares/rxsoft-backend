export class StockAdjustment {
  constructor(
    public readonly id: string,
    public readonly stockBalanceId: string,
    public readonly reason: string,
    public readonly deltaQuantity: number,
    public readonly performedByUserId: string,
    public readonly performedAt: Date,
  ) {}
}
