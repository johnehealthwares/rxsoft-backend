import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { GoodsReceiptResponseDto, ReceiveGoodsDto } from '../dto/goods-receipt.dto';
import { ReceiveGoodsUseCase } from '../services/receive-goods.use-case';

@ApiTags('purchases-inflow')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class InflowController {
  constructor(
    private readonly receiveGoodsUseCase: ReceiveGoodsUseCase,
  ) {}

  @Post('purchases/:id/receive')
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.receive')
  @ApiOperation({ summary: 'Receive goods for a purchase order' })
  async receiveGoods(
    @Param('id') id: string,
    @Body() payload: ReceiveGoodsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<{ message: string }> {
    payload.purchaseOrderId = id;
    await this.receiveGoodsUseCase.execute(payload, currentUser.organizationId, currentUser.sub);
    return { message: 'Goods received successfully' };
  }

  @Get('purchases/:id/receipts')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  @ApiOperation({ summary: 'List receipts for a purchase order' })
  async listReceiptsByPo(
    @Param('id') id: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<GoodsReceiptResponseDto[]> {
    return [];
  }

  @Get('receipts')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  @ApiOperation({ summary: 'List all goods receipts' })
  async listAllReceipts(
    @Query() _query: Record<string, unknown>,
    @CurrentUser() _currentUser: RequestUser,
  ): Promise<GoodsReceiptResponseDto[]> {
    return [];
  }
}
