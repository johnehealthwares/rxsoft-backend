import { GenericProduct } from '../domains/generic-product.entity';
import { Pharmaceutics } from '../domains/pharmaceutics.entity';
import { Item } from '../domains/item.entity';
import { ItemCategory } from '../domains/item-category.entity';
import { GenericProductOrmEntity } from '../entities/generic-product.orm-entity';
import { PharmaceuticsOrmEntity } from '../entities/pharmaceutics.orm-entity';
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

  static toDomainPharmaceutics(orm: PharmaceuticsOrmEntity): Pharmaceutics {
    return new Pharmaceutics(
      orm.id,
      orm.code,
      orm.clinicalName ?? '',
      orm.drugClass ?? '',
      orm.pharmaceutics ?? '',
      orm.indications ?? '',
      orm.contraindications ?? '',
      'Blood'
    );
  }

  static toDomainGenericProduct(orm: GenericProductOrmEntity): GenericProduct {
    return new GenericProduct(
      orm.id,
      orm.code,
      orm.name,
      orm.generalUse,
      orm.adultDosage,
      orm.pediatricDosage,
      orm.isPrescriptionRequired,
      orm.isControlledSubstance,
      orm.pharmaceutics && this.toDomainPharmaceutics(orm.pharmaceutics),
    );
  }
  
  static toDomainItem(orm: ItemOrmEntity): Item {
    return new Item(
      orm.id,
      orm.organizationId,
      orm.code,
      orm.name,
      orm.genericProduct?.id,
      orm.category?.id,
      orm.category && this.toDomainItemCategory(orm.category),
      orm.genericProduct && this.toDomainGenericProduct(orm.genericProduct),
      orm.baseUomId,
      orm.purchaseUomId,
      orm.saleUomId,  
      orm.baseUom && this.toForeignProperty(orm.baseUom),
      orm.purchaseUom && this.toForeignProperty(orm.baseUom),
      orm.saleUom && this.toForeignProperty(orm.baseUom),
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
