import { Repository } from 'typeorm';
import { CreateItemDto } from '../dto/create-item.dto';
import { ListItemDependenciesDto } from '../dto/list-item-dependencies.dto';
import { ListItemsDto } from '../dto/list-items.dto';
import { ItemResponseDto } from '../dto/item-response.dto';
import { CreateItemUseCase } from '../services/create-item.use-case';
import { GetItemUseCase } from '../services/get-item.use-case';
import { ListItemDependenciesUseCase } from '../services/list-item-dependencies.use-case';
import { ListItemsUseCase } from '../services/list-items.use-case';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { UomOrmEntity } from '../../sales/entities/uom.orm-entity';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { UpdateItemUseCase } from '../services/update-item.use-case';
import { PatchItemUseCase } from '../services/patch-item.use-case';
import { PatchItemDto } from '../dto/patch-item.dto';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
type ItemListResponse = {
    data: ItemResponseDto[];
    meta: {
        page: number;
        limit: number;
        total: number;
        sortBy: string;
        sortOrder: string;
    };
};
type ItemDependencyResponse<T> = {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class ItemsController {
    private readonly listItemsUseCase;
    private readonly listItemDependenciesUseCase;
    private readonly getItemUseCase;
    private readonly createItemUseCase;
    private readonly updateItemUseCase;
    private readonly patchItemUseCase;
    private readonly genericDrugCache;
    private readonly itemRepo;
    private readonly uomRepo;
    constructor(listItemsUseCase: ListItemsUseCase, listItemDependenciesUseCase: ListItemDependenciesUseCase, getItemUseCase: GetItemUseCase, createItemUseCase: CreateItemUseCase, updateItemUseCase: UpdateItemUseCase, patchItemUseCase: PatchItemUseCase, genericDrugCache: GenericDrugCacheService, itemRepo: Repository<ItemOrmEntity>, uomRepo: Repository<UomOrmEntity>);
    private toResponse;
    list(query: ListItemsDto, currentUser: RequestUser): Promise<ItemListResponse>;
    listCategories(query: ListItemDependenciesDto, currentUser: RequestUser): Promise<ItemDependencyResponse<Awaited<ReturnType<ListItemDependenciesUseCase['listCategories']>>['items'][number]>>;
    listGenericProducts(query: ListItemDependenciesDto, currentUser: RequestUser): Promise<ItemDependencyResponse<Awaited<ReturnType<ListItemDependenciesUseCase['listGenericProducts']>>['items'][number]>>;
    listUoms(query: ListItemDependenciesDto, currentUser: RequestUser): Promise<ItemDependencyResponse<Awaited<ReturnType<ListItemDependenciesUseCase['listUoms']>>['items'][number]>>;
    get(itemId: string, currentUser: RequestUser): Promise<ItemResponseDto>;
    create(payload: CreateItemDto, currentUser: RequestUser): Promise<ItemResponseDto>;
    replace(payload: CreateItemDto, currentUser: RequestUser, itemId: string): Promise<ItemResponseDto>;
    patch(payload: PatchItemDto, currentUser: RequestUser, itemId: string): Promise<ItemResponseDto>;
    listItemUoms(itemId: string, currentUser: RequestUser): Promise<{
        data: UomOrmEntity[];
    }>;
}
export {};
