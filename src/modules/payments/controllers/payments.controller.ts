import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
  InitiatePosPaymentDto,
  InitializePaymentDto,
} from '../dto/payments.dto';
import { PaymentGatewayService } from '../services/payment-gateway.service';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly gateway: PaymentGatewayService) {}

  @Post('initialize')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async initialize(
    @Body() dto: InitializePaymentDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.gateway.initializeWeb(user.organizationId, dto, {
      sub: user.sub,
    });
  }

  @Get('verify/:reference')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async verify(
    @Param('reference') reference: string,
    @CurrentUser() user: RequestUser,
  ) {
    return this.gateway.verify(reference, user.organizationId);
  }

  @Post('pos/initiate')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async initiatePos(
    @Body() dto: InitiatePosPaymentDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.gateway.initiatePos(user.organizationId, dto, {
      sub: user.sub,
    });
  }

  @Get('pos/query/:reference')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async queryPos(
    @Param('reference') reference: string,
    @CurrentUser() user: RequestUser,
  ) {
    return this.gateway.queryPos(reference, user.organizationId);
  }

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async list(
    @CurrentUser() user: RequestUser,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ) {
    return this.gateway.list(user.organizationId, Number(page), Number(limit));
  }
}
