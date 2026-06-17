import { StockBalanceOrmEntity } from './stock-balance.orm-entity';
import { WarehouseOrmEntity } from './warehouse.orm-entity';
export declare class StockLocationOrmEntity {
    id: string;
    organizationId: string;
    warehouseId: string | null;
    warehouse: WarehouseOrmEntity | null;
    parentId: string | null;
    parent: StockLocationOrmEntity | null;
    children: StockLocationOrmEntity[];
    code: string | null;
    name: string;
    locationType: 'internal' | 'supplier' | 'customer' | 'inventory' | 'scrap' | 'transit';
    isActive: boolean;
    stockBalances: StockBalanceOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
