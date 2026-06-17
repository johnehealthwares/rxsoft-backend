import { GoodsReceiptOrmEntity } from './goods-receipt.orm-entity';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { UomOrmEntity } from '../../sales/entities/uom.orm-entity';
export declare class GoodsReceiptLineOrmEntity {
    id: string;
    goodsReceipt: GoodsReceiptOrmEntity;
    item: ItemOrmEntity;
    itemId: string;
    orderedQty: number;
    receivedQty: number;
    uom: UomOrmEntity;
    uomId: string;
    unitCost: number;
    isUnposted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
