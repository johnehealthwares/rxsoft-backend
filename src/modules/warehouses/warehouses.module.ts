import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseOrmEntity } from '../inventory/entities/warehouse.orm-entity';
import { WarehousesController } from './controllers/warehouses.controller';
import { WarehousesService } from './services/warehouses.service';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([WarehouseOrmEntity])],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
