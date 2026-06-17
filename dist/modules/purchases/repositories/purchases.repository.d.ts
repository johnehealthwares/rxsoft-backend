import { PurchaseOrderOrmEntity } from '../entities/purchase-order.orm-entity';
import { GoodsReceiptOrmEntity } from '../entities/goods-receipt.orm-entity';
export type PurchaseOrderStatus = 'draft' | 'approved' | 'partially_received' | 'received' | 'cancelled';
export type PurchaseListQuery = {
    organizationId: string;
    offset: number;
    limit: number;
    status?: string;
};
export type CreatePurchasePayload = {
    organizationId: string;
    purchaseOrderNumber: string;
    supplierId: string;
    warehouseId: string;
    currencyCode: string;
    orderDate: string;
    expectedDate: string | null;
    status: PurchaseOrderStatus;
    subtotalAmount: number;
    taxAmount: number;
    totalAmount: number;
    createdByUserId: string;
    approvedByUserId: string | null;
    approvedAt: Date | null;
    note: string | null;
    lines: Array<{
        itemId: string;
        orderedQty: number;
        receivedQty: number;
        uomId: string;
        unitCost: number;
        discountPercent: number;
        taxPercent: number;
        lineSubtotal: number;
        lineTotal: number;
    }>;
};
export type PurchaseUpdatePayload = Partial<CreatePurchasePayload> & {
    lines?: CreatePurchasePayload['lines'];
};
export type GoodsReceiptPayload = {
    organizationId: string;
    receiptNumber: string;
    purchaseOrderId: string;
    receivedDate: Date;
    createdByUserId: string;
    note: string | null;
    lines: Array<{
        itemId: string;
        orderedQty: number;
        receivedQty: number;
        uomId: string;
        unitCost: number;
    }>;
};
export type ReceiveGoodsResult = {
    receiptId: string;
    receiptNumber: string;
    lines: Array<{
        itemId: string;
        receiptLineId: string;
        receivedQty: number;
    }>;
};
export type ReceiptListQuery = {
    organizationId: string;
    purchaseOrderId?: string;
    offset: number;
    limit: number;
};
export type UnpostGoodsPayload = {
    organizationId: string;
    receiptLineId: string;
    performedByUserId: string;
};
export interface PurchasesRepository {
    list(query: PurchaseListQuery): Promise<{
        items: PurchaseOrderOrmEntity[];
        total: number;
    }>;
    getById(id: string, organizationId: string): Promise<PurchaseOrderOrmEntity | null>;
    create(payload: CreatePurchasePayload): Promise<PurchaseOrderOrmEntity>;
    update(id: string, organizationId: string, payload: PurchaseUpdatePayload): Promise<PurchaseOrderOrmEntity>;
    delete(id: string, organizationId: string): Promise<void>;
    receiveGoods(payload: GoodsReceiptPayload): Promise<ReceiveGoodsResult>;
    unpostGoods(payload: UnpostGoodsPayload): Promise<void>;
    listReceipts(query: ReceiptListQuery): Promise<{
        items: GoodsReceiptOrmEntity[];
        total: number;
    }>;
}
