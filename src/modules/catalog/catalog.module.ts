import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from '../inventory/inventory.module';
import { PricingModule } from '../pricing/pricing.module';
import { ServicesModule } from '../../services/services.module';

import { ITEM_REPOSITORY } from './services/catalog.di-tokens';
import { CreateItemUseCase } from './services/create-item.use-case';
import { GetItemUseCase } from './services/get-item.use-case';
import { GenericProductsService } from './services/generic-products.service';
import { PharmaceuticsService } from './services/pharmaceutics.service';
import { DrugComponentsService } from './services/drug-components.service';
import { ListItemDependenciesUseCase } from './services/list-item-dependencies.use-case';
import { ListItemsUseCase } from './services/list-items.use-case';

import { InMemoryItemRepository } from './repositories/in-memory-item.repository';
import { TypeormItemRepository } from './repositories/typeorm-item.repository';

import { ItemsController } from './controllers/items.controller';
import { GenericProductsController } from './controllers/generic-products.controller';
import { PharmaceuticsController } from './controllers/pharmaceutics.controller';
import { DrugComponentsController } from './controllers/drug-components.controller';

import {
  ItemCategoryOrmEntity,
  ItemOrmEntity,
  ClassificationOrmEntity,
} from './entities';

import { UomOrmEntity } from '../sales/entities';
import { UpdateItemUseCase } from './services/update-item.use-case';
import { PatchItemUseCase } from './services/patch-item.use-case';

const catalogConfigService = new ConfigService();
const useInMemoryRepos = catalogConfigService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
const catalogPersistenceImports = useInMemoryRepos
  ? []
  : [
      TypeOrmModule.forFeature([
        ItemOrmEntity,
        ItemCategoryOrmEntity,
        UomOrmEntity,
        ClassificationOrmEntity,
      ]),
      PricingModule,
    ];
const catalogRepositoryProviders = useInMemoryRepos
  ? [
      InMemoryItemRepository,
      {
        provide: ITEM_REPOSITORY,
        useExisting: InMemoryItemRepository,
      },
    ]
  : [
      TypeormItemRepository,
      {
        provide: ITEM_REPOSITORY,
        useExisting: TypeormItemRepository,
      },
    ];
const catalogControllers = useInMemoryRepos
  ? [ItemsController]
  : [ItemsController, GenericProductsController, PharmaceuticsController, DrugComponentsController];
const catalogExtraProviders = useInMemoryRepos ? [] : [GenericProductsService, PharmaceuticsService, DrugComponentsService];

@Module({
  imports: [
    ConfigModule,
    InventoryModule,
    ServicesModule,

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
    CreateItemUseCase,
    UpdateItemUseCase,
    PatchItemUseCase,
    GetItemUseCase,
    ListItemsUseCase,
    ListItemDependenciesUseCase,
    ...catalogExtraProviders,
    ...catalogRepositoryProviders,
  ],
  exports: [ITEM_REPOSITORY],
})
export class CatalogModule { }
