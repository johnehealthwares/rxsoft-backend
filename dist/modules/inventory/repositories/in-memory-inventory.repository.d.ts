import { AdjustStockByReferencePayload, CreateStoreStockLocationPayload, InventoryRepository, StockBalanceQuery, StoreStockLocation, StoreStockLocationQuery, StockMovementQuery, StockMovement, TransferStockPayload } from './inventory.repository';
import { StockAdjustment } from '../domains/stock-adjustment.entity';
import { StockBalance } from '../domains/stock-balance.entity';
export declare class InMemoryInventoryRepository implements InventoryRepository {
    private readonly stockBalances;
    private readonly storeStockLocations;
    private readonly stockMovements;
    constructor();
    listStockBalances(query: StockBalanceQuery): Promise<{
        items: StockBalance[];
        total: number;
    }>;
    findStockBalanceById(id: string, organizationId: string): Promise<StockBalance | null>;
    listStockMovements(query: StockMovementQuery): Promise<{
        items: StockMovement[];
        total: number;
    }>;
    applyStockAdjustment(adjustment: StockAdjustment, organizationId: string): Promise<StockBalance>;
    listStoreStockLocations(query: StoreStockLocationQuery): Promise<{
        items: StoreStockLocation[];
        total: number;
    }>;
    createStoreStockLocation(payload: CreateStoreStockLocationPayload): Promise<StoreStockLocation>;
    setStoreStockLocationActivation(id: string, organizationId: string, isActive: boolean): Promise<StoreStockLocation>;
    adjustStockByReference(payload: AdjustStockByReferencePayload): Promise<StockBalance>;
    transferStock(payload: TransferStockPayload): Promise<{
        fromBalance: StockBalance;
        toBalance: StockBalance;
    }>;
}
