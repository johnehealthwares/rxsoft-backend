import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersController } from './controllers/manufacturers.controller';
import { ManufacturerOrmEntity } from './entities/manufacturer.orm-entity';
import { ManufacturersService } from './services/manufacturers.service';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([ManufacturerOrmEntity])],
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
})
export class ManufacturersModule {}
