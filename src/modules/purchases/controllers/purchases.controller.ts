import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { CreatePurchaseDto, CreatePurchaseLineDto, UpdatePurchaseDto, UpdatePurchaseLineDto } from '../dto/purchases.dto';
import { PurchasesService } from '../services/purchases.service';

type PurchaseSummaryType = Awaited<ReturnType<PurchasesService['getById']>>;
type PurchaseListResponse = {
  data: PurchaseSummaryType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('purchases')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  async list(@Query() query: ListQueryDto, @CurrentUser() currentUser: RequestUser): Promise<PurchaseListResponse> {
    const result = await this.purchasesService.list(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get(':purchaseId')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  getById(@Param('purchaseId') purchaseId: string, @CurrentUser() currentUser: RequestUser): Promise<PurchaseSummaryType> {
    return this.purchasesService.getById(purchaseId, currentUser.organizationId);
  }

  @Post()
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.create')
  create(@Body() payload: CreatePurchaseDto, @CurrentUser() currentUser: RequestUser): Promise<PurchaseSummaryType> {
    return this.purchasesService.createPurchase(payload, currentUser);
  }

  @Put(':purchaseId')
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.update')
  replace(
    @Param('purchaseId') purchaseId: string,
    @Body() payload: UpdatePurchaseDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PurchaseSummaryType> {
    return this.purchasesService.updatePurchase(purchaseId, payload, currentUser);
  }

  @Patch(':purchaseId')
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.update')
  patch(
    @Param('purchaseId') purchaseId: string,
    @Body() payload: UpdatePurchaseDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PurchaseSummaryType> {
    return this.purchasesService.updatePurchase(purchaseId, payload, currentUser);
  }

  @Delete(':purchaseId')
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.delete')
  async remove(@Param('purchaseId') purchaseId: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.purchasesService.removePurchase(purchaseId, currentUser.organizationId);
  }

  @Post(':purchaseId/lines')
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.line.create')
  async addLine(
    @Param('purchaseId') purchaseId: string,
    @Body() payload: CreatePurchaseLineDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PurchaseSummaryType> {
    return this.purchasesService.addLine(purchaseId, payload, currentUser);
  }

  @Put(':purchaseId/lines/:lineId')
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.line.update')
  async updateLine(
    @Param('purchaseId') purchaseId: string,
    @Param('lineId') lineId: string,
    @Body() payload: UpdatePurchaseLineDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PurchaseSummaryType> {
    return this.purchasesService.updateLine(purchaseId, lineId, payload, currentUser);
  }

  @Delete(':purchaseId/lines/:lineId')
  @Roles('super_admin', 'admin', 'manager')
  @AuditAction('purchase.line.delete')
  async removeLine(
    @Param('purchaseId') purchaseId: string,
    @Param('lineId') lineId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<PurchaseSummaryType> {
    return this.purchasesService.removeLine(purchaseId, lineId, currentUser);
  }
}
