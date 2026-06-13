import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from '../dto/create-item.dto';
import { ListItemDependenciesDto } from '../dto/list-item-dependencies.dto';
import { ListItemsDto } from '../dto/list-items.dto';
import { ItemResponseDto } from '../dto/item-response.dto';
import { CreateItemUseCase } from '../services/create-item.use-case';
import { GetItemUseCase } from '../services/get-item.use-case';
import { ListItemDependenciesUseCase } from '../services/list-item-dependencies.use-case';
import { ListItemsUseCase } from '../services/list-items.use-case';
import { Item } from '../domains/item.entity';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { UpdateItemUseCase } from '../services/update-item.use-case';
import { PatchItemUseCase } from '../services/patch-item.use-case';
import { PatchItemDto } from '../dto/patch-item.dto';

type ItemListResponse = {
  data: ItemResponseDto[];
  meta: { page: number; limit: number; total: number; sortBy: string; sortOrder: string };
};

type ItemDependencyResponse<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number };
};

function toResponse(item: Item): ItemResponseDto {
  return {
    id: item.id,
    code: item.code,
    name: item.name,
    category: {
      id: item.category.id,
      code: item.category.code,
      name: item.category.name,
    },
    genericProductId: item.genericProductId,
    categoryId: item.categoryId,
    genericProduct: {
      id: item.genericProduct.id,
      code: item.genericProduct.code,
      name: item.genericProduct.name,
      pharmaceutics: item.genericProduct.pharmaceutics && {
        code: item.genericProduct.pharmaceutics.code,
        clinicalName: item.genericProduct.pharmaceutics.clinicalName,
        drugClass: item.genericProduct.pharmaceutics.drugClass,
        pharmaceutics: item.genericProduct.pharmaceutics.pharmaceutics,
      },
      isPrescriptionRequired: item.genericProduct.isPrescriptionRequired,
      isControlledSubstance: item.genericProduct.isControlledSubstance,
    },
    baseUomId: item.baseUomId,
    purchaseUomId: item.purchaseUomId,
    saleUomId: item.saleUomId,
    baseUom: item.baseUom,
    purchaseUom: item.purchaseUom,
    saleUom: item.saleUom,
    barcode: item.barcode,
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
  ) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'List items with pagination, filtering and sorting' })
  async list(@Query() query: ListItemsDto, @CurrentUser() currentUser: RequestUser): Promise<ItemListResponse> {
    const result = await this.listItemsUseCase.execute(query, currentUser.organizationId);
    return {
      data: result.items.map(toResponse),
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

  @Get(':itemId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'Get item details by id' })
  @ApiResponse({ status: 200, type: ItemResponseDto })
  async get(
    @Param('itemId') itemId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ItemResponseDto> {
    const item = await this.getItemUseCase.execute(itemId, currentUser.organizationId);
    return toResponse(item);
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
    return toResponse(item);
  }


  @Put(":itemId")
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.item.create')
  @ApiOperation({ summary: 'Create a catalog item' })
  @ApiResponse({ status: 201, type: ItemResponseDto })
  async replace(
    @Body() payload: CreateItemDto,
    @CurrentUser() currentUser: RequestUser,
    @Param('itemId') itemId: string,
  ): Promise<ItemResponseDto> {
    const item = await this.updateItemUseCase.execute(itemId, payload, currentUser.organizationId, currentUser.sub);
    return toResponse(item);
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
    return toResponse(item);
  }
}
