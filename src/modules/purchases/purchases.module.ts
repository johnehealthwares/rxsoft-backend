import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { InflowController } from './controllers/inflow.controller';
import { PurchasesController } from './controllers/purchases.controller';
import { GoodsReceiptLineOrmEntity, GoodsReceiptOrmEntity, PurchaseOrderLineOrmEntity, PurchaseOrderOrmEntity } from './entities';
import { InMemoryPurchasesRepository } from './repositories/in-memory-purchases.repository';
import { TypeormPurchasesRepository } from './repositories/typeorm-purchases.repository';
import { PURCHASES_REPOSITORY } from './services/purchases.di-tokens';
import { PurchasesService } from './services/purchases.service';
import { ReceiveGoodsUseCase } from './services/receive-goods.use-case';
import {
  StockAdjustmentOrmEntity,
  StockBalanceOrmEntity,
  StockLocationOrmEntity,
  StockMovementOrmEntity,
  WarehouseOrmEntity,
} from '../inventory/entities';
import { PartyOrmEntity } from '../customers/entities/party.orm-entity';
import { OrganisationItemOrmEntity } from '../catalog/entities/organisation-item.orm-entity';
import { AccountingModule } from '../accounting/accounting.module';

const purchasesConfigService = new ConfigService();
const useInMemoryRepos = purchasesConfigService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
const purchasesPersistenceImports = useInMemoryRepos
  ? []
  : [
      TypeOrmModule.forFeature([
        PurchaseOrderOrmEntity,
        PurchaseOrderLineOrmEntity,
        GoodsReceiptOrmEntity,
        GoodsReceiptLineOrmEntity,
        StockMovementOrmEntity,
        StockBalanceOrmEntity,
        StockLocationOrmEntity,
        StockAdjustmentOrmEntity,
        WarehouseOrmEntity,
        PartyOrmEntity,
        OrganisationItemOrmEntity,
      ]),
    ];
const purchasesRepositoryProviders = useInMemoryRepos
  ? [
      InMemoryPurchasesRepository,
      {
        provide: PURCHASES_REPOSITORY,
        useExisting: InMemoryPurchasesRepository,
      },
    ]
  : [
      TypeormPurchasesRepository,
      {
        provide: PURCHASES_REPOSITORY,
        useExisting: TypeormPurchasesRepository,
      },
    ];

@Module({
  imports: [JwtModule.register({}), AccountingModule, ...purchasesPersistenceImports],
  controllers: [PurchasesController, InflowController],
  providers: [
    PurchasesService,
    ReceiveGoodsUseCase,
    JwtAuthGuard,
    RolesGuard,
    ...purchasesRepositoryProviders,
  ],
  exports: [PurchasesService],
})
export class PurchasesModule {}
