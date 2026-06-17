import { AdjustStockByReferenceDto } from 'src/modules/inventory/dto/stock-locations.dto';
import { CreatePriceListItemDto } from 'src/modules/pricing/dto/pricing.dto';
export declare class CreateItemDto {
    code: string;
    name: string;
    categoryId: string;
    genericProductCode?: string;
    baseUomId: string;
    purchaseUomId?: string;
    saleUomId?: string;
    barcode?: string;
    trackLot?: boolean;
    trackExpiry?: boolean;
    shelfLifeDays?: number;
    isActive?: boolean;
    imageUrl?: string;
    smallImageUrl?: string;
    mediumImageUrl?: string;
    largeImageUrl?: string;
    priceListItems?: CreatePriceListItemDto[];
    stockItems?: AdjustStockByReferenceDto[];
}
