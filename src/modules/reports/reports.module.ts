import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ReportsController } from './controllers/reports.controller';
import { SalesModule } from '../sales/sales.module';
import { InventoryModule } from '../inventory/inventory.module';
import { PurchasesModule } from '../purchases/purchases.module';

@Module({
  imports: [JwtModule.register({}), SalesModule, InventoryModule, PurchasesModule],
  controllers: [ReportsController],
  providers: [JwtAuthGuard, RolesGuard],
})
export class ReportsModule {}
