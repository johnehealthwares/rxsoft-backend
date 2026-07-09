import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountReceivableOrmEntity, PaymentMethodOrmEntity } from '../sales/entities';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ReceivablesController } from './controllers/receivables.controller';
import { ReceivableTransactionOrmEntity } from './entities';
import { UsersProxyModule } from '../users-proxy/users-proxy.module';
import { AccountingModule } from '../accounting/accounting.module';
import { InMemoryReceivablesRepository } from './repositories/in-memory-receivables.repository';
import { TypeormReceivablesRepository } from './repositories/typeorm-receivables.repository';
import { ApplyReceivableAdjustmentUseCase } from './services/apply-receivable-adjustment.use-case';
import { CollectReceivablePaymentUseCase } from './services/collect-receivable-payment.use-case';
import { ListReceivableTransactionsUseCase } from './services/list-receivable-transactions.use-case';
import { ListReceivablesUseCase } from './services/list-receivables.use-case';
import { RECEIVABLES_REPOSITORY } from './services/receivables.di-tokens';
import { WriteOffReceivableUseCase } from './services/write-off-receivable.use-case';

const receivablesConfigService = new ConfigService();
const useInMemoryRepos = receivablesConfigService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
const receivablesPersistenceImports = useInMemoryRepos
  ? []
  : [TypeOrmModule.forFeature([AccountReceivableOrmEntity, ReceivableTransactionOrmEntity, PaymentMethodOrmEntity])];
const receivablesRepositoryProviders = useInMemoryRepos
  ? [
      InMemoryReceivablesRepository,
      {
        provide: RECEIVABLES_REPOSITORY,
        useExisting: InMemoryReceivablesRepository,
      },
    ]
  : [
      TypeormReceivablesRepository,
      {
        provide: RECEIVABLES_REPOSITORY,
        useExisting: TypeormReceivablesRepository,
      },
    ];

@Module({
  imports: [JwtModule.register({}), UsersProxyModule, AccountingModule, ...receivablesPersistenceImports],
  controllers: [ReceivablesController],
  providers: [
    ListReceivablesUseCase,
    CollectReceivablePaymentUseCase,
    ApplyReceivableAdjustmentUseCase,
    WriteOffReceivableUseCase,
    ListReceivableTransactionsUseCase,
    JwtAuthGuard,
    RolesGuard,
    ...receivablesRepositoryProviders,
  ],
})
export class ReceivablesModule {}
