import { UomOrmEntity } from './uom.orm-entity';
export declare class UomCategoryOrmEntity {
    id: string;
    organizationId: string;
    code: string | null;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    uoms: UomOrmEntity[];
}
