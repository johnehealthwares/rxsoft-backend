import type { StockBalanceOrmEntity } from './stock-balance.orm-entity';
export declare class StockLotOrmEntity {
    id: string;
    organizationId: string;
    code: string;
    stockBalances: StockBalanceOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
