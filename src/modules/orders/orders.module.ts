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
import { SaleOrmEntity, SaleLineOrmEntity } from '../sales/entities';
import {
  StockBalanceOrmEntity,
  StockAdjustmentOrmEntity,
  StoreStockLocationOrmEntity,
  StockLocationOrmEntity,
} from '../inventory/entities';
import { PartyOrmEntity } from '../customers/entities/party.orm-entity';
import { PricingModule } from '../pricing/pricing.module';
import { OrdersService } from './orders.service';
import { OrderAdminController } from './order-admin.controller';

@Module({
  imports: [
    PricingModule,
    ConfigModule,
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
      PartyOrmEntity,
      SaleOrmEntity,
      SaleLineOrmEntity,
      StockBalanceOrmEntity,
      StockAdjustmentOrmEntity,
      StoreStockLocationOrmEntity,
      StockLocationOrmEntity,
    ]),
  ],
  controllers: [OrderAdminController],
  providers: [OrdersService, JwtAuthGuard, RolesGuard],
  exports: [OrdersService],
})
export class OrdersModule {}
