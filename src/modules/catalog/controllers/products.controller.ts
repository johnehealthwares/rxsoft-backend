import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';
import { ListProductDependenciesDto } from '../dto/list-product-dependencies.dto';
import { ListProductsDto } from '../dto/list-products.dto';
import { ProductResponseDto } from '../dto/product-response.dto';
import { CreateProductUseCase } from '../services/create-product.use-case';
import { GetProductUseCase } from '../services/get-product.use-case';
import { ListProductDependenciesUseCase } from '../services/list-product-dependencies.use-case';
import { ListProductsUseCase } from '../services/list-products.use-case';
import { Product } from '../domains/product.entity';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { UpdateProductUseCase } from '../services/update-product.use-case';

type ProductListResponse = {
  data: ProductResponseDto[];
  meta: { page: number; limit: number; total: number; sortBy: string; sortOrder: string };
};

type ProductDependencyResponse<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number };
};

function toResponse(product: Product): ProductResponseDto {
  return {
    id: product.id,
    code: product.code,
    name: product.name,
    category: {
      code: product.category.code,
      name: product.category.name,
    },
    genericProductId: product.genericProductId,
    categoryId: product.categoryId,
    genericProduct: {
      code: product.genericProduct.code,
      name: product.genericProduct.name,
      pharmaceutics: product.genericProduct.pharmaceutics && {
        code: product.genericProduct.pharmaceutics.code,
        clinicalName: product.genericProduct.pharmaceutics.clinicalName,
        drugClass: product.genericProduct.pharmaceutics.drugClass,
        pharmaceutics: product.genericProduct.pharmaceutics.pharmaceutics,
      },
      isPrescriptionRequired: product.genericProduct.isPrescriptionRequired,
      isControlledSubstance: product.genericProduct.isControlledSubstance,
    },
    baseUomId: product.baseUomId,
    purchaseUomId: product.purchaseUomId,
    saleUomId: product.saleUomId,
    barcode: product.barcode,
    trackLot: product.trackLot,
    trackExpiry: product.trackExpiry,
    shelfLifeDays: product.shelfLifeDays,
    isActive: product.isActive,
  };
}

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly listProductDependenciesUseCase: ListProductDependenciesUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'List products with pagination, filtering and sorting' })
  async list(@Query() query: ListProductsDto, @CurrentUser() currentUser: RequestUser): Promise<ProductListResponse> {
    const result = await this.listProductsUseCase.execute(query, currentUser.organizationId);

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
  @ApiOperation({ summary: 'Search product categories by name or code' })
  async listCategories(
    @Query() query: ListProductDependenciesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ProductDependencyResponse<Awaited<ReturnType<ListProductDependenciesUseCase['listCategories']>>['items'][number]>> {
    const result = await this.listProductDependenciesUseCase.listCategories(query, currentUser.organizationId);
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
    @Query() query: ListProductDependenciesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ProductDependencyResponse<Awaited<ReturnType<ListProductDependenciesUseCase['listGenericProducts']>>['items'][number]>> {
    const result = await this.listProductDependenciesUseCase.listGenericProducts(
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
    @Query() query: ListProductDependenciesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ProductDependencyResponse<Awaited<ReturnType<ListProductDependenciesUseCase['listUoms']>>['items'][number]>> {
    const result = await this.listProductDependenciesUseCase.listUoms(query, currentUser.organizationId);
    return {
      data: result.items,
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Get(':productId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'Get product details by id' })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  async get(
    @Param('productId') productId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ProductResponseDto> {
    const product = await this.getProductUseCase.execute(productId, currentUser.organizationId);
    return toResponse(product);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.product.create')
  @ApiOperation({ summary: 'Create a catalog product' })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async create(
    @Body() payload: CreateProductDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ProductResponseDto> {
    const product = await this.createProductUseCase.execute(payload, currentUser.organizationId, currentUser.sub);
    return toResponse(product);
  }


  @Put(":productId")
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.product.create')
  @ApiOperation({ summary: 'Create a catalog product' })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async replace(
    @Body() payload: CreateProductDto,
    @CurrentUser() currentUser: RequestUser,
    @Param('productId') productId: string,
  ): Promise<ProductResponseDto> {
    const product = await this.updateProductUseCase.execute(productId, payload, currentUser.organizationId, currentUser.sub);
    return toResponse(product);
  }

  @Patch(":productId")
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.product.create')
  @ApiOperation({ summary: 'Patch a catalog product' })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async patch(
    @Body() payload: CreateProductDto,
    @CurrentUser() currentUser: RequestUser,
    @Param('productId') productId: string,
  ): Promise<ProductResponseDto> {
    const product = await this.updateProductUseCase.execute(productId, payload, currentUser.organizationId, currentUser.sub);
    return toResponse(product);
  }
}
