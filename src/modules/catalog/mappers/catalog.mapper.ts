import { GenericProduct } from '../domains/generic-product.entity';
import { Pharmaceutics } from '../domains/pharmaceutics.entity';
import { Product } from '../domains/product.entity';
import { ProductCategory } from '../domains/product-category.entity';
import { GenericProductOrmEntity } from '../entities/generic-product.orm-entity';
import { PharmaceuticsOrmEntity } from '../entities/pharmaceutics.orm-entity';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { ProductCategoryOrmEntity } from '../entities/product-category.orm-entity';

export class CatalogMapper {
  static toDomainCategory(orm: ProductCategoryOrmEntity): ProductCategory {
    return new ProductCategory(orm.id, orm.code, orm.name);
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

  static toDomainProduct(orm: ProductOrmEntity): Product {
    return new Product(
      orm.id,
      orm.organizationId,
      orm.code,
      orm.name,
      orm.genericProduct?.id,
      orm.category?.id,
      orm.category && this.toDomainCategory(orm.category),
      orm.genericProduct && this.toDomainGenericProduct(orm.genericProduct),
      orm.baseUomId,
      orm.purchaseUomId,
      orm.saleUomId,
      orm.barcode,
      orm.trackLot,
      orm.trackExpiry,
      orm.shelfLifeDays,
      orm.isActive,
    );
  }
}
