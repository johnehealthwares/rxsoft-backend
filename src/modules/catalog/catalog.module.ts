import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from '../inventory/inventory.module';
import { PricingModule } from '../pricing/pricing.module';

import { PRODUCT_REPOSITORY } from './services/catalog.di-tokens';
import { CreateProductUseCase } from './services/create-product.use-case';
import { GetProductUseCase } from './services/get-product.use-case';
import { GenericProductsService } from './services/generic-products.service';
import { PharmaceuticsService } from './services/pharmaceutics.service';
import { DrugComponentsService } from './services/drug-components.service';
import { ListProductDependenciesUseCase } from './services/list-product-dependencies.use-case';
import { ListProductsUseCase } from './services/list-products.use-case';

import { InMemoryProductRepository } from './repositories/in-memory-product.repository';
import { TypeormProductRepository } from './repositories/typeorm-product.repository';

import { ProductsController } from './controllers/products.controller';
import { GenericProductsController } from './controllers/generic-products.controller';
import { PharmaceuticsController } from './controllers/pharmaceutics.controller';
import { DrugComponentsController } from './controllers/drug-components.controller';

import {
  DrugComponentOrmEntity,
  GenericProductOrmEntity,
  PharmaceuticsOrmEntity,
  ProductCategoryOrmEntity,
  ProductOrmEntity,
} from './entities';

import { UomOrmEntity } from '../sales/entities';
import { UpdateProductUseCase } from './services/update-product.use-case';

const catalogConfigService = new ConfigService();
const useInMemoryRepos = catalogConfigService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
const catalogPersistenceImports = useInMemoryRepos
  ? []
  : [
      TypeOrmModule.forFeature([
        ProductOrmEntity,
        ProductCategoryOrmEntity,
        GenericProductOrmEntity,
        PharmaceuticsOrmEntity,
        DrugComponentOrmEntity,
        UomOrmEntity,
      ]),
      PricingModule,
    ];
const catalogRepositoryProviders = useInMemoryRepos
  ? [
      InMemoryProductRepository,
      {
        provide: PRODUCT_REPOSITORY,
        useExisting: InMemoryProductRepository,
      },
    ]
  : [
      TypeormProductRepository,
      {
        provide: PRODUCT_REPOSITORY,
        useExisting: TypeormProductRepository,
      },
    ];
const catalogControllers = useInMemoryRepos
  ? [ProductsController]
  : [ProductsController, GenericProductsController, PharmaceuticsController, DrugComponentsController];
const catalogExtraProviders = useInMemoryRepos ? [] : [GenericProductsService, PharmaceuticsService, DrugComponentsService];

@Module({
  imports: [
    ConfigModule,
    InventoryModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
    }),

    ...catalogPersistenceImports,
  ],
  controllers: catalogControllers,
  providers: [
    CreateProductUseCase,
    UpdateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
    ListProductDependenciesUseCase,
    ...catalogExtraProviders,
    ...catalogRepositoryProviders,
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class CatalogModule { }
