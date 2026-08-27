import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountingModule } from '../accounting/accounting.module';
import { OrdersModule } from '../orders/orders.module';
import { OrderItemOrmEntity, OrderOrmEntity } from '../website/entities';
import { SaleOrmEntity, SalePaymentOrmEntity } from '../sales/entities';
import { PaymentMethodOrmEntity } from '../sales/entities/payment-method.orm-entity';
import { PartyOrmEntity } from '../customers/entities/party.orm-entity';
import {
  CustomerWalletOrmEntity,
  InsuranceProviderOrmEntity,
  OrganisationPaymentProviderOrmEntity,
  PaymentLinkOrmEntity,
  PaymentMethodProviderOrmEntity,
  PaymentProviderOrmEntity,
  PaymentTransactionOrmEntity,
  PosTerminalOrmEntity,
  WalletTransactionOrmEntity,
} from './entities';
import { PaymentProviderRegistry } from './providers/payment-provider.registry';
import {
  CustomerWalletsController,
  InsuranceProvidersController,
  OrganisationPaymentProvidersController,
  PaymentLinksController,
  PaymentMethodProvidersController,
  PaymentProvidersController,
  PaymentWebhooksController,
  PaymentsController,
  PosTerminalsController,
} from './controllers';
import {
  CustomerWalletService,
  InsuranceProvidersService,
  PaymentCompletionService,
  PaymentGatewayService,
  PaymentLinksService,
  PaymentProvidersService,
  PaymentWebhookService,
  PosTerminalsService,
} from './services';

@Module({
  imports: [
    JwtModule.register({}),
    AccountingModule,
    OrdersModule,
    TypeOrmModule.forFeature([
      PaymentProviderOrmEntity,
      OrganisationPaymentProviderOrmEntity,
      PaymentMethodProviderOrmEntity,
      PaymentTransactionOrmEntity,
      PaymentLinkOrmEntity,
      CustomerWalletOrmEntity,
      WalletTransactionOrmEntity,
      PosTerminalOrmEntity,
      InsuranceProviderOrmEntity,
      OrderOrmEntity,
      OrderItemOrmEntity,
      SaleOrmEntity,
      SalePaymentOrmEntity,
      PaymentMethodOrmEntity,
      PartyOrmEntity,
    ]),
  ],
  controllers: [
    PaymentProvidersController,
    OrganisationPaymentProvidersController,
    PaymentMethodProvidersController,
    PaymentsController,
    PaymentWebhooksController,
    PaymentLinksController,
    CustomerWalletsController,
    PosTerminalsController,
    InsuranceProvidersController,
  ],
  providers: [
    PaymentProviderRegistry,
    PaymentProvidersService,
    CustomerWalletService,
    PaymentLinksService,
    PaymentCompletionService,
    PaymentGatewayService,
    PaymentWebhookService,
    PosTerminalsService,
    InsuranceProvidersService,
  ],
  exports: [
    PaymentProvidersService,
    PaymentGatewayService,
    PaymentWebhookService,
  ],
})
export class PaymentsModule {}
