import type { StockBalanceOrmEntity } from './stock-balance.orm-entity';
export declare class StockAdjustmentOrmEntity {
    id: string;
    stockBalance: StockBalanceOrmEntity;
    reason: string;
    deltaQuantity: number;
    performedByUserId: string;
    performedAt: Date;
    createdAt: Date;
}
