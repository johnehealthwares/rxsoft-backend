import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrganisationsProxyModule } from '../organisations-proxy/organisations-proxy.module';
import { OrganizationsController } from './controllers/organizations.controller';
import { OrganizationsService } from './services/organizations.service';

@Module({
  imports: [JwtModule.register({}), OrganisationsProxyModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
