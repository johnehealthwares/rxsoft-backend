import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { PartyOrmEntity } from './entities';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([PartyOrmEntity])],
  controllers: [CustomersController],
  providers: [CustomersService, JwtAuthGuard, RolesGuard],
  exports: [CustomersService],
})
export class CustomersModule {}
