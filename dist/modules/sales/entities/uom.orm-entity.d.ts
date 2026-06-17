import { UomCategoryOrmEntity } from './uom-category.orm-entity';
export declare class UomOrmEntity {
    id: string;
    organizationId: string;
    categoryId: string | null;
    category: UomCategoryOrmEntity | null;
    code: string | null;
    name: string;
    uomType: 'reference' | 'bigger' | 'smaller';
    factor: number;
    rounding: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
