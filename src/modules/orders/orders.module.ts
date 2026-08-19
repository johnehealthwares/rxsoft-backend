import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { OrderOrmEntity } from '../website/entities/order.orm-entity';
import { OrderItemOrmEntity } from '../website/entities/order-item.orm-entity';
import { DeliveryOrmEntity } from '../website/entities/delivery.orm-entity';
import { ItemOrmEntity } from '../catalog/entities/item.orm-entity';
import { OrganisationItemOrmEntity } from '../catalog/entities/organisation-item.orm-entity';
import { OrganisationsProxyModule } from '../organisations-proxy/organisations-proxy.module';
import { SaleOrmEntity, SaleLineOrmEntity } from '../sales/entities';
import { StockLocationOrmEntity } from '../inventory/entities';
import { PartyOrmEntity } from '../customers/entities/party.orm-entity';
import { PricingModule } from '../pricing/pricing.module';
import { SalesModule } from '../sales/sales.module';
import { OrdersService } from './orders.service';
import { OrderAdminController } from './order-admin.controller';

@Module({
  imports: [
    PricingModule,
    SalesModule,
    ConfigModule,
    OrganisationsProxyModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
    }),
    TypeOrmModule.forFeature([
      OrderOrmEntity,
      OrderItemOrmEntity,
      DeliveryOrmEntity,
ItemOrmEntity,
      OrganisationItemOrmEntity,
      PartyOrmEntity,
      SaleOrmEntity,
      SaleLineOrmEntity,
      StockLocationOrmEntity,
    ]),
  ],
  controllers: [OrderAdminController],
  providers: [OrdersService, JwtAuthGuard, RolesGuard],
  exports: [OrdersService],
})
export class OrdersModule {}
