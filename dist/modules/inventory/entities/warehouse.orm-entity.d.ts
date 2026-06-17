import { StockLocationOrmEntity } from './stock-location.orm-entity';
export declare class WarehouseOrmEntity {
    id: string;
    organizationId: string;
    storeId: string | null;
    code: string;
    name: string;
    stockLocations: StockLocationOrmEntity[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
