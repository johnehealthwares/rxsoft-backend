import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { WarehouseType } from '../../../shared/domain';
import { CreateWarehouseDto, ListWarehousesDto, UpdateWarehouseDto } from '../dto/warehouses.dto';
import { WarehousesService } from '../services/warehouses.service';
type WarehouseListResponse = {
    data: WarehouseType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class WarehousesController {
    private readonly warehousesService;
    constructor(warehousesService: WarehousesService);
    list(query: ListWarehousesDto, currentUser: RequestUser): Promise<WarehouseListResponse>;
    get(warehouseId: string, currentUser: RequestUser): Promise<WarehouseType>;
    create(payload: CreateWarehouseDto, currentUser: RequestUser): Promise<WarehouseType>;
    update(warehouseId: string, payload: UpdateWarehouseDto, currentUser: RequestUser): Promise<WarehouseType>;
    remove(warehouseId: string, currentUser: RequestUser): Promise<void>;
}
export {};
