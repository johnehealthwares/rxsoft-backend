import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { StockLocationType } from '../../../shared/domain';
import { CreateStockLocationDto, ListStockLocationsDto, UpdateStockLocationDto } from '../dto/stock-locations.dto';
import { StockLocationsService } from '../services/stock-locations.service';
type StockLocationListResponse = {
    data: StockLocationType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
type StockLocationSearchResponse = {
    data: Array<{
        id: string;
        code: string | null;
        name: string;
    }>;
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class StockLocationsController {
    private readonly stockLocationsService;
    constructor(stockLocationsService: StockLocationsService);
    list(query: ListStockLocationsDto, currentUser: RequestUser): Promise<StockLocationListResponse>;
    search(query: ListStockLocationsDto, currentUser: RequestUser): Promise<StockLocationSearchResponse>;
    get(stockLocationId: string, currentUser: RequestUser): Promise<StockLocationType>;
    create(payload: CreateStockLocationDto, currentUser: RequestUser): Promise<StockLocationType>;
    replace(stockLocationId: string, payload: UpdateStockLocationDto, currentUser: RequestUser): Promise<StockLocationType>;
    patch(stockLocationId: string, payload: UpdateStockLocationDto, currentUser: RequestUser): Promise<StockLocationType>;
}
export {};
