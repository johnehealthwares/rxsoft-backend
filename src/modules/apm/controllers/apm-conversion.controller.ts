import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ApmConversionService } from '../services/apm-conversion.service';
import { ListQueryDto } from '../dto/apm.dto';
import {
  CreateStakeholderDto,
  UpdateStakeholderDto,
  CreateConversionActivityDto,
  UpdateConversionScoreDto,
  UpdatePollingUnitDto,
  CreateWhatsAppGroupDto,
} from '../dto/conversion.dto';

@ApiTags('apm-conversion')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/conversion')
export class ApmConversionController {
  constructor(private readonly conversionService: ApmConversionService) {}

  @Get('dashboard')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get conversion dashboard summary' })
  getDashboard() {
    return this.conversionService.getDashboard();
  }

  @Get('lgas')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get LGA conversion dashboard' })
  getLgaConversionDashboard() {
    return this.conversionService.getLgaConversionDashboard();
  }

  @Get('wards/:lgaId')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get ward conversion dashboard for LGA' })
  getWardConversionDashboard(@Param('lgaId') lgaId: string) {
    return this.conversionService.getWardConversionDashboard(lgaId);
  }

  @Get('polling-units/:wardId')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get polling units for ward' })
  getPollingUnitDashboard(@Param('wardId') wardId: string) {
    return this.conversionService.getPollingUnitDashboard(wardId);
  }

  @Put('score/:entityType/:entityId')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update conversion score for LGA or ward' })
  updateScore(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
    @Body() dto: UpdateConversionScoreDto,
  ) {
    return this.conversionService.updateScore(entityType, entityId, dto);
  }

  @Put('polling-units/:id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update polling unit details' })
  updatePollingUnit(@Param('id') id: string, @Body() dto: UpdatePollingUnitDto) {
    return this.conversionService.updatePollingUnit(id, dto);
  }
}

@ApiTags('apm-stakeholders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/stakeholders')
export class ApmStakeholderController {
  constructor(private readonly conversionService: ApmConversionService) {}

  @Get()
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List all stakeholders' })
  listStakeholders(@Query() query: ListQueryDto) {
    return this.conversionService.listStakeholders(query);
  }

  @Get('lga/:lgaId')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List stakeholders by LGA' })
  listStakeholdersByLga(@Param('lgaId') lgaId: string, @Query() query: ListQueryDto) {
    return this.conversionService.listStakeholdersByLga(lgaId, query);
  }

  @Get(':id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get stakeholder details' })
  getStakeholder(@Param('id') id: string) {
    return this.conversionService.getStakeholder(id);
  }

  @Post()
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create a stakeholder' })
  createStakeholder(@Body() dto: CreateStakeholderDto) {
    return this.conversionService.createStakeholder(dto);
  }

  @Put(':id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update a stakeholder' })
  updateStakeholder(@Param('id') id: string, @Body() dto: UpdateStakeholderDto) {
    return this.conversionService.updateStakeholder(id, dto);
  }

  @Post(':id/activities')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Add activity to stakeholder' })
  createActivity(@Param('id') id: string, @Body() dto: CreateConversionActivityDto) {
    return this.conversionService.createActivity(id, dto);
  }

  @Get(':id/activities')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List stakeholder activities' })
  listActivities(@Param('id') id: string) {
    return this.conversionService.listActivities(id);
  }
}

@ApiTags('apm-whatsapp')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/whatsapp')
export class ApmWhatsAppController {
  constructor(private readonly conversionService: ApmConversionService) {}

  @Get('groups')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List WhatsApp groups' })
  listGroups(@Query('level') level?: string) {
    return this.conversionService.listWhatsAppGroups(level);
  }

  @Post('groups')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create WhatsApp group' })
  createGroup(@Body() dto: CreateWhatsAppGroupDto) {
    return this.conversionService.createWhatsAppGroup(dto);
  }
}
