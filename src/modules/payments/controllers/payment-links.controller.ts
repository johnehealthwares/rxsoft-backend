import {
  Body,
  Controller,
  Delete,
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
  CreatePaymentLinkDto,
  ListPaymentLinksDto,
} from '../dto/payment-links.dto';
import { PaymentLinksService } from '../services/payment-links.service';
import { PaymentGatewayService } from '../services/payment-gateway.service';

@ApiTags('payment-links')
@Controller('payment-links')
export class PaymentLinksController {
  constructor(
    private readonly linksService: PaymentLinksService,
    private readonly gateway: PaymentGatewayService,
  ) {}

  // ── Admin (authenticated) ─────────────────────────────────────

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async list(
    @CurrentUser() user: RequestUser,
    @Query() query: ListPaymentLinksDto,
  ) {
    return this.linksService.list(user.organizationId, query.page, query.limit);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async create(
    @Body() dto: CreatePaymentLinkDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.linksService.createLink(user.organizationId, dto, user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':token')
  @Roles('admin', 'super_admin')
  async revoke(
    @Param('token') token: string,
    @CurrentUser() user: RequestUser,
  ) {
    await this.linksService.revoke(token, user.organizationId);
    return { revoked: true };
  }

  // ── Public (self-pay / wallet deposit pages) ──────────────────

  @Get('public/:token')
  async publicView(@Param('token') token: string) {
    return this.linksService.publicView(token);
  }

  /** Token-gated public initialize: starts a gateway payment for the link. */
  @Post(':token/initialize')
  async initializeForLink(
    @Param('token') token: string,
    @Body()
    dto: {
      providerId?: string;
      paymentMethodId?: string;
      returnUrl?: string;
      callbackUrl?: string;
    },
  ) {
    const link = await this.linksService.getByToken(token);
    const sourceType =
      link.type === 'order_payment' ? 'order' : 'wallet_deposit';
    return this.gateway.initializeWeb(
      link.organizationId,
      {
        sourceType,
        sourceId:
          link.type === 'order_payment'
            ? (link.targetId ?? undefined)
            : undefined,
        userId: link.userId ?? undefined,
        amount: link.amount ?? undefined,
        paymentMethodId: dto.paymentMethodId,
        providerId: dto.providerId,
        returnUrl: dto.returnUrl,
        callbackUrl: dto.callbackUrl,
      },
      { sub: link.userId ?? 'anonymous' },
    );
  }

  /** Returns the live status for a completed payment (rendered by the pay page). */
  @Get(':token/status')
  async statusFor(token: string) {
    const link = await this.linksService.getByToken(token);
    const latest = await this.gateway.latestForSource(
      link.organizationId,
      link.type === 'order_payment' ? 'order' : 'wallet_deposit',
      link.targetId,
      link.userId,
    );
    await this.linksService.markIfPaid(link, latest);
    return { link, payment: latest };
  }

  @Post(':token/complete')
  async complete(@Param('token') token: string) {
    const link = await this.linksService.getByToken(token);
    const latest = await this.gateway.latestForSource(
      link.organizationId,
      link.type === 'order_payment' ? 'order' : 'wallet_deposit',
      link.targetId,
      link.userId,
    );
    await this.linksService.markIfPaid(link, latest);
    return {
      status: latest?.status ?? 'pending',
      reference: latest?.reference,
      paid: latest?.status === 'success',
    };
  }
}
