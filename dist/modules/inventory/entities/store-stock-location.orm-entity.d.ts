import { StockLocationOrmEntity } from './stock-location.orm-entity';
export declare class StoreStockLocationOrmEntity {
    id: string;
    organizationId: string;
    storeId: string;
    purpose: 'sale_issue' | 'sale_return';
    stockLocation: StockLocationOrmEntity;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
