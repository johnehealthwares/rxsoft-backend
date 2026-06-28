import { Repository } from 'typeorm';
import type { WarehouseType } from '../../../shared/domain';
import { CreateWarehouseDto, ListWarehousesDto, UpdateWarehouseDto } from '../dto/warehouses.dto';
import { WarehouseOrmEntity } from '../../inventory/entities/warehouse.orm-entity';
export declare class WarehousesService {
    private readonly warehouseRepository;
    constructor(warehouseRepository: Repository<WarehouseOrmEntity>);
    list(query: ListWarehousesDto, organizationId: string): Promise<{
        data: WarehouseType[];
        total: number;
    }>;
    get(id: string, organizationId: string): Promise<WarehouseType>;
    create(payload: CreateWarehouseDto, organizationId: string): Promise<WarehouseType>;
    update(id: string, payload: UpdateWarehouseDto, organizationId: string): Promise<WarehouseType>;
    remove(id: string, organizationId: string): Promise<void>;
}
