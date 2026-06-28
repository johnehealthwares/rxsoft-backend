import { PurchaseOrderOrmEntity } from '../entities/purchase-order.orm-entity';
import { GoodsReceiptOrmEntity } from '../entities/goods-receipt.orm-entity';
import { CreatePurchasePayload, GoodsReceiptPayload, PurchaseListQuery, PurchaseUpdatePayload, PurchasesRepository, ReceiveGoodsResult, ReceiptListQuery, UnpostGoodsPayload } from './purchases.repository';
export declare class InMemoryPurchasesRepository implements PurchasesRepository {
    private readonly purchaseOrders;
    private readonly purchaseOrderLines;
    list(query: PurchaseListQuery): Promise<{
        items: PurchaseOrderOrmEntity[];
        total: number;
    }>;
    getById(id: string, organizationId: string): Promise<PurchaseOrderOrmEntity | null>;
    create(payload: CreatePurchasePayload): Promise<PurchaseOrderOrmEntity>;
    update(id: string, organizationId: string, payload: PurchaseUpdatePayload): Promise<PurchaseOrderOrmEntity>;
    delete(id: string, organizationId: string): Promise<void>;
    receiveGoods(_payload: GoodsReceiptPayload): Promise<ReceiveGoodsResult>;
    unpostGoods(_payload: UnpostGoodsPayload): Promise<void>;
    listReceipts(query: ReceiptListQuery): Promise<{
        items: GoodsReceiptOrmEntity[];
        total: number;
    }>;
    findLastReceipt(_organizationId: string): Promise<Pick<GoodsReceiptOrmEntity, 'receiptNumber'> | null>;
}
