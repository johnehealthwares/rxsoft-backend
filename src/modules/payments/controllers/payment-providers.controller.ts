import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import {
  BulkSetPaymentMethodProvidersDto,
  CreatePaymentMethodProviderDto,
  CreatePaymentProviderDto,
  ListPaymentProvidersDto,
  UpdateOrganisationPaymentProviderDto,
  UpdatePaymentProviderDto,
} from '../dto/payment-providers.dto';
import { PaymentProvidersService } from '../services/payment-providers.service';

@ApiTags('payment-providers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payment-providers')
export class PaymentProvidersController {
  constructor(private readonly service: PaymentProvidersService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async list(@Query() query: ListPaymentProvidersDto) {
    return this.service.list(query);
  }

  @Get('org')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async listForOrg(
    @CurrentUser() user: RequestUser,
    @Query('channel') channel?: string,
  ) {
    return this.service.listForOrg(user.organizationId, channel);
  }

  @Get('available')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async listActiveForOrg(
    @CurrentUser() user: RequestUser,
    @Query('channel') channel?: string,
  ) {
    const providers = await this.service.listActiveForOrg(
      user.organizationId,
      channel,
    );
    return providers.map((p) => ({
      id: p.id,
      code: p.code,
      name: p.name,
      providerType: p.providerType,
      channel: p.channel,
      production: p.production,
      configured: this.service.isConfigured(p),
    }));
  }

  @Get(':paymentProviderId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async get(@Param('paymentProviderId') id: string) {
    return this.service.get(id);
  }

  @Post()
  @Roles('admin', 'super_admin')
  async create(@Body() payload: CreatePaymentProviderDto) {
    return this.service.create(payload);
  }

  @Put(':paymentProviderId')
  @Roles('admin', 'super_admin')
  async replace(
    @Param('paymentProviderId') id: string,
    @Body() payload: UpdatePaymentProviderDto,
  ) {
    return this.service.update(id, payload);
  }

  @Patch(':paymentProviderId')
  @Roles('admin', 'super_admin')
  async patch(
    @Param('paymentProviderId') id: string,
    @Body() payload: UpdatePaymentProviderDto,
  ) {
    return this.service.update(id, payload);
  }

  @Delete(':paymentProviderId')
  @Roles('admin', 'super_admin')
  async remove(@Param('paymentProviderId') id: string) {
    await this.service.remove(id);
    return { deleted: true };
  }
}

@ApiTags('organisation-payment-providers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('organisation-payment-providers')
export class OrganisationPaymentProvidersController {
  constructor(private readonly service: PaymentProvidersService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async list(
    @CurrentUser() user: RequestUser,
    @Query('channel') channel?: string,
  ) {
    return this.service.listForOrg(user.organizationId, channel);
  }

  @Put(':paymentProviderId')
  @Roles('admin', 'super_admin')
  async upsert(
    @CurrentUser() user: RequestUser,
    @Param('paymentProviderId') paymentProviderId: string,
    @Body() payload: Partial<UpdateOrganisationPaymentProviderDto>,
  ) {
    return this.service.upsertOrgProvider({
      organizationId: payload.organizationId ?? user.organizationId,
      paymentProviderId,
      isActive: payload.isActive,
      isDefault: payload.isDefault,
    });
  }

  @Delete(':paymentProviderId')
  @Roles('admin', 'super_admin')
  async remove(
    @CurrentUser() user: RequestUser,
    @Param('paymentProviderId') paymentProviderId: string,
  ) {
    await this.service.removeOrgProvider(
      user.organizationId,
      paymentProviderId,
    );
    return { deleted: true };
  }
}

@ApiTags('payment-method-providers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payment-method-providers')
export class PaymentMethodProvidersController {
  constructor(private readonly service: PaymentProvidersService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async list(
    @Query('paymentMethodId') paymentMethodId?: string,
    @Query('channel') channel?: string,
  ) {
    return this.service.listMethodProviders(paymentMethodId, channel);
  }

  @Post()
  @Roles('admin', 'super_admin')
  async create(@Body() payload: CreatePaymentMethodProviderDto) {
    return this.service.setMethodProvider(payload);
  }

  @Delete(':paymentMethodId/:paymentProviderId')
  @Roles('admin', 'super_admin')
  async remove(
    @Param('paymentMethodId') paymentMethodId: string,
    @Param('paymentProviderId') paymentProviderId: string,
  ) {
    await this.service.removeMethodProvider(paymentMethodId, paymentProviderId);
    return { deleted: true };
  }

  @Put('bulk')
  @Roles('admin', 'super_admin')
  async bulk(@Body() payload: BulkSetPaymentMethodProvidersDto) {
    const results: Awaited<
      ReturnType<PaymentProvidersService['setMethodProvider']>
    >[] = [];
    for (const provider of payload.providers) {
      results.push(
        await this.service.setMethodProvider({
          ...provider,
          paymentMethodId: payload.paymentMethodId,
        }),
      );
    }
    return results;
  }
}
