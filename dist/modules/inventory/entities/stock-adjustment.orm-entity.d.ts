import { StockBalanceOrmEntity } from './stock-balance.orm-entity';
import { UserOrmEntity } from '../../identity/entities/user.orm-entity';
export declare class StockAdjustmentOrmEntity {
    id: string;
    stockBalance: StockBalanceOrmEntity;
    reason: string;
    deltaQuantity: number;
    performedBy: UserOrmEntity;
    performedByUserId: string;
    performedAt: Date;
    createdAt: Date;
}
