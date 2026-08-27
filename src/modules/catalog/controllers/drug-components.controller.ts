import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Put, Query, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { toCsv } from '../../../shared/utils/csv';
import { buildTableHtml, prepareExportRows } from '../../../shared/utils/export';
import { PrintPdfService } from '../../print/services/print-pdf.service';
import type { DrugComponentType } from '../../../shared/domain';
import { CreateDrugComponentDto, ListDrugComponentsDto, UpdateDrugComponentDto } from '../dto/drug-components.dto';
import { DrugComponentsService } from '../services/drug-components.service';

type DrugComponentListResponse = {
  data: DrugComponentType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('drug-components')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('drug-components')
export class DrugComponentsController {
  constructor(
    private readonly drugComponentsService: DrugComponentsService,
    private readonly printPdfService: PrintPdfService,
  ) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  async list(
    @Query() query: ListDrugComponentsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<DrugComponentListResponse> {
    const result = await this.drugComponentsService.list(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('export')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  @Header('Content-Type', 'text/csv')
  async exportCsv(
    @Query() query: ListDrugComponentsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<string> {
    query.page = 1;
    query.limit = 1000000;
    const rows = prepareExportRows((await this.drugComponentsService.list(query, currentUser.organizationId)).data);
    return toCsv(rows);
  }

  @Get('export/pdf')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  async exportPdf(
    @Query() query: ListDrugComponentsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<StreamableFile> {
    query.page = 1;
    query.limit = 1000000;
    const rows = prepareExportRows((await this.drugComponentsService.list(query, currentUser.organizationId)).data);
    const { buffer, filename } = await this.printPdfService.generatePdf(
      buildTableHtml(rows, 'Drug Components Export'),
      { filename: 'drug_components.pdf' },
    );
    return new StreamableFile(buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${filename}"`,
    });
  }

  @Get(':drugComponentId')
  @Roles('admin', 'super_admin', 'pharmacist', 'inventory_clerk')
  async get(@Param('drugComponentId') drugComponentId: string, @CurrentUser() currentUser: RequestUser): Promise<DrugComponentType> {
    return this.drugComponentsService.get(drugComponentId, currentUser.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.drug_component.create')
  async create(@Body() payload: CreateDrugComponentDto, @CurrentUser() currentUser: RequestUser): Promise<DrugComponentType> {
    return this.drugComponentsService.create(payload, currentUser.organizationId);
  }

  @Put(':drugComponentId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.drug_component.update')
  async replace(
    @Param('drugComponentId') drugComponentId: string,
    @Body() payload: UpdateDrugComponentDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<DrugComponentType> {
    return this.drugComponentsService.update(drugComponentId, payload, currentUser.organizationId);
  }

  @Patch(':drugComponentId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.drug_component.update')
  async patch(
    @Param('drugComponentId') drugComponentId: string,
    @Body() payload: UpdateDrugComponentDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<DrugComponentType> {
    return this.drugComponentsService.update(drugComponentId, payload, currentUser.organizationId);
  }

  @Delete(':drugComponentId')
  @Roles('admin', 'super_admin', 'pharmacist')
  @AuditAction('catalog.drug_component.delete')
  async remove(@Param('drugComponentId') drugComponentId: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.drugComponentsService.remove(drugComponentId, currentUser.organizationId);
  }
}
