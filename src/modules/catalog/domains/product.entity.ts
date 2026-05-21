import { ForeignProperty } from '../dto/product-response.dto';
import { GenericProduct } from './generic-product.entity';
import { ProductCategory } from './product-category.entity';

export class Product {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly genericProductId: string,
    public readonly categoryId: string,
    public readonly category: ProductCategory,
    public readonly genericProduct: GenericProduct,
    public readonly baseUomId: string,
    public readonly purchaseUomId: string | null,
    public readonly saleUomId: string | null,
    public readonly baseUom: ForeignProperty | null,
    public readonly purchaseUom: ForeignProperty | null,
    public readonly saleUom: ForeignProperty | null,
    public readonly barcode: string | null,
    public readonly trackLot: boolean,
    public readonly trackExpiry: boolean,
    public readonly shelfLifeDays: number | null,
    public readonly isActive: boolean,
  ) {}
}
