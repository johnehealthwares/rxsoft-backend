import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from '../dto/create-item.dto';
import { ReplaceItemDto } from '../dto/replace-item.dto';
import { ListItemDependenciesDto } from '../dto/list-item-dependencies.dto';
import { ListItemsDto } from '../dto/list-items.dto';
import { ItemResponseDto } from '../dto/item-response.dto';
import { CreateItemUseCase } from '../services/create-item.use-case';
import { GetItemUseCase } from '../services/get-item.use-case';
import { ListItemDependenciesUseCase } from '../services/list-item-dependencies.use-case';
import { ListItemsUseCase } from '../services/list-items.use-case';
import { Item } from '../domains/item.entity';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { OrganisationItemsService } from '../services/organisation-items.service';
import { UomOrmEntity } from '../../sales/entities/uom.orm-entity';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { UpdateItemUseCase } from '../services/update-item.use-case';
import { PatchItemUseCase } from '../services/patch-item.use-case';
import { PatchItemDto } from '../dto/patch-item.dto';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
import { ITEM_REPOSITORY } from '../services/catalog.di-tokens';
import type { ItemRepository, ItemMetricsQuery } from '../repositories/item.repository';

type ItemListResponse = {
  data: ItemResponseDto[];
  meta: { page: number; limit: number; total: number; sortBy: string; sortOrder: string };
};

type ItemDependencyResponse<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('items')
export class ItemsController {
  constructor(
    private readonly listItemsUseCase: ListItemsUseCase,
    private readonly listItemDependenciesUseCase: ListItemDependenciesUseCase,
    private readonly getItemUseCase: GetItemUseCase,
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly updateItemUseCase: UpdateItemUseCase,
    private readonly patchItemUseCase: PatchItemUseCase,
    private readonly genericDrugCache: GenericDrugCacheService,
    private readonly organisationItemsService: OrganisationItemsService,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepo: Repository<ItemOrmEntity>,
    @InjectRepository(UomOrmEntity)
    private readonly uomRepo: Repository<UomOrmEntity>,
    @Inject(ITEM_REPOSITORY)
    private readonly itemRepository: ItemRepository,
  ) {}

