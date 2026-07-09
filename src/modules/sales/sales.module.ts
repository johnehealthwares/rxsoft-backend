import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemOrmEntity } from '../catalog/entities/item.orm-entity';
import { StockLotOrmEntity } from '../inventory/entities/stock-lot.orm-entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SalesController } from './controllers/sales.controller';
import { UomsController } from './controllers/uoms.controller';
import { PaymentMethodsController } from './controllers/payment-methods.controller';
import { UomCategoriesController } from './controllers/uom-categories.controller';
import {
  AccountReceivableOrmEntity,
  PaymentMethodOrmEntity,
  UomCategoryOrmEntity,
  SaleLineOrmEntity,
  SaleOrmEntity,
  SalePaymentOrmEntity,
  SaleRefundLineOrmEntity,
  SaleRefundOrmEntity,
  UomOrmEntity,
} from './entities';
import { InMemorySalesRepository } from './repositories/in-memory-sales.repository';
import { TypeormSalesRepository } from './repositories/typeorm-sales.repository';
import { CreateSaleRefundUseCase } from './services/create-sale-refund.use-case';
import { CreateSaleUseCase } from './services/create-sale.use-case';
import { ListSalesUseCase } from './services/list-sales.use-case';
import { SalesService } from './services/sales.service';
import { UomsService } from './services/uoms.service';
import { PaymentMethodsService } from './services/payment-methods.service';
import { UomCategoriesService } from './services/uom-categories.service';
import { UomConverterService } from './services/uom-converter.service';
import { SALES_REPOSITORY } from './services/sales.di-tokens';
import { UsersProxyModule } from '../users-proxy/users-proxy.module';
import { AccountingModule } from '../accounting/accounting.module';

const salesConfigService = new ConfigService();
const useInMemoryRepos = salesConfigService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
const salesPersistenceImports = useInMemoryRepos
  ? []
  : [
      TypeOrmModule.forFeature([
        SaleOrmEntity,
        SaleLineOrmEntity,
        SalePaymentOrmEntity,
        SaleRefundOrmEntity,
        SaleRefundLineOrmEntity,
        AccountReceivableOrmEntity,
        PaymentMethodOrmEntity,
        UomCategoryOrmEntity,
        UomOrmEntity,
        ItemOrmEntity,
        StockLotOrmEntity,
      ]),
    ];
const salesRepositoryProviders = useInMemoryRepos
  ? [
      InMemorySalesRepository,
      {
        provide: SALES_REPOSITORY,
        useExisting: InMemorySalesRepository,
      },
    ]
  : [
      TypeormSalesRepository,
      {
        provide: SALES_REPOSITORY,
        useExisting: TypeormSalesRepository,
      },
    ];

@Module({
  imports: [JwtModule.register({}), UsersProxyModule, AccountingModule, ...salesPersistenceImports],
  controllers: [SalesController, UomsController, UomCategoriesController, PaymentMethodsController],
  providers: [
    ListSalesUseCase,
    CreateSaleUseCase,
    CreateSaleRefundUseCase,
    SalesService,
    UomsService,
    UomCategoriesService,
    PaymentMethodsService,
    UomConverterService,
    JwtAuthGuard,
    RolesGuard,
    ...salesRepositoryProviders,
  ],
  exports: [SalesService, UomConverterService],
})
export class SalesModule {}
