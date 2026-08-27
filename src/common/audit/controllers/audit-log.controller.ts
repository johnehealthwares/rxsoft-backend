import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../decorators/current-user.decorator';
import type { RequestUser } from '../../decorators/current-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { AuditLogService } from '../services/audit-log.service';

type AuditListResponse = {
  data: Awaited<ReturnType<AuditLogService['list']>>['items'];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('audit-logs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @Roles('super_admin', 'admin', 'auditor')
  @ApiOperation({ summary: 'List audit logs with pagination' })
  async list(@Query() query: ListQueryDto, @CurrentUser() currentUser: RequestUser): Promise<AuditListResponse> {
    const result = await this.auditLogService.list(currentUser.organizationId, {
      search: query.search,
      offset: query.offset,
      limit: query.limit,
    });
    return {
      data: result.items,
      meta: { page: query.page, limit: query.limit, total: result.total },
    };
  }
}