import { Repository } from 'typeorm';
import { Item } from '../domains/item.entity';
import { ItemDependencySearchQuery, ItemListQuery, ItemMetrics, ItemMetricsQuery, ItemRepository, UomLookup } from './item.repository';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../entities/item-category.orm-entity';
import { CatalogMapper } from '../mappers/catalog.mapper';
import { UomOrmEntity } from '../../sales/entities';
export declare class TypeormItemRepository implements ItemRepository {
    private readonly repository;
    private readonly categoryRepository;
    private readonly uomRepository;
    constructor(repository: Repository<ItemOrmEntity>, categoryRepository: Repository<ItemCategoryOrmEntity>, uomRepository: Repository<UomOrmEntity>);
    list(query: ItemListQuery): Promise<{
        items: Item[];
        total: number;
    }>;
    findById(id: string, organizationId: string, includeAll: boolean): Promise<Item | null>;
    findByCode(code: string, organizationId: string): Promise<Item | null>;
    findByBarcode(barcode: string, organizationId: string): Promise<Item | null>;
    findCategoryById(id: string, organizationId: string): Promise<ReturnType<typeof CatalogMapper.toDomainItemCategory> | null>;
    findUomById(id: string, organizationId: string): Promise<UomLookup | null>;
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
