import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { ProductCategoryType } from '../../../shared/domain';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { toCsv } from '../../../shared/utils/csv';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categories.dto';
import { CategoriesService } from '../services/categories.service';

type CategoryListResponse = {
  data: ProductCategoryType[];
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
  async list(@Query() query: ListQueryDto): Promise<CategoryListResponse> {
    const result = await this.categoriesService.list(query);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('export')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  @Header('Content-Type', 'text/csv')
  async export(@Query() query: ListQueryDto): Promise<string> {
    return toCsv((await this.categoriesService.list(query)).data.map((item) => ({ ...item })) as Array<Record<string, unknown>>);
  }

  @Post()
  @Roles('super_admin', 'admin')
  create(@Body() payload: CreateCategoryDto): Promise<ProductCategoryType> {
    return this.categoriesService.createCategory(payload);
  }

  @Put(':categoryId')
  @Roles('super_admin', 'admin')
  replace(@Param('categoryId') categoryId: string, @Body() payload: UpdateCategoryDto): Promise<ProductCategoryType> {
    return this.categoriesService.updateCategory(categoryId, payload);
  }

  @Patch(':categoryId')
  @Roles('super_admin', 'admin')
  patch(@Param('categoryId') categoryId: string, @Body() payload: UpdateCategoryDto): Promise<ProductCategoryType> {
    return this.categoriesService.updateCategory(categoryId, payload);
  }
  
  @Get(':categoryId')
  @Roles('super_admin', 'admin')
  get(@Param('categoryId') categoryId: string): Promise<ProductCategoryType> {
    return this.categoriesService.findById(categoryId,);
  }

  @Delete(':categoryId')
  @Roles('super_admin', 'admin')
  async remove(@Param('categoryId') categoryId: string): Promise<{ ok: true }> {
    await this.categoriesService.archive(categoryId);
    return { ok: true };
  }
}
