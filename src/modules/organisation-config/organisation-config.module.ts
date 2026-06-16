import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationConfigController } from './controllers/organisation-config.controller';
import { OrganisationConfigOrmEntity } from './entities/organisation-config.orm-entity';
import { OrganisationConfigService } from './services/organisation-config.service';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([OrganisationConfigOrmEntity]),
  ],
  controllers: [OrganisationConfigController],
  providers: [OrganisationConfigService],
  exports: [OrganisationConfigService],
})
export class OrganisationConfigModule {}