import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ApmIntelligenceService } from '../services/apm-intelligence.service';
import { ListQueryDto } from '../dto/apm.dto';
import {
  CreateCandidateTourDto,
  UpdateCandidateTourDto,
  CreateContentAssetDto,
  CreateListeningMentionDto,
  CreateRapidResponseDto,
} from '../dto/intelligence.dto';

@ApiTags('apm-tours')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/tours')
export class ApmTourController {
  constructor(private readonly intelligenceService: ApmIntelligenceService) {}

  @Get() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List candidate tours' })
  listTours(@Query() query: ListQueryDto) {
    return this.intelligenceService.listTours(query);
  }

  @Get('stats') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Tour stats' })
  getStats() {
    return this.intelligenceService.getTourStats();
  }

  @Get(':id') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get tour detail' })
  getTour(@Param('id') id: string) {
    return this.intelligenceService.getTour(id);
  }

  @Post() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create candidate tour' })
  createTour(@Body() dto: CreateCandidateTourDto) {
    return this.intelligenceService.createTour(dto);
  }

  @Put(':id') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update candidate tour' })
  updateTour(@Param('id') id: string, @Body() dto: UpdateCandidateTourDto) {
    return this.intelligenceService.updateTour(id, dto);
  }
}

@ApiTags('apm-content')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/content')
export class ApmContentController {
  constructor(private readonly intelligenceService: ApmIntelligenceService) {}

  @Get() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List content assets' })
  listContent(@Query() query: ListQueryDto) {
    return this.intelligenceService.listContent(query);
  }

  @Post() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create content asset' })
  createContent(@Body() dto: CreateContentAssetDto) {
    return this.intelligenceService.createContent(dto);
  }
}

@ApiTags('apm-listening')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/listening')
export class ApmListeningController {
  constructor(private readonly intelligenceService: ApmIntelligenceService) {}

  @Get() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List mentions' })
  listMentions(@Query() query: ListQueryDto) {
    return this.intelligenceService.listMentions(query);
  }

  @Get('stats') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Listening stats' })
  getStats() {
    return this.intelligenceService.getListeningStats();
  }

  @Get(':id') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get mention detail' })
  getMention(@Param('id') id: string) {
    return this.intelligenceService.getMention(id);
  }

  @Post() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create mention' })
  createMention(@Body() dto: CreateListeningMentionDto) {
    return this.intelligenceService.createMention(dto);
  }

  @Put(':id/status') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Update mention status' })
  updateMentionStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.intelligenceService.updateMentionStatus(id, status);
  }
}

@ApiTags('apm-truth-desk')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('apm/truth-desk')
export class ApmTruthDeskController {
  constructor(private readonly intelligenceService: ApmIntelligenceService) {}

  @Get(':mentionId/responses') @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List responses for a mention' })
  listResponses(@Param('mentionId') mentionId: string) {
    return this.intelligenceService.listResponses(mentionId);
  }

  @Post() @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create rapid response' })
  createResponse(@Body() dto: CreateRapidResponseDto) {
    return this.intelligenceService.createResponse(dto);
  }
}
