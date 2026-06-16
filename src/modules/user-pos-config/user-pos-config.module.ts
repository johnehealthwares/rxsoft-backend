import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationConfigModule } from '../organisation-config/organisation-config.module';
import { UserPosConfigController } from './controllers/user-pos-config.controller';
import { UserPosConfigOrmEntity } from './entities/user-pos-config.orm-entity';
import { UserPosConfigService } from './services/user-pos-config.service';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserPosConfigOrmEntity]),
    OrganisationConfigModule,
  ],
  controllers: [UserPosConfigController],
  providers: [UserPosConfigService],
  exports: [UserPosConfigService],
})
export class UserPosConfigModule {}
