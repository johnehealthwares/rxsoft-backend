import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { ManufacturerType } from '../../../shared/domain';
import { CreateManufacturerDto, ListManufacturersDto, UpdateManufacturerDto } from '../dto/manufacturers.dto';
import { ManufacturersService } from '../services/manufacturers.service';

type ManufacturerListResponse = {
  data: ManufacturerType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('manufacturers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  async list(
    @Query() query: ListManufacturersDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ManufacturerListResponse> {
    const result = await this.manufacturersService.list(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('metrics')
  @Roles('admin', 'super_admin')
  async metrics(@CurrentUser() currentUser: RequestUser) {
    return this.manufacturersService.getLastCreated(currentUser.organizationId);
  }

  @Get(':manufacturerId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  async get(
    @Param('manufacturerId') manufacturerId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ManufacturerType> {
    return this.manufacturersService.get(manufacturerId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.manufacturer.create')
  async create(
    @Body() payload: CreateManufacturerDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ManufacturerType> {
    return this.manufacturersService.create(payload, currentUser.organizationId);
  }

  @Put(':manufacturerId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.manufacturer.update')
  async replace(
    @Param('manufacturerId') manufacturerId: string,
    @Body() payload: UpdateManufacturerDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ManufacturerType> {
    return this.manufacturersService.update(manufacturerId, payload, currentUser.organizationId);
  }

  @Patch(':manufacturerId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.manufacturer.update')
  async patch(
    @Param('manufacturerId') manufacturerId: string,
    @Body() payload: UpdateManufacturerDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ManufacturerType> {
    return this.manufacturersService.update(manufacturerId, payload, currentUser.organizationId);
  }

  @Delete(':manufacturerId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.manufacturer.delete')
  async remove(@Param('manufacturerId') manufacturerId: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.manufacturersService.remove(manufacturerId, currentUser.organizationId);
  }
}
