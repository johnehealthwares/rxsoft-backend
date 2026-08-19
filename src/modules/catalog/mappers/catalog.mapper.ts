import { Item } from '../domains/item.entity';
import { ItemCategory } from '../domains/item-category.entity';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../entities/item-category.orm-entity';
import { OrganisationItemOrmEntity } from '../entities/organisation-item.orm-entity';
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

  static toDomainItem(orm: ItemOrmEntity, overlay?: OrganisationItemOrmEntity | null): Item {
    const visibility: Item['visibility'] = overlay
      ? overlay.isActive
        ? 'whitelisted'
        : 'blacklisted'
      : 'default';

    return new Item(
      orm.id,
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
      orm.trackLot,
      orm.trackExpiry,
      orm.shelfLifeDays,
      orm.isActive,
      orm.imageUrl ?? null,
      orm.smallImageUrl ?? null,
      orm.mediumImageUrl ?? null,
      orm.largeImageUrl ?? null,
      overlay?.code ?? null,
      overlay?.barcode ?? null,
      overlay?.alias ?? null,
      visibility,
    );
  }
}
