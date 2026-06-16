import { Item } from '../domains/item.entity';
import { ItemCategory } from '../domains/item-category.entity';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../entities/item-category.orm-entity';
import { ForeignProperty } from '../dto/item-response.dto';

export class CatalogMapper {
  static toDomainItemCategory(orm: ItemCategoryOrmEntity): ItemCategory {
    return new ItemCategory(orm.id, orm.code, orm.name);
  }

  static toForeignProperty(orm: {id: string, code: string | null, name: string}): ForeignProperty {
    return {
      id: orm.id,
      code: orm.code,
      name: orm.name,
    };
  }

  static toDomainItem(orm: ItemOrmEntity): Item {
    return new Item(
      orm.id,
      orm.organizationId,
      orm.code,
      orm.name,
      orm.genericProductCode,
      orm.category?.id,
      orm.category && this.toDomainItemCategory(orm.category),
      orm.baseUomId,
      orm.purchaseUomId,
      orm.saleUomId,
      orm.baseUom && this.toForeignProperty(orm.baseUom),
      orm.purchaseUom && this.toForeignProperty(orm.purchaseUom),
      orm.saleUom && this.toForeignProperty(orm.saleUom),
      orm.barcode,
      orm.trackLot,
      orm.trackExpiry,
      orm.shelfLifeDays,
      orm.isActive,
      orm.imageUrl ?? null,
      orm.smallImageUrl ?? null,
      orm.mediumImageUrl ?? null,
      orm.largeImageUrl ?? null,
    );
  }
}
