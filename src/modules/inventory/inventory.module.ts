import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemOrmEntity } from '../catalog/entities/item.orm-entity';
import { InventoryController } from './controllers/inventory.controller';
import { StockLocationsController } from './controllers/stock-locations.controller';
import { InMemoryInventoryRepository } from './repositories/in-memory-inventory.repository';
import { TypeormInventoryRepository } from './repositories/typeorm-inventory.repository';
import { INVENTORY_REPOSITORY } from './services/inventory.di-tokens';
import { ListStockBalancesUseCase } from './services/list-stock-balances.use-case';
import { CreateStockAdjustmentUseCase } from './services/create-stock-adjustment.use-case';
import { InventoryService } from './services/inventory.service';
import { StockLocationsService } from './services/stock-locations.service';
import {
  StockAdjustmentOrmEntity,
  StockBalanceOrmEntity,
  StockLocationOrmEntity,
  StockLotOrmEntity,
  StockMovementOrmEntity,
  StoreStockLocationOrmEntity,
  WarehouseOrmEntity,
} from './entities';
import { ListStockMovementsUseCase } from './services/list-stock-movements.use-case';
import { AccountingModule } from '../accounting/accounting.module';
import { PrintModule } from '../print/print.module';
import { UomOrmEntity } from '../sales/entities/';

const inventoryConfigService = new ConfigService();
const useInMemoryRepos = inventoryConfigService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
const inventoryPersistenceImports = useInMemoryRepos
  ? []
  : [
      TypeOrmModule.forFeature([
        StockBalanceOrmEntity,
        StockAdjustmentOrmEntity,
        StockLocationOrmEntity,
        StockLotOrmEntity,
        StockMovementOrmEntity,
        StoreStockLocationOrmEntity,
        WarehouseOrmEntity,
        ItemOrmEntity,
        UomOrmEntity,
      ]),
    ];
const inventoryRepositoryProviders = useInMemoryRepos
  ? [
      InMemoryInventoryRepository,
      {
        provide: INVENTORY_REPOSITORY,
        useExisting: InMemoryInventoryRepository,
      },
    ]
  : [
      TypeormInventoryRepository,
      {
        provide: INVENTORY_REPOSITORY,
        useExisting: TypeormInventoryRepository,
      },
    ];
const inventoryControllers = useInMemoryRepos
  ? [InventoryController]
  : [InventoryController, StockLocationsController];
const inventoryExtraProviders = useInMemoryRepos ? [] : [StockLocationsService];

@Module({
  imports: [JwtModule.register({}), AccountingModule, PrintModule, ...inventoryPersistenceImports],
  controllers: inventoryControllers,
  providers: [
    ListStockBalancesUseCase,
    ListStockMovementsUseCase,
    CreateStockAdjustmentUseCase,
    InventoryService,
    ...inventoryExtraProviders,
    ...inventoryRepositoryProviders,
  ],
  exports: [InventoryService],
})
export class InventoryModule {}