  private toResponse(item: Item): ItemResponseDto {
    const cached = item.genericProductCode
      ? this.genericDrugCache.getByCode(item.genericProductCode)
      : null;
    return {
      id: item.id,
      code: item.code,
      name: item.name,
      displayName: item.displayName,
      visibility: item.visibility,
      category: item.category && {
        id: item.category.id,
        code: item.category.code,
        name: item.category.name,
      },
      genericProductCode: item.genericProductCode,
      categoryId: item.categoryId,
      genericProduct: cached
        ? {
            id: cached.id,
            code: cached.code,
            name: cached.name,
            pharmaceutics: cached.pharmaceutics
              ? {
                  code: cached.pharmaceutics.code,
                  clinicalName: cached.pharmaceutics.clinicalName ?? '',
                  drugClass: cached.pharmaceutics.drugClass ?? '',
                  pharmaceutics: cached.pharmaceutics.pharmaceutics ?? '',
                }
              : { code: '', clinicalName: '', drugClass: '', pharmaceutics: '' },
            isPrescriptionRequired: cached.isPrescriptionRequired ?? false,
            isControlledSubstance: cached.isControlledSubstance ?? false,
          }
        : null,
      baseUomId: item.baseUomId,
      purchaseUomId: item.purchaseUomId,
      saleUomId: item.saleUomId,
      baseUom: item.baseUom,
      purchaseUom: item.purchaseUom,
      saleUom: item.saleUom,
      barcode: item.barcode,
      alias: item.alias,
      trackLot: item.trackLot,
      trackExpiry: item.trackExpiry,
      shelfLifeDays: item.shelfLifeDays,
      isActive: item.isActive,
      imageUrl: item.imageUrl,
      smallImageUrl: item.smallImageUrl,
      mediumImageUrl: item.mediumImageUrl,
      largeImageUrl: item.largeImageUrl,
    };
  }

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'List items with pagination, filtering and sorting' })
  async list(@Query() query: ListItemsDto, @CurrentUser() currentUser: RequestUser): Promise<ItemListResponse> {
    const result = await this.listItemsUseCase.execute(query, currentUser.organizationId);
    return {
      data: result.items.map((item) => this.toResponse(item)),
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
      },
    };
  }

  @Get('dependencies/categories')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'Search item categories by name or code' })
  async listCategories(
    @Query() query: ListItemDependenciesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ItemDependencyResponse<Awaited<ReturnType<ListItemDependenciesUseCase['listCategories']>>['items'][number]>> {
    const result = await this.listItemDependenciesUseCase.listCategories(query, currentUser.organizationId);
    return {
      data: result.items,
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Get('dependencies/generic-products')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'Search generic products by name or code' })
  async listGenericProducts(
    @Query() query: ListItemDependenciesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ItemDependencyResponse<Awaited<ReturnType<ListItemDependenciesUseCase['listGenericProducts']>>['items'][number]>> {
    const result = await this.listItemDependenciesUseCase.listGenericProducts(
      query,
      currentUser.organizationId,
    );
    return {
      data: result.items,
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Get('dependencies/uoms')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'Search UOMs by name or code' })
  async listUoms(
    @Query() query: ListItemDependenciesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ItemDependencyResponse<Awaited<ReturnType<ListItemDependenciesUseCase['listUoms']>>['items'][number]>> {
    const result = await this.listItemDependenciesUseCase.listUoms(query, currentUser.organizationId);
    return {
      data: result.items,
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Get('metrics')
  @Roles('super_admin', 'admin')
  @ApiOperation({ summary: 'Get item metrics' })
  async metrics(
    @Query() query: ListItemsDto,
    @CurrentUser() _currentUser: RequestUser,
  ) {
    const metricsQuery: ItemMetricsQuery = {
      search: query.search,
      categoryCode: query.categoryCode,
    };
    return this.itemRepository.getMetrics(metricsQuery);
  }

  @Get('me')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'List active catalogue for the current organisation (org-added items only)' })
  async listMyOrganisationItems(@CurrentUser() currentUser: RequestUser) {
    return this.organisationItemsService.listActiveForOrg(currentUser.organizationId);
  }

  @Put('me/:itemId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @ApiOperation({ summary: 'Set an override for the current organisation (whitelist/blacklist/alias/code/barcode)' })
  async upsertMyOrganisationItem(
    @CurrentUser() currentUser: RequestUser,
    @Param('itemId') itemId: string,
    @Body() body?: { isActive?: boolean; alias?: string | null; code?: string | null; barcode?: string | null },
  ) {
    return this.organisationItemsService.upsert(currentUser.organizationId, itemId, body);
  }

  @Delete('me/:itemId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @ApiOperation({ summary: 'Remove an override for the current organisation' })
  async clearMyOrganisationItem(
    @Param('itemId') itemId: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.organisationItemsService.clear(currentUser.organizationId, itemId);
  }

  @Get(':itemId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'Get item details by id' })
  @ApiResponse({ status: 200, type: ItemResponseDto })
  async get(
    @Param('itemId') itemId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ItemResponseDto> {
    const item = await this.getItemUseCase.execute(itemId, currentUser.organizationId);
    return this.toResponse(item);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.item.create')
  @ApiOperation({ summary: 'Create a catalog item' })
  @ApiResponse({ status: 201, type: ItemResponseDto })
  async create(
    @Body() payload: CreateItemDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ItemResponseDto> {
    const item = await this.createItemUseCase.execute(payload, currentUser.organizationId, currentUser.sub);
    return this.toResponse(item);
  }


  @Put(":itemId")
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.item.update')
  @ApiOperation({ summary: 'Replace a catalog item (full update)' })
  @ApiResponse({ status: 200, type: ItemResponseDto })
  async replace(
    @Body() payload: ReplaceItemDto,
    @CurrentUser() currentUser: RequestUser,
    @Param('itemId') itemId: string,
  ): Promise<ItemResponseDto> {
    const item = await this.updateItemUseCase.execute(itemId, payload, currentUser.organizationId, currentUser.sub);
    return this.toResponse(item);
  }

  @Patch(":itemId")
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.item.patch')
  @ApiOperation({ summary: 'Partially update a catalog item' })
  @ApiResponse({ status: 200, type: ItemResponseDto })
  async patch(
    @Body() payload: PatchItemDto,
    @CurrentUser() currentUser: RequestUser,
    @Param('itemId') itemId: string,
  ): Promise<ItemResponseDto> {
    const item = await this.patchItemUseCase.execute(itemId, payload, currentUser.organizationId);
    return this.toResponse(item);
  }

  @Get(':itemId/uoms')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk', 'cashier')
  @ApiOperation({ summary: 'List available UOMs for an item (same category as base UOM)' })
  async listItemUoms(
    @Param('itemId') itemId: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const item = await this.itemRepo.findOne({
      where: { id: itemId },
      relations: ['baseUom'],
    });
    if (!item) return { data: [] };

    const baseUomCategoryId = item.baseUom?.categoryId;
    if (!baseUomCategoryId) return { data: [] };

    const uoms = await this.uomRepo.find({
      where: { categoryId: baseUomCategoryId, isActive: true },
      select: ['id', 'code', 'name', 'factor', 'uomType', 'rounding', 'isActive'],
    });

    return { data: uoms };
  }

  @Get('organisations/:orgId/items')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List the catalogue for an organisation (default items + org overrides)' })
  async listOrganisationItems(@Param('orgId') orgId: string) {
    return this.organisationItemsService.listForOrg(orgId);
  }

  @Put('organisations/:orgId/items')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Bulk-add every active global item to an organisation (org setup/backfill)' })
  async bulkWhitelistOrganisationItems(@Param('orgId') orgId: string) {
    return this.organisationItemsService.bulkWhitelistAll(orgId);
  }

  @Put('organisations/:orgId/items/:itemId')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Set an item override for an organisation (whitelist/blacklist/alias/code/barcode)' })
  async upsertOrganisationItem(
    @Param('orgId') orgId: string,
    @Param('itemId') itemId: string,
    @Body() body?: { isActive?: boolean; alias?: string | null; code?: string | null; barcode?: string | null },
  ) {
    return this.organisationItemsService.upsert(orgId, itemId, body);
  }

  @Delete('organisations/:orgId/items/:itemId')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Remove an item override for an organisation (back to default visibility)' })
  async clearOrganisationItem(
    @Param('orgId') orgId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.organisationItemsService.clear(orgId, itemId);
  }
}
