import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { GenericProductType } from '../../../shared/domain';
import { CreateGenericProductDto, ListGenericProductsDto, UpdateGenericProductDto } from '../dto/generic-products.dto';
import { GenericProductsService } from '../services/generic-products.service';
type GenericProductListResponse = {
    data: GenericProductType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
type GenericProductSearchResponse = {
    data: Array<{
        id: string;
        code: string;
        name: string;
    }>;
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class GenericProductsController {
    private readonly genericProductsService;
    constructor(genericProductsService: GenericProductsService);
    list(query: ListGenericProductsDto, currentUser: RequestUser): Promise<GenericProductListResponse>;
    search(query: ListGenericProductsDto, currentUser: RequestUser): Promise<GenericProductSearchResponse>;
    get(genericProductId: string, currentUser: RequestUser): Promise<GenericProductType>;
    create(payload: CreateGenericProductDto, currentUser: RequestUser): Promise<GenericProductType>;
    replace(genericProductId: string, payload: UpdateGenericProductDto, currentUser: RequestUser): Promise<GenericProductType>;
    patch(genericProductId: string, payload: UpdateGenericProductDto, currentUser: RequestUser): Promise<GenericProductType>;
}
export {};
