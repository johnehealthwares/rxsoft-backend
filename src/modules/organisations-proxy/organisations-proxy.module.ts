import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OrganisationsProxyService } from './organisations-proxy.service';

@Module({
  imports: [HttpModule],
  providers: [OrganisationsProxyService],
  exports: [OrganisationsProxyService],
})
export class OrganisationsProxyModule {}
