export declare class StockAdjustment {
    readonly id: string;
    readonly stockBalanceId: string;
    readonly reason: string;
    readonly deltaQuantity: number;
    readonly performedByUserId: string;
    readonly performedAt: Date;
    constructor(id: string, stockBalanceId: string, reason: string, deltaQuantity: number, performedByUserId: string, performedAt: Date);
}
