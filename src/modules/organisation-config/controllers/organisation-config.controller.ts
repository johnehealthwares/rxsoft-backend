import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UpdateOrganisationConfigDto, OrganisationConfigType } from '../dto/organisation-config.dto';
import { OrganisationConfigService } from '../services/organisation-config.service';

@ApiTags('organisation-config')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('organisation-config')
export class OrganisationConfigController {
  constructor(private readonly service: OrganisationConfigService) {}

  @Get()
  @Roles('admin', 'super_admin', 'cashier')
  async getConfig(@CurrentUser() currentUser: RequestUser): Promise<OrganisationConfigType> {
    return this.service.getOrCreate(currentUser.organizationId);
  }

  @Patch()
  @Roles('admin', 'super_admin')
  async updateConfig(
    @Body() payload: UpdateOrganisationConfigDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<OrganisationConfigType> {
    return this.service.update(currentUser.organizationId, payload);
  }
}