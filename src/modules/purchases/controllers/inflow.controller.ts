import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { ReceiveGoodsDto } from '../dto/goods-receipt.dto';
import { UnpostGoodsDto } from '../dto/unpost-goods.dto';
import { ReceiveGoodsUseCase } from '../services/receive-goods.use-case';
import { PURCHASES_REPOSITORY } from '../services/purchases.di-tokens';
import type { PurchasesRepository } from '../repositories/purchases.repository';

@ApiTags('purchases-inflow')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class InflowController {
  constructor(
    private readonly receiveGoodsUseCase: ReceiveGoodsUseCase,
    @Inject(PURCHASES_REPOSITORY)
    private readonly purchasesRepo: PurchasesRepository,
  ) {}

  @Post('purchases/:id/receive')
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.receive')
  @ApiOperation({ summary: 'Receive goods for a purchase order' })
  async receiveGoods(
    @Param('id') id: string,
    @Body() payload: ReceiveGoodsDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    payload.purchaseOrderId = id;
    const result = await this.receiveGoodsUseCase.execute(payload, currentUser.organizationId, currentUser.sub);
    return result;
  }

  @Post('purchases/:id/unpost')
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.receive.unpost')
  @ApiOperation({ summary: 'Unpost a goods receipt line' })
  async unpostGoods(
    @Param('id') _id: string,
    @Body() payload: UnpostGoodsDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    if (payload.password !== 'password12') {
      throw new BadRequestException('Invalid password');
    }
    await this.purchasesRepo.unpostGoods({
      organizationId: currentUser.organizationId,
      receiptLineId: payload.receiptLineId,
      performedByUserId: currentUser.sub,
    });
    return { message: 'Goods receipt line unposted successfully' };
  }

  @Get('purchases/:id/receipts')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  @AuditAction('purchase.receipts.list')
  @ApiOperation({ summary: 'List receipts for a purchase order' })
  async listReceiptsByPo(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @CurrentUser() currentUser?: RequestUser,
  ) {
    const result = await this.purchasesRepo.listReceipts({
      organizationId: currentUser!.organizationId,
      purchaseOrderId: id,
      offset: ((page ?? 1) - 1) * (limit ?? 20),
      limit: limit ?? 20,
    });
    return { data: result.items, total: result.total, page: page ?? 1, limit: limit ?? 20 };
  }

  @Get('receipts')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  @AuditAction('purchase.receipts.list')
  @ApiOperation({ summary: 'List all goods receipts' })
  async listAllReceipts(
    @Query() query: ListQueryDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const result = await this.purchasesRepo.listReceipts({
      organizationId: currentUser.organizationId,
      search: query.search,
      offset: query.offset,
      limit: query.limit,
    });
    return { data: result.items, meta: { page: query.page, limit: query.limit, total: result.total } };
  }
}
