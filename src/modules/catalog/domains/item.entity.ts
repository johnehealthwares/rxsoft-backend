import { ForeignProperty } from '../dto/item-response.dto';
import { GenericProduct } from './generic-product.entity';
import { ItemCategory } from './item-category.entity';

export class Item {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly genericProductId: string,
    public readonly categoryId: string,
    public readonly category: ItemCategory,
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
    public readonly imageUrl: string | null = null,
    public readonly smallImageUrl: string | null = null,
    public readonly mediumImageUrl: string | null = null,
    public readonly largeImageUrl: string | null = null,
  ) {}
}
