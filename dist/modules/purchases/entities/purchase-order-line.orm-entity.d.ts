import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { PurchaseOrderOrmEntity } from './purchase-order.orm-entity';
import { UomOrmEntity } from '../../sales/entities/uom.orm-entity';
export declare class PurchaseOrderLineOrmEntity {
    id: string;
    purchaseOrder: PurchaseOrderOrmEntity;
    item: ItemOrmEntity;
    itemId: string;
    orderedQty: number;
    receivedQty: number;
    uom: UomOrmEntity;
    uomId: string;
    unitCost: number;
    discountPercent: number;
    taxPercent: number;
    lineSubtotal: number;
    lineTotal: number;
    createdAt: Date;
    updatedAt: Date;
}
