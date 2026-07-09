import { Body, BadRequestException, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser, type RequestUser } from '../../../common/decorators/current-user.decorator';
import { WebsiteService } from '../services/website.service';
import {
  ListQueryDto,
  CreateHealthConcernDto,
  UpdateHealthConcernDto,
  CreateArticleDto,
  UpdateArticleDto,
  UpdatePrescriptionStatusDto,
  PostOrderAsSaleDto,
  UpdateOrderStatusDto,
} from '../dto/website.dto';
import { HealthConcernOrmEntity } from '../entities/health-concern.orm-entity';
import { BlogArticleOrmEntity } from '../entities/blog-article.orm-entity';
import { PrescriptionOrmEntity } from '../entities/prescription.orm-entity';
import { OrderOrmEntity } from '../entities/order.orm-entity';
import { ItemOrmEntity } from '../../../modules/catalog/entities/item.orm-entity';
import { SaleOrmEntity, SaleLineOrmEntity } from '../../sales/entities';
import {
  StockBalanceOrmEntity,
  StockAdjustmentOrmEntity,
  StoreStockLocationOrmEntity,
} from '../../inventory/entities';
import { DEFAULT_ORGANIZATION_ID, DEFAULT_STORE_ID, DEFAULT_UOM_ID } from '../../../shared/constants/persistence-scope';

const ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['dispatched', 'cancelled'],
  dispatched: ['in_transit'],
  in_transit: ['delivered'],
  delivered: [],
  cancelled: [],
};

@ApiTags('website-admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin')
@Controller('website/admin')
export class WebsiteAdminController {
  constructor(
    private readonly websiteService: WebsiteService,
    @InjectRepository(HealthConcernOrmEntity)
    private readonly healthConcernRepo: Repository<HealthConcernOrmEntity>,
    @InjectRepository(BlogArticleOrmEntity)
    private readonly blogRepo: Repository<BlogArticleOrmEntity>,
    @InjectRepository(PrescriptionOrmEntity)
    private readonly prescriptionRepo: Repository<PrescriptionOrmEntity>,
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepo: Repository<OrderOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepo: Repository<ItemOrmEntity>,
    @InjectRepository(SaleOrmEntity)
    private readonly saleRepo: Repository<SaleOrmEntity>,
    @InjectRepository(SaleLineOrmEntity)
    private readonly saleLineRepo: Repository<SaleLineOrmEntity>,
    @InjectRepository(StockBalanceOrmEntity)
    private readonly stockBalanceRepo: Repository<StockBalanceOrmEntity>,
    @InjectRepository(StockAdjustmentOrmEntity)
    private readonly stockAdjustmentRepo: Repository<StockAdjustmentOrmEntity>,
    @InjectRepository(StoreStockLocationOrmEntity)
    private readonly storeStockLocationRepo: Repository<StoreStockLocationOrmEntity>,
  ) {}

  // ── Health Concerns ────────────────────────────────────────────

  @Get('health-concerns')
  @ApiOperation({ summary: 'List all health concerns (admin)' })
  listHealthConcerns() {
    return this.healthConcernRepo.find({ order: { displayOrder: 'ASC' } });
  }

  @Post('health-concerns')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a health concern' })
  createHealthConcern(@Body() dto: CreateHealthConcernDto) {
    const entity = this.healthConcernRepo.create(dto);
    return this.healthConcernRepo.save(entity);
  }

  @Put('health-concerns/:id')
  @ApiOperation({ summary: 'Update a health concern' })
  async updateHealthConcern(@Param('id') id: string, @Body() dto: UpdateHealthConcernDto) {
    await this.healthConcernRepo.update(id, dto);
    return this.healthConcernRepo.findOne({ where: { id } });
  }

