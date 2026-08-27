import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CustomersController } from './controllers/customers.controller';
import { SuppliersController } from './controllers/suppliers.controller';
import { CustomersService } from './services/customers.service';
import { SuppliersService } from './services/suppliers.service';
import { PartyOrmEntity } from './entities';
import { PrintModule } from '../print/print.module';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([PartyOrmEntity]), PrintModule],
  controllers: [CustomersController, SuppliersController],
  providers: [CustomersService, SuppliersService, JwtAuthGuard, RolesGuard],
  exports: [CustomersService, SuppliersService],
})
export class CustomersModule {}
