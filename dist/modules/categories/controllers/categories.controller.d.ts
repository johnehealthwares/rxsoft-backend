import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { ItemCategoryType } from '../../../shared/domain';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categories.dto';
import { CategoriesService } from '../services/categories.service';
type CategoryListResponse = {
    data: ItemCategoryType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    list(query: ListQueryDto, currentUser: RequestUser): Promise<CategoryListResponse>;
    metrics(currentUser: RequestUser): Promise<{
        id: string;
        code: string;
        createdAt: string;
    } | null>;
    export(query: ListQueryDto, currentUser: RequestUser): Promise<string>;
    create(payload: CreateCategoryDto, currentUser: RequestUser): Promise<ItemCategoryType>;
    replace(categoryId: string, payload: UpdateCategoryDto, currentUser: RequestUser): Promise<ItemCategoryType>;
    patch(categoryId: string, payload: UpdateCategoryDto, currentUser: RequestUser): Promise<ItemCategoryType>;
    get(categoryId: string): Promise<ItemCategoryType>;
    remove(categoryId: string, currentUser: RequestUser): Promise<{
        ok: true;
    }>;
}
export {};