  @Delete('health-concerns/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a health concern' })
  async deleteHealthConcern(@Param('id') id: string) {
    await this.healthConcernRepo.update(id, { isActive: false });
    return { id, isActive: false };
  }

  // ── Blog Articles ──────────────────────────────────────────────

  @Get('articles')
  @ApiOperation({ summary: 'List all articles including unpublished' })
  async listArticles(@Query() query: ListQueryDto) {
    const [data, total] = await this.blogRepo.findAndCount({
      order: { publishedAt: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    return { data, total, page: query.page, limit: query.limit };
  }

  @Post('articles')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a blog article' })
  createArticle(@Body() dto: CreateArticleDto) {
    const entity = this.blogRepo.create({ ...dto, publishedAt: dto.isPublished ? new Date() : null });
    return this.blogRepo.save(entity);
  }

  @Put('articles/:id')
  @ApiOperation({ summary: 'Update a blog article' })
  async updateArticle(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    const updateData: Record<string, unknown> = { ...dto };
    if (dto.isPublished === false) {
      updateData.publishedAt = null;
    } else if (dto.isPublished) {
      const existing = await this.blogRepo.findOne({ where: { id } });
      if (existing && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    await this.blogRepo.update(id, updateData as any);
    return this.blogRepo.findOne({ where: { id } });
  }

  @Delete('articles/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a blog article' })
  async deleteArticle(@Param('id') id: string) {
    await this.blogRepo.softDelete(id);
    return { id, deleted: true };
  }

  // ── Prescriptions ──────────────────────────────────────────────

  @Get('prescriptions')
  @ApiOperation({ summary: 'List prescriptions with status filter and pagination' })
  @ApiQuery({ name: 'status', required: false })
  async listPrescriptions(@Query() query: ListQueryDto, @Query('status') status?: string) {
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [data, total] = await this.prescriptionRepo.findAndCount({
      where,
      relations: ['files'],
      order: { createdAt: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    return { data, total, page: query.page, limit: query.limit };
  }

  @Patch('prescriptions/:id/status')
  @ApiOperation({ summary: 'Update prescription status' })
  async updatePrescriptionStatus(@Param('id') id: string, @Body() dto: UpdatePrescriptionStatusDto) {
    await this.prescriptionRepo.update(id, { status: dto.status as any });
    return this.prescriptionRepo.findOne({ where: { id }, relations: ['files'] });
  }

  // ── Orders ──────────────────────────────────────────────────────

  @Get('orders')
  @ApiOperation({ summary: 'List all website orders' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async listOrders(
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const where: Record<string, unknown> = {};
    if (status) where.orderStatus = status;

    const [data, total] = await this.orderRepo.findAndCount({
      where: where as any,
      relations: ['items', 'delivery', 'sale'],
      order: { createdAt: 'DESC' },
      skip: ((page ?? 1) - 1) * (limit ?? 20),
      take: limit ?? 20,
    });
    return { data, total, page: page ?? 1, limit: limit ?? 20 };
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get website order detail' })
  async getOrder(@Param('id') id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'delivery', 'sale'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Patch('orders/:id/status')
  @ApiOperation({ summary: 'Update order status with transition validation' })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    const allowed = ORDER_STATUS_TRANSITIONS[order.orderStatus] ?? [];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot transition from ${order.orderStatus} to ${dto.status}. Allowed: ${allowed.join(', ') || 'none'}`,
      );
    }

    order.orderStatus = dto.status as any;
    return this.orderRepo.save(order);
  }

  @Post('complete-sale/:saleId')
  @ApiOperation({ summary: 'Complete a draft sale — deplete stock and post' })
  async completeSale(
    @Param('saleId') saleId: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const sale = await this.saleRepo.findOne({ where: { id: saleId, status: 'draft' }, relations: ['lines', 'lines.item'] });
    if (!sale) throw new NotFoundException('Draft sale not found');

    const locationId = sale.stockLocationId;
    if (!locationId) {
      const ssl = await this.storeStockLocationRepo.findOne({
        where: { organizationId: currentUser.organizationId, storeId: sale.storeId, purpose: 'sale_issue', isActive: true },
        relations: ['stockLocation'],
      });
      if (!ssl) throw new BadRequestException('No sale_issue stock location configured');
      sale.stockLocationId = ssl.stockLocation.id;
    }

    const finalLocId = sale.stockLocationId!;
    if (!sale.lines?.length) throw new BadRequestException('Sale has no lines');

    for (const line of sale.lines) {
      const balance = await this.stockBalanceRepo.findOne({
        where: { organizationId: currentUser.organizationId, item: { id: line.item.id }, location: { id: finalLocId } },
        relations: ['item', 'location'],
      } as any);
      if (!balance) continue;

      balance.quantityOnHand = Number(Math.max(0, balance.quantityOnHand - line.quantity).toFixed(4));
      const savedBalance = await this.stockBalanceRepo.save(balance);

      await this.stockAdjustmentRepo.save(
        this.stockAdjustmentRepo.create({
          stockBalance: savedBalance,
          reason: `sale_fulfillment:${sale.saleNumber}`,
          deltaQuantity: -line.quantity,
          performedByUserId: currentUser.sub,
          performedAt: new Date(),
        }),
      );
    }

    sale.status = 'posted';
    await this.saleRepo.save(sale);

    await this.orderRepo.update({ saleId: sale.id }, { orderStatus: 'dispatched' } as any);

    return { id: sale.id, status: sale.status };
  }

  @Post('orders/:id/post-sale')
  @ApiOperation({ summary: 'Post an order as a draft sale' })
  async postOrderAsSale(
    @Param('id') id: string,
    @Body() dto: PostOrderAsSaleDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const order = await this.orderRepo.findOne({
      where: { id, orderStatus: 'confirmed' },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException('Order must be in confirmed status to post as sale');

    if (!order.items?.length) {
      throw new BadRequestException('Order has no items');
    }

    const items = await this.itemRepo.findBy({ id: In(order.items.map((i) => i.itemId)) });
    const itemMap = new Map(items.map((i) => [i.id, i]));

    const sale = this.saleRepo.create({
      organizationId: currentUser.organizationId,
      saleNumber: `WEBORD-${order.orderNumber.replace('ORD-', '')}`,
      saleChannel: 'website',
      storeId: DEFAULT_STORE_ID,
      customerId: order.customerId,
      status: 'draft',
      notes: order.notes,
      stockLocationId: dto.stockLocationId ?? null,
      subtotalAmount: order.subtotalAmount,
      discountAmount: 0,
      taxAmount: 0,
      totalAmount: order.totalAmount,
      paidAmount: 0,
      changeAmount: 0,
      saleDate: new Date(),
      soldByUserId: currentUser.sub,
      createdBy: currentUser.sub,
    });
    const savedSale = await this.saleRepo.save(sale);

    let lineNumber = 1;
    for (const orderItem of order.items) {
      const catalogItem = itemMap.get(orderItem.itemId);
      await this.saleLineRepo.save(
        this.saleLineRepo.create({
          sale: savedSale,
          lineNumber,
          item: { id: orderItem.itemId } as any,
          quantity: orderItem.quantity,
          unitPrice: orderItem.unitPrice,
          lineSubtotal: orderItem.unitPrice * orderItem.quantity,
          lineTotal: orderItem.unitPrice * orderItem.quantity,
          uom: { id: catalogItem?.baseUomId ?? DEFAULT_UOM_ID },
          lot: null,
        } as any),
      );
      lineNumber++;
    }

    order.saleId = savedSale.id;
    order.orderStatus = 'processing';
    await this.orderRepo.save(order);

    return this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['items', 'delivery', 'sale'],
    });
  }
}
