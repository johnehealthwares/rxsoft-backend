import { Body, BadRequestException, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
} from '../dto/website.dto';
import { HealthConcernOrmEntity } from '../entities/health-concern.orm-entity';
import { BlogArticleOrmEntity } from '../entities/blog-article.orm-entity';
import { PrescriptionOrmEntity } from '../entities/prescription.orm-entity';
import { SaleOrmEntity } from '../../sales/entities';
import {
  StockBalanceOrmEntity,
  StockAdjustmentOrmEntity,
  StoreStockLocationOrmEntity,
} from '../../inventory/entities';

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
    @InjectRepository(SaleOrmEntity)
    private readonly saleRepo: Repository<SaleOrmEntity>,
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
  @ApiOperation({ summary: 'List all website orders (saleChannel=mobile)' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async listOrders(
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const where: Record<string, unknown> = { saleChannel: 'mobile' };
    if (status) {
      where.orderStatus = status;
    }
    const [data, total] = await this.saleRepo.findAndCount({
      where: where as any,
      relations: ['lines'],
      order: { createdAt: 'DESC' },
      skip: ((page ?? 1) - 1) * (limit ?? 20),
      take: limit ?? 20,
    });
    return { data, total, page: page ?? 1, limit: limit ?? 20 };
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get website order detail' })
  async getOrder(@Param('id') id: string) {
    const order = await this.saleRepo.findOne({
      where: { id, saleChannel: 'mobile' },
      relations: ['lines'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Patch('orders/:id/status')
  @ApiOperation({ summary: 'Update order status with transition validation' })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: { status: string },
    @CurrentUser() currentUser: RequestUser,
  ) {
    const order = await this.saleRepo.findOne({
      where: { id, saleChannel: 'mobile' },
      relations: ['lines'],
    });
    if (!order) throw new NotFoundException('Order not found');

    const allowed = ORDER_STATUS_TRANSITIONS[order.orderStatus ?? 'pending'] ?? [];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot transition from ${order.orderStatus ?? 'pending'} to ${dto.status}. Allowed: ${allowed.join(', ') || 'none'}`,
      );
    }

    if (dto.status === 'cancelled' && order.assignedLocationId) {
      const linesWithDetails = await this.websiteService.getOrderLinesWithItems(order.id);
      const locId = order.assignedLocationId;
      for (const line of linesWithDetails) {
        const balance = await this.stockBalanceRepo.findOne({
          where: {
            organizationId: currentUser.organizationId,
            item: { id: line.itemId },
            location: { id: locId },
          } as any,
        });
        if (balance && balance.quantityReserved > 0) {
          balance.quantityReserved = Number(Math.max(0, balance.quantityReserved - line.quantity).toFixed(4));
          await this.stockBalanceRepo.save(balance);
        }
      }
      order.assignedLocationId = null;
    }

    order.orderStatus = dto.status as any;
    return this.saleRepo.save(order);
  }

  @Post('orders/:id/assign-location')
  @ApiOperation({ summary: 'Assign a stock location to fulfill an order' })
  async assignLocation(
    @Param('id') id: string,
    @Body() dto: { stockLocationId: string },
  ) {
    const order = await this.saleRepo.findOne({
      where: { id, saleChannel: 'mobile' },
    });
    if (!order) throw new NotFoundException('Order not found');

    order.assignedLocationId = dto.stockLocationId;
    return this.saleRepo.save(order);
  }

  @Post('orders/:id/process')
  @ApiOperation({ summary: 'Process order — deplete reserved stock and update status' })
  async processOrder(
    @Param('id') id: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const order = await this.saleRepo.findOne({
      where: { id, saleChannel: 'mobile', orderStatus: 'confirmed' },
    });
    if (!order) throw new NotFoundException('Order must be in confirmed status to process');

    const locationId = order.assignedLocationId;
    if (!locationId) {
      const ssl = await this.storeStockLocationRepo.findOne({
        where: {
          organizationId: currentUser.organizationId,
          storeId: order.storeId,
          purpose: 'sale_issue',
          isActive: true,
        },
        relations: ['stockLocation'],
      });
      if (!ssl) {
        throw new BadRequestException('No sale_issue stock location configured and no location assigned to order');
      }
      order.assignedLocationId = ssl.stockLocation.id;
    }

    const linesWithDetails = await this.websiteService.getOrderLinesWithItems(order.id);
    for (const line of linesWithDetails) {
      const locId2 = order.assignedLocationId;
      if (!locId2) continue;
      const balance = await this.stockBalanceRepo.findOne({
        where: {
          organizationId: currentUser.organizationId,
          item: { id: line.itemId },
          location: { id: locId2 },
        },
        relations: ['item', 'location'],
      } as any);
      if (!balance) continue;

      const qtyToDeplete = line.quantity;
      const reserved = Math.min(balance.quantityReserved, qtyToDeplete);
      balance.quantityReserved = Number((balance.quantityReserved - reserved).toFixed(4));
      balance.quantityOnHand = Number((balance.quantityOnHand - (qtyToDeplete - reserved)).toFixed(4));

      if (balance.quantityOnHand < 0) {
        throw new BadRequestException(`Insufficient stock for item ${line.itemId}`);
      }
      const savedBalance = await this.stockBalanceRepo.save(balance);

      await this.stockAdjustmentRepo.save(
        this.stockAdjustmentRepo.create({
          stockBalance: savedBalance,
          reason: `order_fulfillment:${order.saleNumber}`,
          deltaQuantity: -qtyToDeplete,
          performedByUserId: currentUser.sub,
          performedAt: new Date(),
        }),
      );
    }

    order.orderStatus = 'processing';
    return this.saleRepo.save(order);
  }
}
