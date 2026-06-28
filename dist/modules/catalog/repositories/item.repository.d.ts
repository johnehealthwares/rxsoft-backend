import { Item } from '../domains/item.entity';
import { ItemCategory } from '../domains/item-category.entity';
export type ItemListQuery = {
    organizationId: string;
    offset: number;
    limit: number;
    search?: string;
    showAll?: boolean;
    categoryCode?: string;
    sortBy: 'name' | 'code' | 'createdAt';
    sortOrder: 'asc' | 'desc';
};
export type ItemDependencySearchQuery = {
    organizationId: string;
    offset: number;
    limit: number;
    search?: string;
};
export type ItemCategoryLookup = {
    id: string;
    code: string;
    name: string;
};
export type GenericProductLookup = {
    id: string;
    code: string;
    name: string;
};
export type UomLookup = {
    id: string;
    code: string | null;
    name: string;
    uomType?: 'reference' | 'bigger' | 'smaller';
    rounding: number;
    factor: number;
    isActive: boolean;
};
export type ItemMetricsQuery = {
    organizationId: string;
    search?: string;
    categoryCode?: string;
};
export type ItemMetrics = {
    total: number;
    active: number;
    inactive: number;
    noCategory: number;
    noGenericProductCode: number;
};
export interface ItemRepository {
    list(query: ItemListQuery): Promise<{
        items: Item[];
        total: number;
    }>;
    findById(id: string, organizationId: string, includeAll?: boolean): Promise<Item | null>;
    findByCode(code: string, organizationId: string): Promise<Item | null>;
    findByBarcode(barCode: string, organizationId: string): Promise<Item | null>;
    findCategoryById(id: string, organizationId: string): Promise<ItemCategory | null>;
    findUomById(id: string, organizationId: string): Promise<UomLookup | null>;
    listCategories(query: ItemDependencySearchQuery): Promise<{
        items: ItemCategoryLookup[];
        total: number;
    }>;
    listUoms(query: ItemDependencySearchQuery): Promise<{
        items: UomLookup[];
        total: number;
    }>;
    save(product: Item): Promise<Item>;
    findLastCreated(organizationId: string): Promise<Item | null>;
    getMetrics(query: ItemMetricsQuery): Promise<ItemMetrics>;
}
