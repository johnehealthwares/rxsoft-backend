import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser, type RequestUser } from '../../common/decorators/current-user.decorator';
import { OrdersService } from './orders.service';

class ReconcileItemDto {
  @IsUUID()
  @IsNotEmpty()
  itemId!: string;
}

class ReconcileAllDto {
  @IsObject()
  itemIds!: Record<string, string>;
}

@ApiTags('orders-admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin')
@Controller('orders/admin')
export class OrderAdminController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('orders')
  @ApiOperation({ summary: 'List all orders' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async listOrders(
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.ordersService.listAllOrders(status, page ?? 1, limit ?? 20);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get order detail' })
  async getOrder(@Param('id') id: string) {
    return this.ordersService.getAdminOrder(id);
  }

  @Patch('orders/:id/status')
  @ApiOperation({ summary: 'Update order status' })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateOrderStatus(id, status);
  }

  @Post('orders/:id/post-sale')
  @ApiOperation({ summary: 'Post order as draft sale' })
  async postAsSale(
    @Param('id') id: string,
    @Body() dto: { stockLocationId?: string },
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.ordersService.postOrderAsSale(id, dto, currentUser);
  }

  @Post('orders/:orderId/items/:orderItemId/reconcile')
  @ApiOperation({ summary: 'Reconcile a freetext order item to a real item' })
  async reconcileItem(
    @Param('orderId') orderId: string,
    @Param('orderItemId') orderItemId: string,
    @Body() dto: ReconcileItemDto,
  ) {
    return this.ordersService.reconcileItem(orderId, orderItemId, dto.itemId);
  }

  @Post('orders/:orderId/reconcile-all')
  @ApiOperation({ summary: 'Reconcile all freetext items at once' })
  async reconcileAll(
    @Param('orderId') orderId: string,
    @Body() dto: ReconcileAllDto,
  ) {
    return this.ordersService.reconcileAllItems(orderId, dto.itemIds);
  }

  @Post('complete-sale/:saleId')
  @ApiOperation({ summary: 'Complete a draft sale' })
  async completeSale(
    @Param('saleId') saleId: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.ordersService.completeSale(saleId, currentUser);
  }
}
