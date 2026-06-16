import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ApmService } from '../services/apm.service';
import { ListQueryDto } from '../dto/apm.dto';

@ApiTags('apm-admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm-admin')
export class ApmAdminController {
  constructor(private readonly apmService: ApmService) {}

  @Get('volunteers')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List all volunteers' })
  listVolunteers(@Query() query: ListQueryDto) {
    return this.apmService.listVolunteers(query);
  }

  @Get('supporters')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List all supporters' })
  listSupporters(@Query() query: ListQueryDto) {
    return this.apmService.listSupporters(query);
  }

  @Get('contacts')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List contact submissions' })
  listContacts(@Query() query: ListQueryDto) {
    return this.apmService.listContacts(query);
  }

  @Get('event-registrations')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List event registrations' })
  listEventRegistrations(@Query() query: ListQueryDto) {
    return this.apmService.listEventRegistrations(query);
  }

  @Get('feedback')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List citizen feedback' })
  listFeedback(@Query() query: ListQueryDto) {
    return this.apmService.listFeedback(query);
  }

  @Get('issues')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List issue reports' })
  listIssues(@Query() query: ListQueryDto) {
    return this.apmService.listIssues(query);
  }

  @Get('donations')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List donations' })
  listDonations(@Query() query: ListQueryDto) {
    return this.apmService.listDonations(query);
  }

  @Get('stats')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get campaign stats dashboard' })
  getStats() {
    return this.apmService.getStats();
  }
}
