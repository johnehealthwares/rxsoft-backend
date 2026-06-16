import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { SuppliersService } from '../services/suppliers.service';

@ApiTags('suppliers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchases.supplier.create')
  @ApiOperation({ summary: 'Create a supplier' })
  async create(@Body() payload: CreateSupplierDto) {
    return this.suppliersService.create(payload);
  }
}
