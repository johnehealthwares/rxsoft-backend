import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { GenericProductType } from '../../../shared/domain';
import { CreateGenericProductDto, ListGenericProductsDto, UpdateGenericProductDto } from '../dto/generic-products.dto';
import { GenericProductsService } from '../services/generic-products.service';

type GenericProductListResponse = {
  data: GenericProductType[];
  meta: { page: number; limit: number; total: number };
};

type GenericProductSearchResponse = {
  data: Array<{ id: string; code: string; name: string }>;
  meta: { page: number; limit: number; total: number };
};

@ApiTags('generic-products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('generic-products')
export class GenericProductsController {
  constructor(private readonly genericProductsService: GenericProductsService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'List generic products' })
  async list(
    @Query() query: ListGenericProductsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<GenericProductListResponse> {
    const result = await this.genericProductsService.list(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('search')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  async search(
    @Query() query: ListGenericProductsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<GenericProductSearchResponse> {
    const result = await this.genericProductsService.list(query, currentUser.organizationId);
    return {
      data: result.data.map((item) => ({ id: item.id, code: item.code, name: item.name })),
      meta: { page: query.page, limit: query.limit, total: result.total },
    };
  }

  @Get(':genericProductId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  async get(
    @Param('genericProductId') genericProductId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<GenericProductType> {
    return this.genericProductsService.get(genericProductId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.generic_product.create')
  async create(
    @Body() payload: CreateGenericProductDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<GenericProductType> {
    return this.genericProductsService.create(payload, currentUser.organizationId);
  }

  @Put(':genericProductId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.generic_product.update')
  async replace(
    @Param('genericProductId') genericProductId: string,
    @Body() payload: UpdateGenericProductDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<GenericProductType> {
    return this.genericProductsService.update(genericProductId, payload, currentUser.organizationId);
  }

  @Patch(':genericProductId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.generic_product.update')
  async patch(
    @Param('genericProductId') genericProductId: string,
    @Body() payload: UpdateGenericProductDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<GenericProductType> {
    return this.genericProductsService.update(genericProductId, payload, currentUser.organizationId);
  }
}
