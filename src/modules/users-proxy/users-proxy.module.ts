import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserPosConfigModule } from '../user-pos-config/user-pos-config.module';
import { AuthProxyController } from './auth-proxy.controller';
import { UsersProxyController } from './users-proxy.controller';
import { RolesProxyController } from './roles-proxy.controller';
import { UsersProxyService } from './users-proxy.service';

@Module({
  imports: [HttpModule, JwtModule.register({}), UserPosConfigModule],
  controllers: [UsersProxyController, AuthProxyController, RolesProxyController],
  providers: [UsersProxyService],
  exports: [UsersProxyService],
})
export class UsersProxyModule {}
