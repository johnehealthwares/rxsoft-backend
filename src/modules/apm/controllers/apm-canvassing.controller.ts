import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ApmCanvassingService } from '../services/apm-canvassing.service';
import { ListQueryDto } from '../dto/apm.dto';
import {
  CreateCanvassingSessionDto,
  UpdateCanvassingSessionDto,
  CreateCanvassingVisitDto,
  CreateVolunteerAssignmentDto,
  UpdateVolunteerAssignmentDto,
} from '../dto/canvassing.dto';

@ApiTags('apm-canvassing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/canvassing')
export class ApmCanvassingController {
  constructor(private readonly canvassingService: ApmCanvassingService) {}

  @Get('stats')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get canvassing stats' })
  getStats() {
    return this.canvassingService.getSessionStats();
  }

  @Get('sessions')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List canvassing sessions' })
  listSessions(@Query() query: ListQueryDto) {
    return this.canvassingService.listSessions(query);
  }

  @Get('sessions/:id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get session detail' })
  getSession(@Param('id') id: string) {
    return this.canvassingService.getSession(id);
  }

  @Post('sessions')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create canvassing session' })
  createSession(@Body() dto: CreateCanvassingSessionDto) {
    return this.canvassingService.createSession(dto);
  }

  @Put('sessions/:id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update canvassing session' })
  updateSession(@Param('id') id: string, @Body() dto: UpdateCanvassingSessionDto) {
    return this.canvassingService.updateSession(id, dto);
  }

  @Get('sessions/:id/visits')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List visits in a session' })
  listVisits(@Param('id') id: string) {
    return this.canvassingService.listVisits(id);
  }

  @Get('sessions/:id/visit-stats')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get visit stats for a session' })
  getVisitStats(@Param('id') id: string) {
    return this.canvassingService.getVisitStats(id);
  }

  @Post('sessions/:id/visits')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Add a visit to a session' })
  addVisit(@Param('id') id: string, @Body() dto: CreateCanvassingVisitDto) {
    return this.canvassingService.addVisit(id, dto);
  }

  @Get('visits/stats')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get overall visit stats' })
  getAllVisitStats() {
    return this.canvassingService.getAllVisitStats();
  }
}

@ApiTags('apm-volunteer-assignments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/volunteer-assignments')
export class ApmVolunteerAssignmentController {
  constructor(private readonly canvassingService: ApmCanvassingService) {}

  @Get()
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List volunteer assignments' })
  listAssignments(@Query() query: ListQueryDto) {
    return this.canvassingService.listAssignments(query);
  }

  @Get('ward/:wardId')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List assignments by ward' })
  listByWard(@Param('wardId') wardId: string) {
    return this.canvassingService.listAssignmentsByWard(wardId);
  }

  @Post()
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create volunteer assignment' })
  createAssignment(@Body() dto: CreateVolunteerAssignmentDto) {
    return this.canvassingService.createAssignment(dto);
  }

  @Put(':id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update volunteer assignment' })
  updateAssignment(@Param('id') id: string, @Body() dto: UpdateVolunteerAssignmentDto) {
    return this.canvassingService.updateAssignment(id, dto);
  }

  @Get('stats')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get volunteer stats' })
  getStats() {
    return this.canvassingService.getVolunteerStats();
  }
}

@ApiTags('apm-sentiment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/sentiment')
export class ApmSentimentController {
  constructor(private readonly canvassingService: ApmCanvassingService) {}

  @Get()
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get sentiment analysis dashboard' })
  getSentiment() {
    return this.canvassingService.getSentimentDashboard();
  }
}
