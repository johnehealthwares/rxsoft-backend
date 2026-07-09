import { Repository } from 'typeorm';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { ItemCategoryType } from '../../../shared/domain';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categories.dto';
import { ItemCategoryOrmEntity } from "../../catalog/entities";
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<ItemCategoryOrmEntity>);
    list(query: ListQueryDto, organizationId: string): Promise<{
        data: ItemCategoryType[];
        total: number;
    }>;
    getLastCreated(organizationId: string): Promise<{
        id: string;
        code: string;
        createdAt: string;
    } | null>;
    createCategory(payload: CreateCategoryDto, organizationId: string): Promise<ItemCategoryType>;
    findById(id: string): Promise<ItemCategoryType>;
    updateCategory(id: string, payload: UpdateCategoryDto, organizationId: string): Promise<ItemCategoryType>;
    archive(id: string, organizationId: string): Promise<void>;
}
