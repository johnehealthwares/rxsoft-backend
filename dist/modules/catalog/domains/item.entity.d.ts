import { ForeignProperty } from '../dto/item-response.dto';
import { ItemCategory } from './item-category.entity';
export declare class Item {
    readonly id: string;
    readonly organizationId: string;
    readonly code: string;
    readonly name: string;
    readonly genericProductCode: string | null;
    readonly categoryId: string;
    readonly category: ItemCategory;
    readonly baseUomId: string;
    readonly purchaseUomId: string | null;
    readonly saleUomId: string | null;
    readonly baseUom: ForeignProperty | null;
    readonly purchaseUom: ForeignProperty | null;
    readonly saleUom: ForeignProperty | null;
    readonly barcode: string | null;
    readonly trackLot: boolean;
    readonly trackExpiry: boolean;
    readonly shelfLifeDays: number | null;
    readonly isActive: boolean;
    readonly imageUrl: string | null;
    readonly smallImageUrl: string | null;
    readonly mediumImageUrl: string | null;
    readonly largeImageUrl: string | null;
    constructor(id: string, organizationId: string, code: string, name: string, genericProductCode: string | null, categoryId: string, category: ItemCategory, baseUomId: string, purchaseUomId: string | null, saleUomId: string | null, baseUom: ForeignProperty | null, purchaseUom: ForeignProperty | null, saleUom: ForeignProperty | null, barcode: string | null, trackLot: boolean, trackExpiry: boolean, shelfLifeDays: number | null, isActive: boolean, imageUrl?: string | null, smallImageUrl?: string | null, mediumImageUrl?: string | null, largeImageUrl?: string | null);
}
