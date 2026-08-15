import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { AuditService } from '../services/audit.service';

type AuditListResponse = {
  data: Awaited<ReturnType<AuditService['list']>>['data'];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('audit-logs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('audit-logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Roles('super_admin', 'admin', 'auditor')
  async list(@Query() query: ListQueryDto, @CurrentUser() currentUser: RequestUser): Promise<AuditListResponse> {
    const result = await this.auditService.list(currentUser.organizationId, query);
    return {
      data: result.data,
      meta: { page: query.page, limit: query.limit, total: result.total },
    };
  }
}
