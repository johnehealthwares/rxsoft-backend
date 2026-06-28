import { DataSource, Repository } from 'typeorm';
import { StockBalanceOrmEntity, StockLocationOrmEntity, StockMovementOrmEntity, WarehouseOrmEntity } from '../../inventory/entities';
import { GoodsReceiptLineOrmEntity, GoodsReceiptOrmEntity, PurchaseOrderLineOrmEntity, PurchaseOrderOrmEntity } from '../entities';
import { CreatePurchasePayload, GoodsReceiptPayload, PurchaseListQuery, PurchaseUpdatePayload, PurchasesRepository, ReceiveGoodsResult, ReceiptListQuery, UnpostGoodsPayload } from './purchases.repository';
export declare class TypeormPurchasesRepository implements PurchasesRepository {
    private readonly purchaseOrderRepository;
    private readonly purchaseOrderLineRepository;
    private readonly goodsReceiptRepository;
    private readonly goodsReceiptLineRepository;
    private readonly stockMovementRepository;
    private readonly stockBalanceRepository;
    private readonly stockLocationRepository;
    private readonly warehouseRepository;
    private readonly dataSource;
    constructor(purchaseOrderRepository: Repository<PurchaseOrderOrmEntity>, purchaseOrderLineRepository: Repository<PurchaseOrderLineOrmEntity>, goodsReceiptRepository: Repository<GoodsReceiptOrmEntity>, goodsReceiptLineRepository: Repository<GoodsReceiptLineOrmEntity>, stockMovementRepository: Repository<StockMovementOrmEntity>, stockBalanceRepository: Repository<StockBalanceOrmEntity>, stockLocationRepository: Repository<StockLocationOrmEntity>, warehouseRepository: Repository<WarehouseOrmEntity>, dataSource: DataSource);
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
    findLastReceipt(organizationId: string): Promise<Pick<GoodsReceiptOrmEntity, 'receiptNumber'> | null>;
}
