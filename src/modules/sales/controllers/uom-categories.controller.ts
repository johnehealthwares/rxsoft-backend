import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { UomCategoryType } from '../../../shared/domain';
import { CreateUomCategoryDto, ListUomCategoriesDto, UpdateUomCategoryDto } from '../dto/uom-categories.dto';
import { UomCategoriesService } from '../services/uom-categories.service';

type UomCategoryListResponse = {
  data: UomCategoryType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('uom-categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('uom-categories')
export class UomCategoriesController {
  constructor(private readonly uomCategoriesService: UomCategoriesService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk', 'cashier')
  @ApiOperation({ summary: 'List/search UOM categories' })
  async list(@Query() query: ListUomCategoriesDto, @CurrentUser() currentUser: RequestUser): Promise<UomCategoryListResponse> {
    const result = await this.uomCategoriesService.list(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get(':categoryId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk', 'cashier')
  get(@Param('categoryId') categoryId: string, @CurrentUser() currentUser: RequestUser): Promise<UomCategoryType> {
    return this.uomCategoriesService.get(categoryId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  create(@Body() payload: CreateUomCategoryDto, @CurrentUser() currentUser: RequestUser): Promise<UomCategoryType> {
    return this.uomCategoriesService.create(payload, currentUser.organizationId);
  }

  @Put(':categoryId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  replace(
    @Param('categoryId') categoryId: string,
    @Body() payload: UpdateUomCategoryDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<UomCategoryType> {
    return this.uomCategoriesService.update(categoryId, payload, currentUser.organizationId);
  }

  @Patch(':categoryId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  patch(
    @Param('categoryId') categoryId: string,
    @Body() payload: UpdateUomCategoryDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<UomCategoryType> {
    return this.uomCategoriesService.update(categoryId, payload, currentUser.organizationId);
  }
}
