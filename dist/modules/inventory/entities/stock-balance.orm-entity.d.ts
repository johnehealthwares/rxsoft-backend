import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { StockAdjustmentOrmEntity } from './stock-adjustment.orm-entity';
import { StockLocationOrmEntity } from './stock-location.orm-entity';
import { StockLotOrmEntity } from './stock-lot.orm-entity';
export declare class StockBalanceOrmEntity {
    id: string;
    organizationId: string;
    item: ItemOrmEntity;
    location: StockLocationOrmEntity;
    lot: StockLotOrmEntity | null;
    quantityOnHand: number;
    quantityReserved: number;
    averageCost: number;
    reorderMinQty: number | null;
    reorderMaxQty: number | null;
    adjustments: StockAdjustmentOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
