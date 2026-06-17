import { Repository } from 'typeorm';
import type { StockLocationType } from '../../../shared/domain';
import { WarehouseOrmEntity } from '../entities/warehouse.orm-entity';
import { StockLocationOrmEntity } from '../entities/stock-location.orm-entity';
import { CreateStockLocationDto, ListStockLocationsDto, UpdateStockLocationDto } from '../dto/stock-locations.dto';
export declare class StockLocationsService {
    private readonly stockLocationRepository;
    private readonly warehouseRepository;
    constructor(stockLocationRepository: Repository<StockLocationOrmEntity>, warehouseRepository: Repository<WarehouseOrmEntity>);
    list(query: ListStockLocationsDto, organizationId?: string): Promise<{
        data: StockLocationType[];
        total: number;
    }>;
    get(id: string, organizationId?: string): Promise<StockLocationType>;
    create(payload: CreateStockLocationDto, organizationId?: string): Promise<StockLocationType>;
    update(id: string, payload: UpdateStockLocationDto, organizationId?: string): Promise<StockLocationType>;
}
