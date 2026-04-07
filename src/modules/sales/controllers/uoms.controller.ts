import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { UomType } from '../../../shared/domain';
import { CreateUomDto } from '../dto/create-uom.dto';
import { ListUomsDto } from '../dto/list-uoms.dto';
import { UpdateUomDto } from '../dto/update-uom.dto';
import { UomsService } from '../services/uoms.service';

type UomListResponse = {
  data: UomType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('uoms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('uoms')
export class UomsController {
  constructor(private readonly uomsService: UomsService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk', 'cashier')
  @ApiOperation({ summary: 'List/search UOMs by name or code' })
  async list(@Query() query: ListUomsDto, @CurrentUser() currentUser: RequestUser): Promise<UomListResponse> {
    const result = await this.uomsService.list(query, currentUser.organizationId);
    return {
      data: result.data,
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Get(':uomId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk', 'cashier')
  @ApiOperation({ summary: 'Get UOM by id' })
  getById(@Param('uomId') uomId: string, @CurrentUser() currentUser: RequestUser): Promise<UomType> {
    return this.uomsService.getById(uomId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @ApiOperation({ summary: 'Create UOM' })
  create(@Body() payload: CreateUomDto, @CurrentUser() currentUser: RequestUser): Promise<UomType> {
    return this.uomsService.create(payload, currentUser.organizationId);
  }

  @Put(':uomId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @ApiOperation({ summary: 'Update UOM' })
  replace(
    @Param('uomId') uomId: string,
    @Body() payload: UpdateUomDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<UomType> {
    return this.uomsService.update(uomId, payload, currentUser.organizationId);
  }

  @Patch(':uomId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @ApiOperation({ summary: 'Patch UOM' })
  patch(
    @Param('uomId') uomId: string,
    @Body() payload: UpdateUomDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<UomType> {
    return this.uomsService.update(uomId, payload, currentUser.organizationId);
  }
}
