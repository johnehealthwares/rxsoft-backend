import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser, type RequestUser } from '../../../common/decorators/current-user.decorator';
import { WebsiteService } from '../services/website.service';
import { OrdersService } from '../../orders/orders.service';
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

@ApiTags('website-admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin')
@Controller('website/admin')
export class WebsiteAdminController {
  constructor(
    private readonly websiteService: WebsiteService,
    private readonly ordersService: OrdersService,
    @InjectRepository(HealthConcernOrmEntity)
    private readonly healthConcernRepo: Repository<HealthConcernOrmEntity>,
    @InjectRepository(BlogArticleOrmEntity)
    private readonly blogRepo: Repository<BlogArticleOrmEntity>,
    @InjectRepository(PrescriptionOrmEntity)
    private readonly prescriptionRepo: Repository<PrescriptionOrmEntity>,
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

  // ── Orders (delegated to OrdersModule) ──────────────────────────

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
    return this.ordersService.listAllOrders(status, page ?? 1, limit ?? 20);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get website order detail' })
  async getOrder(@Param('id') id: string) {
    return this.ordersService.getAdminOrder(id);
  }

  @Patch('orders/:id/status')
  @ApiOperation({ summary: 'Update order status with transition validation' })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(id, dto.status);
  }

  @Post('complete-sale/:saleId')
  @ApiOperation({ summary: 'Complete a draft sale — deplete stock and post' })
  async completeSale(
    @Param('saleId') saleId: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.ordersService.completeSale(saleId, currentUser);
  }

  @Post('orders/:id/post-sale')
  @ApiOperation({ summary: 'Post an order as a draft sale' })
  async postOrderAsSale(
    @Param('id') id: string,
    @Body() dto: PostOrderAsSaleDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.ordersService.postOrderAsSale(id, dto, currentUser);
  }
}
