import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { PharmaceuticsType } from '../../../shared/domain';
import { CreatePharmaceuticsDto, ListPharmaceuticsDto, UpdatePharmaceuticsDto } from '../dto/pharmaceutics.dto';
import { PharmaceuticsService } from '../services/pharmaceutics.service';

type PharmaceuticsListResponse = {
  data: PharmaceuticsType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('pharmaceutics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pharmaceutics')
export class PharmaceuticsController {
  constructor(private readonly pharmaceuticsService: PharmaceuticsService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  async list(
    @Query() query: ListPharmaceuticsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PharmaceuticsListResponse> {
    const result = await this.pharmaceuticsService.list(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get(':pharmaceuticsId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  async get(@Param('pharmaceuticsId') pharmaceuticsId: string, @CurrentUser() currentUser: RequestUser): Promise<PharmaceuticsType> {
    return this.pharmaceuticsService.get(pharmaceuticsId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.pharmaceutics.create')
  async create(@Body() payload: CreatePharmaceuticsDto, @CurrentUser() currentUser: RequestUser): Promise<PharmaceuticsType> {
    return this.pharmaceuticsService.create(payload, currentUser.organizationId);
  }

  @Put(':pharmaceuticsId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.pharmaceutics.update')
  async replace(
    @Param('pharmaceuticsId') pharmaceuticsId: string,
    @Body() payload: UpdatePharmaceuticsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PharmaceuticsType> {
    return this.pharmaceuticsService.update(pharmaceuticsId, payload, currentUser.organizationId);
  }

  @Patch(':pharmaceuticsId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.pharmaceutics.update')
  async patch(
    @Param('pharmaceuticsId') pharmaceuticsId: string,
    @Body() payload: UpdatePharmaceuticsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PharmaceuticsType> {
    return this.pharmaceuticsService.update(pharmaceuticsId, payload, currentUser.organizationId);
  }

  @Delete(':pharmaceuticsId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.pharmaceutics.delete')
  async remove(@Param('pharmaceuticsId') pharmaceuticsId: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.pharmaceuticsService.remove(pharmaceuticsId, currentUser.organizationId);
  }
}
