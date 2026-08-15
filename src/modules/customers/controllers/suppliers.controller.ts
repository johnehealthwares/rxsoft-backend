import { Body, Controller, Post,Get,Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { SuppliersService } from '../services/suppliers.service';
import { ListQueryDto } from 'src/shared/dto/list-query.dto';
import { PartyType } from 'src/shared/domain';

type SupplierListResponse = {
  data: PartyType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('suppliers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}


    @Get()
    @Roles('super_admin', 'admin', 'manager', 'cashier', 'auditor')
    async list(@Query() query: ListQueryDto, @CurrentUser() currentUser: RequestUser): Promise<SupplierListResponse> {
      const result = await this.suppliersService.list(currentUser.organizationId, query);
      return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
  @Post()
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchases.supplier.create')
  @ApiOperation({ summary: 'Create a supplier' })
  async create(@Body() payload: CreateSupplierDto, @CurrentUser() currentUser: RequestUser) {
    return this.suppliersService.create(currentUser.organizationId, payload);
  }
}
