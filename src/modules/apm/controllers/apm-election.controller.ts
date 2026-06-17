import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ApmElectionService } from '../services/apm-election.service';
import { ListQueryDto } from '../dto/apm.dto';
import {
  CreatePollingAgentDto,
  UpdatePollingAgentDto,
  CreateResultEntryDto,
  CreateIncidentReportDto,
  UpdateIncidentReportDto,
  CreateGotvRecordDto,
  UpdateGotvRecordDto,
} from '../dto/election.dto';

@ApiTags('apm-agents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/agents')
export class ApmAgentController {
  constructor(private readonly electionService: ApmElectionService) {}

  @Get() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List polling agents' })
  listAgents(@Query() query: ListQueryDto) { return this.electionService.listAgents(query); }

  @Get('stats') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Agent stats' })
  getStats() { return this.electionService.getAgentStats(); }

  @Get(':id') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get agent detail' })
  getAgent(@Param('id') id: string) { return this.electionService.getAgent(id); }

  @Post() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create polling agent' })
  createAgent(@Body() dto: CreatePollingAgentDto) { return this.electionService.createAgent(dto); }

  @Put(':id') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update polling agent' })
  updateAgent(@Param('id') id: string, @Body() dto: UpdatePollingAgentDto) { return this.electionService.updateAgent(id, dto); }
}

@ApiTags('apm-results')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/results')
export class ApmResultController {
  constructor(private readonly electionService: ApmElectionService) {}

  @Get() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List result entries' })
  listResults(@Query() query: ListQueryDto) { return this.electionService.listResults(query); }

  @Get('dashboard') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Result collation dashboard' })
  getDashboard() { return this.electionService.getResultDashboard(); }

  @Get('lga/:lgaId') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Results by LGA' })
  listByLga(@Param('lgaId') lgaId: string) { return this.electionService.listResultsByLga(lgaId); }

  @Get(':id') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get result detail' })
  getResult(@Param('id') id: string) { return this.electionService.getResult(id); }

  @Post() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Submit result entry' })
  createResult(@Body() dto: CreateResultEntryDto) { return this.electionService.createResult(dto); }

  @Put(':id/verify') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Verify result entry' })
  verifyResult(@Param('id') id: string) { return this.electionService.verifyResult(id); }
}

@ApiTags('apm-incidents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/incidents')
export class ApmIncidentController {
  constructor(private readonly electionService: ApmElectionService) {}

  @Get() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List incident reports' })
  listIncidents(@Query() query: ListQueryDto) { return this.electionService.listIncidents(query); }

  @Get('stats') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Incident stats' })
  getStats() { return this.electionService.getIncidentStats(); }

  @Post() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Report an incident' })
  createIncident(@Body() dto: CreateIncidentReportDto) { return this.electionService.createIncident(dto); }

  @Put(':id') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update incident' })
  updateIncident(@Param('id') id: string, @Body() dto: UpdateIncidentReportDto) { return this.electionService.updateIncident(id, dto); }
}

@ApiTags('apm-gotv')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/gotv')
export class ApmGotvController {
  constructor(private readonly electionService: ApmElectionService) {}

  @Get() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List GOTV records' })
  listGotv(@Query() query: ListQueryDto) { return this.electionService.listGotvRecords(query); }

  @Get('stats') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'GOTV stats' })
  getStats() { return this.electionService.getGotvStats(); }

  @Get('pu/:pollingUnitId') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'GOTV records by PU' })
  listByPu(@Param('pollingUnitId') pollingUnitId: string) { return this.electionService.listGotvByPu(pollingUnitId); }

  @Post() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create GOTV record' })
  createGotv(@Body() dto: CreateGotvRecordDto) { return this.electionService.createGotvRecord(dto); }

  @Put(':id') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update GOTV record' })
  updateGotv(@Param('id') id: string, @Body() dto: UpdateGotvRecordDto) { return this.electionService.updateGotvRecord(id, dto); }
}
