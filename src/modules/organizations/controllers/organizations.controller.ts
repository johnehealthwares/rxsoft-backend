import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CreateOrganizationDto, ListOrganizationsDto, UpdateOrganizationDto } from '../dto/organizations.dto';
import { OrganizationType, OrganizationsService } from '../services/organizations.service';

type OrganizationListResponse = {
  data: OrganizationType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @Roles('super_admin', 'admin')
  async list(@Query() query: ListOrganizationsDto): Promise<OrganizationListResponse> {
    const result = await this.organizationsService.list(query);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get(':organizationId')
  @Roles('super_admin', 'admin')
  async get(@Param('organizationId') organizationId: string): Promise<OrganizationType> {
    return this.organizationsService.get(organizationId);
  }

  @Post()
  @Roles('super_admin', 'admin')
  @AuditAction('organization.create')
  async create(@Body() payload: CreateOrganizationDto): Promise<OrganizationType> {
    return this.organizationsService.create(payload);
  }

  @Put(':organizationId')
  @Roles('super_admin', 'admin')
  @AuditAction('organization.update')
  async replace(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationDto,
  ): Promise<OrganizationType> {
    return this.organizationsService.update(organizationId, payload);
  }

  @Patch(':organizationId')
  @Roles('super_admin', 'admin')
  @AuditAction('organization.update')
  async patch(
    @Param('organizationId') organizationId: string,
    @Body() payload: UpdateOrganizationDto,
  ): Promise<OrganizationType> {
    return this.organizationsService.update(organizationId, payload);
  }

  @Delete(':organizationId')
  @Roles('super_admin', 'admin')
  @AuditAction('organization.delete')
  async remove(@Param('organizationId') organizationId: string): Promise<void> {
    await this.organizationsService.remove(organizationId);
  }
}
