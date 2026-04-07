import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { PaymentMethodType } from '../../../shared/domain';
import { CreatePaymentMethodDto, ListPaymentMethodsDto, UpdatePaymentMethodDto } from '../dto/payment-methods.dto';
import { PaymentMethodsService } from '../services/payment-methods.service';

type PaymentMethodListResponse = {
  data: PaymentMethodType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('payment-methods')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async list(
    @Query() query: ListPaymentMethodsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PaymentMethodListResponse> {
    const result = await this.paymentMethodsService.list(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get(':paymentMethodId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async get(
    @Param('paymentMethodId') paymentMethodId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PaymentMethodType> {
    return this.paymentMethodsService.get(paymentMethodId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('sales.payment_method.create')
  async create(
    @Body() payload: CreatePaymentMethodDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PaymentMethodType> {
    return this.paymentMethodsService.create(payload, currentUser.organizationId);
  }

  @Put(':paymentMethodId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('sales.payment_method.update')
  async replace(
    @Param('paymentMethodId') paymentMethodId: string,
    @Body() payload: UpdatePaymentMethodDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PaymentMethodType> {
    return this.paymentMethodsService.update(paymentMethodId, payload, currentUser.organizationId);
  }

  @Patch(':paymentMethodId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('sales.payment_method.update')
  async patch(
    @Param('paymentMethodId') paymentMethodId: string,
    @Body() payload: UpdatePaymentMethodDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PaymentMethodType> {
    return this.paymentMethodsService.update(paymentMethodId, payload, currentUser.organizationId);
  }

  @Delete(':paymentMethodId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('sales.payment_method.delete')
  async remove(@Param('paymentMethodId') paymentMethodId: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.paymentMethodsService.remove(paymentMethodId, currentUser.organizationId);
  }
}
