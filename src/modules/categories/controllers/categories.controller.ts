import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { ItemCategoryType } from '../../../shared/domain';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { toCsv } from '../../../shared/utils/csv';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categories.dto';
import { CategoriesService } from '../services/categories.service';

type CategoryListResponse = {
  data: ItemCategoryType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  @ApiOperation({ summary: 'List categories with pagination/filter/sort' })
  async list(
    @Query() query: ListQueryDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<CategoryListResponse> {
    const organizationId = currentUser.roles.includes('super_admin') && query.organizationId
      ? query.organizationId
      : currentUser.organizationId;
    const result = await this.categoriesService.list(query, organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('metrics')
  @Roles('super_admin', 'admin')
  async metrics(@CurrentUser() currentUser: RequestUser) {
    return this.categoriesService.getLastCreated(currentUser.organizationId);
  }

  @Get('export')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  @Header('Content-Type', 'text/csv')
  async export(
    @Query() query: ListQueryDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<string> {
    const organizationId = currentUser.roles.includes('super_admin') && query.organizationId
      ? query.organizationId
      : currentUser.organizationId;
    return toCsv((await this.categoriesService.list(query, organizationId)).data.map((item) => ({ ...item })) as Array<Record<string, unknown>>);
  }

  @Post()
  @Roles('super_admin', 'admin')
  create(
    @Body() payload: CreateCategoryDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ItemCategoryType> {
    return this.categoriesService.createCategory(payload, currentUser.organizationId);
  }

  @Put(':categoryId')
  @Roles('super_admin', 'admin')
  replace(
    @Param('categoryId') categoryId: string,
    @Body() payload: UpdateCategoryDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ItemCategoryType> {
    return this.categoriesService.updateCategory(categoryId, payload, currentUser.organizationId);
  }

  @Patch(':categoryId')
  @Roles('super_admin', 'admin')
  patch(
    @Param('categoryId') categoryId: string,
    @Body() payload: UpdateCategoryDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ItemCategoryType> {
    return this.categoriesService.updateCategory(categoryId, payload, currentUser.organizationId);
  }
  
  @Get(':categoryId')
  @Roles('super_admin', 'admin')
  get(@Param('categoryId') categoryId: string): Promise<ItemCategoryType> {
    return this.categoriesService.findById(categoryId);
  }

  @Delete(':categoryId')
  @Roles('super_admin', 'admin')
  async remove(
    @Param('categoryId') categoryId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<{ ok: true }> {
    await this.categoriesService.archive(categoryId, currentUser.organizationId);
    return { ok: true };
  }
}
