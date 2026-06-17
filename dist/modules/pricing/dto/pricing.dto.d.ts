import { ListQueryDto } from '../../../shared/dto/list-query.dto';
export declare class ListPriceListsDto extends ListQueryDto {
}
export declare class CreatePriceListDto {
    code: string;
    name: string;
    isDefault?: boolean;
    isActive?: boolean;
}
export declare class UpdatePriceListDto {
    code?: string;
    name?: string;
    isDefault?: boolean;
    isActive?: boolean;
}
export declare class ListPriceListItemsDto extends ListQueryDto {
    itemId?: string;
    locationId?: string;
}
export declare class CreatePriceListItemDto {
    priceListId?: string;
    itemId: string;
    locationId?: string;
    currencyCode: string;
    unitPrice: number;
    startsAt?: string;
    endsAt?: string;
}
export declare class UpdatePriceListItemDto {
    itemId?: string;
    locationId?: string;
    currencyCode?: string;
    unitPrice?: number;
    startsAt?: Date;
    endsAt?: string;
}
export declare class AdjustItemPriceDto {
    priceListId: string;
    itemId: string;
    locationId?: string;
    currencyCode?: string;
    unitPrice: number;
    startsAt?: string;
    endsAt?: string;
}
