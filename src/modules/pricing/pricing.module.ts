import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemOrmEntity } from '../catalog/entities/item.orm-entity';
import { OrganisationItemOrmEntity } from '../catalog/entities/organisation-item.orm-entity';
import { StockLocationOrmEntity } from '../inventory/entities/stock-location.orm-entity';
import { PricingController } from './controllers/pricing.controller';
import { PriceListItemOrmEntity, PriceListOrmEntity } from './entities';
import { PricingService } from './services/pricing.service';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      PriceListOrmEntity,
      PriceListItemOrmEntity,
      ItemOrmEntity,
      OrganisationItemOrmEntity,
      StockLocationOrmEntity,
    ]),
  ],
  controllers: [PricingController],
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule {}
