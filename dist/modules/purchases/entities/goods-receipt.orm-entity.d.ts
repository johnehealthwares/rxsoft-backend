import { GoodsReceiptLineOrmEntity } from './goods-receipt-line.orm-entity';
import { PurchaseOrderOrmEntity } from './purchase-order.orm-entity';
export declare class GoodsReceiptOrmEntity {
    id: string;
    organizationId: string;
    receiptNumber: string;
    purchaseOrder: PurchaseOrderOrmEntity;
    receivedDate: Date;
    createdByUserId: string;
    note: string | null;
    lines: GoodsReceiptLineOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
