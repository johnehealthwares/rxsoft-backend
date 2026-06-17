import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { ManufacturerType } from '../../../shared/domain';
import { CreateManufacturerDto, ListManufacturersDto, UpdateManufacturerDto } from '../dto/manufacturers.dto';
import { ManufacturersService } from '../services/manufacturers.service';
type ManufacturerListResponse = {
    data: ManufacturerType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class ManufacturersController {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
    list(query: ListManufacturersDto, currentUser: RequestUser): Promise<ManufacturerListResponse>;
    metrics(currentUser: RequestUser): Promise<{
        id: string;
        code: string;
        createdAt: string;
    } | null>;
    get(manufacturerId: string, currentUser: RequestUser): Promise<ManufacturerType>;
    create(payload: CreateManufacturerDto, currentUser: RequestUser): Promise<ManufacturerType>;
    replace(manufacturerId: string, payload: UpdateManufacturerDto, currentUser: RequestUser): Promise<ManufacturerType>;
    patch(manufacturerId: string, payload: UpdateManufacturerDto, currentUser: RequestUser): Promise<ManufacturerType>;
    remove(manufacturerId: string, currentUser: RequestUser): Promise<void>;
}
export {};
