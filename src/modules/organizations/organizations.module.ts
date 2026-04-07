import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './controllers/organizations.controller';
import { OrganizationOrmEntity } from './entities/organization.orm-entity';
import { OrganizationsService } from './services/organizations.service';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([OrganizationOrmEntity])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
