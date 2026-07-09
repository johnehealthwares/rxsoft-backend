import { AdjustStockByReferenceDto } from "../../inventory/dto/stock-locations.dto";
import { CreatePriceListItemDto } from "../../pricing/dto/pricing.dto";
export declare class ReplaceItemDto {
    code: string;
    name: string;
    categoryId: string;
    genericProductCode?: string;
    baseUomId: string;
    purchaseUomId: string;
    saleUomId: string;
    barcode?: string;
    trackLot?: boolean;
    trackExpiry?: boolean;
    shelfLifeDays?: number;
    isActive?: boolean;
    imageUrl?: string;
    smallImageUrl?: string;
    mediumImageUrl?: string;
    largeImageUrl?: string;
    overrideCodeValidation?: boolean;
    priceListItems?: CreatePriceListItemDto[];
    stockItems?: AdjustStockByReferenceDto[];
}
