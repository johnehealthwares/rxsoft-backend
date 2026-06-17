import { ItemOrmEntity } from './item.orm-entity';
export declare class ItemCategoryOrmEntity {
    id: string;
    organizationId: string;
    parent: ItemCategoryOrmEntity | null;
    children: ItemCategoryOrmEntity[];
    code: string;
    name: string;
    items: ItemOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
