import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { PriceListItemType, PriceListType } from '../../../shared/domain';
import {
  AdjustProductPriceDto,
  CreatePriceListDto,
  CreatePriceListItemDto,
  ListPriceListItemsDto,
  ListPriceListsDto,
  UpdatePriceListDto,
  UpdatePriceListItemDto,
} from '../dto/pricing.dto';
import { PricingService } from '../services/pricing.service';

type PriceListResponse = {
  data: PriceListType[];
  meta: { page: number; limit: number; total: number };
};

type PriceListItemResponse = {
  data: PriceListItemType[];
  meta: { page: number; limit: number; total: number };
};

type PriceListSearchResponse = {
  data: Array<{ id: string; code: string; name: string }>;
};

@ApiTags('price-lists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('price-lists')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'List price lists' })
  async list(@Query() query: ListPriceListsDto, @CurrentUser() currentUser: RequestUser): Promise<PriceListResponse> {
    const result = await this.pricingService.listPriceLists(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('search')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  async search(@Query() query: ListPriceListsDto, @CurrentUser() currentUser: RequestUser): Promise<PriceListSearchResponse> {
    const result = await this.pricingService.listPriceLists(query, currentUser.organizationId);
    return { data: result.data.map((item) => ({ id: item.id, code: item.code, name: item.name })) };
  }

  @Get(':priceListId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  async get(@Param('priceListId') priceListId: string, @CurrentUser() currentUser: RequestUser): Promise<PriceListType> {
    return this.pricingService.getPriceList(priceListId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('pricing.price_list.create')
  async create(@Body() payload: CreatePriceListDto, @CurrentUser() currentUser: RequestUser): Promise<PriceListType> {
    return this.pricingService.createPriceList(payload, currentUser.organizationId);
  }

  @Patch(':priceListId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('pricing.price_list.update')
  async update(
    @Param('priceListId') priceListId: string,
    @Body() payload: UpdatePriceListDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PriceListType> {
    return this.pricingService.updatePriceList(priceListId, payload, currentUser.organizationId);
  }

  @Get(':priceListId/items')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  async listItems(
    @Param('priceListId') priceListId: string,
    @Query() query: ListPriceListItemsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PriceListItemResponse> {
    const result = await this.pricingService.listPriceListItems(priceListId, query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Post(':priceListId/items')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('pricing.price_list_item.create')
  async createItem(
    @Param('priceListId') priceListId: string,
    @Body() payload: CreatePriceListItemDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PriceListItemType> {
    return this.pricingService.createPriceListItem(priceListId, payload, currentUser.organizationId);
  }

  @Patch(':priceListId/items/:itemId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('pricing.price_list_item.update')
  async updateItem(
    @Param('priceListId') priceListId: string,
    @Param('itemId') itemId: string,
    @Body() payload: UpdatePriceListItemDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PriceListItemType> {
    return this.pricingService.updatePriceListItem(
      priceListId,
      itemId,
      payload,
      currentUser.organizationId,
    );
  }

  @Post('adjust-price')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('pricing.product_price.adjust')
  async adjustPrice(
    @Body() payload: AdjustProductPriceDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PriceListItemType> {
    return this.pricingService.adjustProductPrice(payload, currentUser.organizationId);
  }

  @Delete(':priceListId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('pricing.price_list.delete')
  async remove(@Param('priceListId') priceListId: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.pricingService.deletePriceList(priceListId, currentUser.organizationId);
  }

  @Delete(':priceListId/items/:itemId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('pricing.price_list_item.delete')
  async removeItem(
    @Param('priceListId') priceListId: string,
    @Param('itemId') itemId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<void> {
    await this.pricingService.deletePriceListItem(priceListId, itemId, currentUser.organizationId);
  }
}
