import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PurchasesController } from './controllers/purchases.controller';
import { PurchasesService } from './services/purchases.service';
import { PurchaseOrderLineOrmEntity, PurchaseOrderOrmEntity } from './entities';
import { WarehouseOrmEntity } from '../inventory/entities';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([PurchaseOrderOrmEntity, PurchaseOrderLineOrmEntity, WarehouseOrmEntity]),
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService, JwtAuthGuard, RolesGuard],
  exports: [PurchasesService],
})
export class PurchasesModule {}
