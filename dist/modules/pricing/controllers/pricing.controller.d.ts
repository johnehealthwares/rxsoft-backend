import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { PriceListItemType, PriceListType } from '../../../shared/domain';
import { AdjustItemPriceDto, CreatePriceListDto, CreatePriceListItemDto, ListPriceListItemsDto, ListPriceListsDto, UpdatePriceListDto, UpdatePriceListItemDto } from '../dto/pricing.dto';
import { PricingService } from '../services/pricing.service';
type PriceListResponse = {
    data: PriceListType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
type PriceListItemResponse = {
    data: PriceListItemType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
type PriceListSearchResponse = {
    data: Array<{
        id: string;
        code: string;
        name: string;
    }>;
};
export declare class PricingController {
    private readonly pricingService;
    constructor(pricingService: PricingService);
    list(query: ListPriceListsDto, currentUser: RequestUser): Promise<PriceListResponse>;
    search(query: ListPriceListsDto, currentUser: RequestUser): Promise<PriceListSearchResponse>;
    createItem(payload: CreatePriceListItemDto, currentUser: RequestUser): Promise<PriceListItemType>;
    listAllItems(query: ListPriceListItemsDto, currentUser: RequestUser): Promise<PriceListItemResponse>;
    get(priceListId: string, currentUser: RequestUser): Promise<PriceListType>;
    create(payload: CreatePriceListDto, currentUser: RequestUser): Promise<PriceListType>;
    update(priceListId: string, payload: UpdatePriceListDto, currentUser: RequestUser): Promise<PriceListType>;
    listPriceListItems(priceListId: string, query: ListPriceListItemsDto, currentUser: RequestUser): Promise<PriceListItemResponse>;
    updateItem(priceListId: string, itemId: string, payload: UpdatePriceListItemDto, currentUser: RequestUser): Promise<PriceListItemType>;
    adjustPrice(payload: AdjustItemPriceDto, currentUser: RequestUser): Promise<PriceListItemType>;
    remove(priceListId: string, currentUser: RequestUser): Promise<void>;
    removeItem(priceListId: string, itemId: string, currentUser: RequestUser): Promise<void>;
}
export {};
