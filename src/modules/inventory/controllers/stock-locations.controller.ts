import { Body, Controller, Get, Header, Param, Patch, Post, Put, Query, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { toCsv } from '../../../shared/utils/csv';
import { buildTableHtml, prepareExportRows } from '../../../shared/utils/export';
import type { StockLocationType } from '../../../shared/domain';
import { PrintPdfService } from '../../print/services/print-pdf.service';
import { CreateStockLocationDto, ListStockLocationsDto, UpdateStockLocationDto } from '../dto/stock-locations.dto';
import { StockLocationsService } from '../services/stock-locations.service';

type StockLocationListResponse = {
  data: StockLocationType[];
  meta: { page: number; limit: number; total: number };
};

type StockLocationSearchResponse = {
  data: Array<{ id: string; code: string | null; name: string }>;
  meta: { page: number; limit: number; total: number };
};

@ApiTags('stock-locations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('stock-locations')
export class StockLocationsController {
  constructor(
    private readonly stockLocationsService: StockLocationsService,
    private readonly printPdfService: PrintPdfService,
  ) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  @ApiOperation({ summary: 'List stock locations' })
  async list(
    @Query() query: ListStockLocationsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StockLocationListResponse> {
    const result = await this.stockLocationsService.list(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('export')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @Header('Content-Type', 'text/csv')
  @ApiOperation({ summary: 'Export stock locations as CSV' })
  async exportCsv(
    @Query() query: ListStockLocationsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<string> {
    query.page = 1;
    query.limit = 1000000;
    const rows = prepareExportRows((await this.stockLocationsService.list(query, currentUser.organizationId)).data);
    return toCsv(rows);
  }

  @Get('export/pdf')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @ApiOperation({ summary: 'Export stock locations as PDF' })
  async exportPdf(
    @Query() query: ListStockLocationsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StreamableFile> {
    query.page = 1;
    query.limit = 1000000;
    const rows = prepareExportRows((await this.stockLocationsService.list(query, currentUser.organizationId)).data);
    const { buffer, filename } = await this.printPdfService.generatePdf(
      buildTableHtml(rows, 'Stock Locations Export'),
      { filename: 'stock_locations.pdf' },
    );
    return new StreamableFile(buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${filename}"`,
    });
  }

  @Get('search')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  async search(
    @Query() query: ListStockLocationsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StockLocationSearchResponse> {
    const result = await this.stockLocationsService.list(query, currentUser.organizationId);
    return {
      data: result.data.map((item) => ({ id: item.id, code: item.code, name: item.name })),
      meta: { page: query.page, limit: query.limit, total: result.total },
    };
  }

  @Get(':stockLocationId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk')
  async get(
    @Param('stockLocationId') stockLocationId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StockLocationType> {
    return this.stockLocationsService.get(stockLocationId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @AuditAction('inventory.stock_location.create')
  async create(
    @Body() payload: CreateStockLocationDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StockLocationType> {
    return this.stockLocationsService.create(payload, currentUser.organizationId, currentUser.locationId ?? null);
  }

  @Put(':stockLocationId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @AuditAction('inventory.stock_location.update')
  async replace(
    @Param('stockLocationId') stockLocationId: string,
    @Body() payload: UpdateStockLocationDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StockLocationType> {
    return this.stockLocationsService.update(stockLocationId, payload, currentUser.organizationId, currentUser.locationId ?? null);
  }

  @Patch(':stockLocationId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @AuditAction('inventory.stock_location.update')
  async patch(
    @Param('stockLocationId') stockLocationId: string,
    @Body() payload: UpdateStockLocationDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StockLocationType> {
    return this.stockLocationsService.update(stockLocationId, payload, currentUser.organizationId, currentUser.locationId ?? null);
  }
}
