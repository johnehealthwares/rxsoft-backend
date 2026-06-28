import { DataSource, EntityManager, Repository } from 'typeorm';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { WarehouseOrmEntity } from '../../inventory/entities';
import { CreatePurchaseDto, CreatePurchaseLineDto, UpdatePurchaseDto, UpdatePurchaseLineDto } from '../dto/purchases.dto';
import { PurchaseOrderLineOrmEntity, PurchaseOrderOrmEntity } from '../entities';
type PurchaseSummaryType = {
    id: string;
    supplierId: string;
    warehouseId: string;
    branchId: string;
    supplier: {
        id: string;
        name: string;
    } | null;
    warehouse: {
        id: string;
        name: string;
    } | null;
    currencyCode: string;
    orderDate: string;
    expectedDate: string | null;
    totalCost: number;
    invoiceNumber: string;
    status: 'draft' | 'approved' | 'partially_received' | 'received' | 'cancelled';
    note: string | null;
    lines: Array<{
        id: string;
        itemId: string;
        itemCode: string;
        itemName: string;
        orderedQty: number;
        receivedQty: number;
        uomId: string;
        unitCost: number;
        discountPercent: number;
        taxPercent: number;
        lineSubtotal: number;
        lineTotal: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
    archivedAt: null;
};
export declare class PurchasesService {
    private readonly dataSource;
    private readonly purchaseOrderRepository;
    private readonly purchaseOrderLineRepository;
    private readonly warehouseRepository;
    constructor(dataSource: DataSource, purchaseOrderRepository: Repository<PurchaseOrderOrmEntity>, purchaseOrderLineRepository: Repository<PurchaseOrderLineOrmEntity>, warehouseRepository: Repository<WarehouseOrmEntity>);
    list(query: ListQueryDto, organizationId?: string): Promise<{
        data: PurchaseSummaryType[];
        total: number;
    }>;
    createPurchase(payload: CreatePurchaseDto, currentUser: RequestUser): Promise<PurchaseSummaryType>;
    private resolveWarehouse;
    getById(purchaseId: string, organizationId?: string, manager?: EntityManager): Promise<PurchaseSummaryType>;
    updatePurchase(purchaseId: string, payload: UpdatePurchaseDto, currentUser: RequestUser): Promise<PurchaseSummaryType>;
    removePurchase(purchaseId: string, organizationId?: string): Promise<void>;
    addLine(purchaseId: string, payload: CreatePurchaseLineDto, currentUser: RequestUser): Promise<PurchaseSummaryType>;
    updateLine(purchaseId: string, lineId: string, payload: UpdatePurchaseLineDto, currentUser: RequestUser): Promise<PurchaseSummaryType>;
    removeLine(purchaseId: string, lineId: string, currentUser: RequestUser): Promise<PurchaseSummaryType>;
    private resolveSortColumn;
    private normalizeLines;
    private computeLineSubtotal;
    private computeLineTotal;
    private calculateTotals;
    private mapLine;
}
export {};
