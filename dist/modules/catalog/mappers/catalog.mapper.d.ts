import { Item } from '../domains/item.entity';
import { ItemCategory } from '../domains/item-category.entity';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../entities/item-category.orm-entity';
import { ForeignProperty } from '../dto/item-response.dto';
export declare class CatalogMapper {
    static toDomainItemCategory(orm: ItemCategoryOrmEntity): ItemCategory;
    static toForeignProperty(orm: {
        id: string;
        code: string | null;
        name: string;
    }): ForeignProperty;
    static toDomainItem(orm: ItemOrmEntity): Item;
}
