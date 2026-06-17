import type { ItemRepository } from '../repositories/item.repository';
import { ListItemDependenciesDto } from '../dto/list-item-dependencies.dto';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
export declare class ListItemDependenciesUseCase {
    private readonly productRepository;
    private readonly genericDrugCache;
    constructor(productRepository: ItemRepository, genericDrugCache: GenericDrugCacheService);
    listCategories(payload: ListItemDependenciesDto, organizationId: string): Promise<Awaited<ReturnType<ItemRepository['listCategories']>>>;
    listGenericProducts(payload: ListItemDependenciesDto, _organizationId: string): Promise<{
        items: Array<{
            id: string;
            code: string;
            name: string;
        }>;
        total: number;
    }>;
    listUoms(payload: ListItemDependenciesDto, organizationId: string): Promise<Awaited<ReturnType<ItemRepository['listUoms']>>>;
}
