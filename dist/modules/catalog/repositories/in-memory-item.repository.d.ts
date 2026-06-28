import { Item } from '../domains/item.entity';
import { ItemCategory } from '../domains/item-category.entity';
import { ItemDependencySearchQuery, ItemListQuery, ItemMetrics, ItemMetricsQuery, ItemRepository, UomLookup } from './item.repository';
export declare class InMemoryItemRepository implements ItemRepository {
    private readonly items;
    private readonly createdAtById;
    private readonly categories;
    private readonly uoms;
    constructor();
    list(query: ItemListQuery): Promise<{
        items: Item[];
        total: number;
    }>;
    findById(id: string, organizationId: string): Promise<Item | null>;
    findByCode(code: string, organizationId: string): Promise<Item | null>;
    findByBarcode(barcode: string, organizationId: string): Promise<Item | null>;
    findCategoryById(id: string, _organizationId: string): Promise<ItemCategory | null>;
    findUomById(id: string, _organizationId: string): Promise<UomLookup | null>;
    listCategories(query: ItemDependencySearchQuery): Promise<{
        items: Array<{
            id: string;
            code: string;
            name: string;
        }>;
        total: number;
    }>;
    listUoms(query: ItemDependencySearchQuery): Promise<{
        items: UomLookup[];
        total: number;
    }>;
    findLastCreated(organizationId: string): Promise<Item | null>;
    getMetrics(query: ItemMetricsQuery): Promise<ItemMetrics>;
    save(product: Item): Promise<Item>;
}
