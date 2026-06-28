import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { StockLotOrmEntity } from './stock-lot.orm-entity';
import { StockLocationOrmEntity } from './stock-location.orm-entity';
export declare class StockMovementOrmEntity {
    id: string;
    organizationId: string;
    inventoryDocumentId: string | null;
    inventoryDocumentLineId: string | null;
    item: ItemOrmEntity;
    itemId: string;
    lot: StockLotOrmEntity | null;
    lotId: string | null;
    fromLocation: StockLocationOrmEntity | null;
    fromLocationId: string | null;
    toLocation: StockLocationOrmEntity | null;
    toLocationId: string | null;
    uomId: string | null;
    movementType: 'in' | 'out' | 'transfer' | 'adjustment';
    quantity: number;
    unitCost: number | null;
    occurredAt: Date;
    createdByUserId: string | null;
    createdAt: Date;
}
