import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { WarehouseType } from '../../../shared/domain';
import { CreateWarehouseDto, ListWarehousesDto, UpdateWarehouseDto } from '../dto/warehouses.dto';
import { WarehousesService } from '../services/warehouses.service';

type WarehouseListResponse = {
  data: WarehouseType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('warehouses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @ApiOperation({ summary: 'List warehouses with pagination' })
  async list(@Query() query: ListWarehousesDto, @CurrentUser() currentUser: RequestUser): Promise<WarehouseListResponse> {
    const result = await this.warehousesService.list(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get(':warehouseId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @ApiOperation({ summary: 'Get warehouse by ID' })
  async get(@Param('warehouseId') warehouseId: string, @CurrentUser() currentUser: RequestUser): Promise<WarehouseType> {
    return this.warehousesService.get(warehouseId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('inventory.warehouse.create')
  @ApiOperation({ summary: 'Create a warehouse' })
  async create(@Body() payload: CreateWarehouseDto, @CurrentUser() currentUser: RequestUser): Promise<WarehouseType> {
    return this.warehousesService.create(payload, currentUser.organizationId);
  }

  @Put(':warehouseId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('inventory.warehouse.update')
  @ApiOperation({ summary: 'Update a warehouse' })
  async update(@Param('warehouseId') warehouseId: string, @Body() payload: UpdateWarehouseDto, @CurrentUser() currentUser: RequestUser): Promise<WarehouseType> {
    return this.warehousesService.update(warehouseId, payload, currentUser.organizationId);
  }

  @Delete(':warehouseId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('inventory.warehouse.delete')
  @ApiOperation({ summary: 'Delete a warehouse' })
  async remove(@Param('warehouseId') warehouseId: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.warehousesService.remove(warehouseId, currentUser.organizationId);
  }
}
