import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { UomCategoryType } from '../../../shared/domain';
import { CreateUomCategoryDto, ListUomCategoriesDto, UpdateUomCategoryDto } from '../dto/uom-categories.dto';
import { UomCategoriesService } from '../services/uom-categories.service';
type UomCategoryListResponse = {
    data: UomCategoryType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class UomCategoriesController {
    private readonly uomCategoriesService;
    constructor(uomCategoriesService: UomCategoriesService);
    list(query: ListUomCategoriesDto, currentUser: RequestUser): Promise<UomCategoryListResponse>;
    get(categoryId: string, currentUser: RequestUser): Promise<UomCategoryType>;
    create(payload: CreateUomCategoryDto, currentUser: RequestUser): Promise<UomCategoryType>;
    replace(categoryId: string, payload: UpdateUomCategoryDto, currentUser: RequestUser): Promise<UomCategoryType>;
    patch(categoryId: string, payload: UpdateUomCategoryDto, currentUser: RequestUser): Promise<UomCategoryType>;
}
export {};
