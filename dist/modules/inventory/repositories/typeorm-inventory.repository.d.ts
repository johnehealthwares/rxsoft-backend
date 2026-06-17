import { DataSource, Repository } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { StockLocationOrmEntity } from '../entities/stock-location.orm-entity';
import { StockAdjustment } from '../domains/stock-adjustment.entity';
import { StockBalance } from '../domains/stock-balance.entity';
import { StockAdjustmentOrmEntity } from '../entities/stock-adjustment.orm-entity';
import { StockBalanceOrmEntity } from '../entities/stock-balance.orm-entity';
import { StockMovementOrmEntity } from '../entities/stock-movement.orm-entity';
import { StoreStockLocationOrmEntity } from '../entities/store-stock-location.orm-entity';
import { CreateStoreStockLocationPayload, InventoryRepository, AdjustStockByReferencePayload, TransferStockPayload, StoreStockLocation, StockMovement, StockMovementQuery, StoreStockLocationQuery, StockBalanceQuery } from './inventory.repository';
export declare class TypeormInventoryRepository implements InventoryRepository {
    private readonly stockBalanceRepository;
    private readonly stockAdjustmentRepository;
    private readonly storeStockLocationRepository;
    private readonly stockMovementRepository;
    private readonly itemRepository;
    private readonly stockLocationRepository;
    private readonly dataSource;
    constructor(stockBalanceRepository: Repository<StockBalanceOrmEntity>, stockAdjustmentRepository: Repository<StockAdjustmentOrmEntity>, storeStockLocationRepository: Repository<StoreStockLocationOrmEntity>, stockMovementRepository: Repository<StockMovementOrmEntity>, itemRepository: Repository<ItemOrmEntity>, stockLocationRepository: Repository<StockLocationOrmEntity>, dataSource: DataSource);
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
    adjustStockByReference(payload: AdjustStockByReferencePayload): Promise<StockBalance>;
    transferStock(payload: TransferStockPayload): Promise<{
        fromBalance: StockBalance;
        toBalance: StockBalance;
    }>;
    listStoreStockLocations(query: StoreStockLocationQuery): Promise<{
        items: StoreStockLocation[];
        total: number;
    }>;
    createStoreStockLocation(payload: CreateStoreStockLocationPayload): Promise<StoreStockLocation>;
    setStoreStockLocationActivation(id: string, organizationId: string, isActive: boolean): Promise<StoreStockLocation>;
    private toStoreStockLocation;
}
