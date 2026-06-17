import { Repository } from 'typeorm';
import type { UomCategoryType } from '../../../shared/domain';
import { CreateUomCategoryDto, ListUomCategoriesDto, UpdateUomCategoryDto } from '../dto/uom-categories.dto';
import { UomCategoryOrmEntity } from '../entities/uom-category.orm-entity';
export declare class UomCategoriesService {
    private readonly uomCategoryRepository?;
    private readonly inMemory;
    constructor(uomCategoryRepository?: Repository<UomCategoryOrmEntity> | undefined);
    list(query: ListUomCategoriesDto, organizationId: string): Promise<{
        data: UomCategoryType[];
        total: number;
    }>;
    get(id: string, organizationId: string): Promise<UomCategoryType>;
    create(payload: CreateUomCategoryDto, organizationId: string): Promise<UomCategoryType>;
    update(id: string, payload: UpdateUomCategoryDto, organizationId: string): Promise<UomCategoryType>;
}
