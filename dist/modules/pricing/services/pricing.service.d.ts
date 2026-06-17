import { Repository } from 'typeorm';
import type { PriceListItemType, PriceListType } from '../../../shared/domain';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { StockLocationOrmEntity } from '../../inventory/entities/stock-location.orm-entity';
import { AdjustItemPriceDto, CreatePriceListDto, CreatePriceListItemDto, ListPriceListItemsDto, ListPriceListsDto, UpdatePriceListDto, UpdatePriceListItemDto } from '../dto/pricing.dto';
import { PriceListItemOrmEntity, PriceListOrmEntity } from '../entities';
export declare class PricingService {
    private readonly priceListRepository;
    private readonly priceListItemRepository;
    private readonly itemRepository;
    private readonly stockLocationRepository;
    constructor(priceListRepository: Repository<PriceListOrmEntity>, priceListItemRepository: Repository<PriceListItemOrmEntity>, itemRepository: Repository<ItemOrmEntity>, stockLocationRepository: Repository<StockLocationOrmEntity>);
    listPriceLists(query: ListPriceListsDto, organizationId?: string): Promise<{
        data: PriceListType[];
        total: number;
    }>;
    getPriceList(id: string, organizationId?: string): Promise<PriceListType>;
    createPriceList(payload: CreatePriceListDto, organizationId?: string): Promise<PriceListType>;
    updatePriceList(id: string, payload: UpdatePriceListDto, organizationId?: string): Promise<PriceListType>;
    listPriceListItems(priceListId: string | null, query: ListPriceListItemsDto, organizationId?: string): Promise<{
        data: PriceListItemType[];
        total: number;
    }>;
    createPriceListItem(payload: CreatePriceListItemDto, organizationId?: string): Promise<PriceListItemType>;
    updatePriceListItem(priceListId: string, priceListItemId: string, payload: UpdatePriceListItemDto, organizationId?: string): Promise<PriceListItemType>;
    adjustItemPrice(payload: AdjustItemPriceDto, organizationId?: string): Promise<PriceListItemType>;
    deletePriceList(id: string, organizationId?: string): Promise<void>;
    deletePriceListItem(priceListId: string, itemId: string, organizationId?: string): Promise<void>;
}
