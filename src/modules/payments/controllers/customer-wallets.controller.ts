import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { DebitWalletDto, WalletDepositDto } from '../dto/payments.dto';
import { CustomerWalletService } from '../services/customer-wallet.service';
import { PaymentGatewayService } from '../services/payment-gateway.service';

@ApiTags('customer-wallet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('customer/wallet')
export class CustomerWalletsController {
  constructor(
    private readonly walletService: CustomerWalletService,
    private readonly gateway: PaymentGatewayService,
  ) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async wallet(@CurrentUser() user: RequestUser) {
    const wallet = await this.walletService.getOrCreate(
      user.organizationId,
      user.sub,
    );
    return {
      id: wallet.id,
      balance: wallet.balance,
      currency: wallet.currency,
      userId: user.sub,
    };
  }

  @Get('transactions')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async transactions(@CurrentUser() user: RequestUser) {
    return this.walletService.history(user.organizationId, user.sub);
  }

  @Post('debit')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async debit(@Body() dto: DebitWalletDto, @CurrentUser() user: RequestUser) {
    const wallet = await this.walletService.debit(
      user.organizationId,
      user.sub,
      dto.amount,
      {
        reference: dto.reference,
        note: dto.note,
        sourceType: 'payment',
      },
    );
    return { id: wallet.id, balance: wallet.balance, reference: dto.reference };
  }

  /** Starts a hosted gateway deposit into the current user's wallet. */
  @Post('deposit')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async deposit(
    @Body() dto: WalletDepositDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.gateway.initializeWeb(
      user.organizationId,
      {
        amount: dto.amount,
        sourceType: 'wallet_deposit',
        userId: user.sub,
        returnUrl: dto.returnUrl,
        callbackUrl: dto.callbackUrl,
      },
      { sub: user.sub },
    );
  }
}
