import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Put, Query, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { PartyType } from '../../../shared/domain';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { toCsv } from '../../../shared/utils/csv';
import { buildTableHtml, prepareExportRows } from '../../../shared/utils/export';
import { PrintPdfService } from '../../print/services/print-pdf.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customers.dto';
import { CustomersService } from '../services/customers.service';

type CustomerListResponse = {
  data: PartyType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly printPdfService: PrintPdfService,
  ) {}

  @Get()
  @Roles('super_admin', 'admin', 'manager', 'cashier', 'auditor')
  async list(@Query() query: ListQueryDto, @CurrentUser() currentUser: RequestUser): Promise<CustomerListResponse> {
    const result = await this.customersService.list(currentUser.organizationId, query);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('export')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  @Header('Content-Type', 'text/csv')
  async export(@Query() query: ListQueryDto, @CurrentUser() currentUser: RequestUser): Promise<string> {
    query.page = 1;
    query.limit = 1000000;
    return toCsv(prepareExportRows((await this.customersService.list(currentUser.organizationId, query)).data as Array<Record<string, unknown>>));
  }

  @Get('export/pdf')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  async exportPdf(@Query() query: ListQueryDto, @CurrentUser() currentUser: RequestUser): Promise<StreamableFile> {
    query.page = 1;
    query.limit = 1000000;
    const rows = prepareExportRows((await this.customersService.list(currentUser.organizationId, query)).data as Array<Record<string, unknown>>);
    const { buffer, filename } = await this.printPdfService.generatePdf(
      buildTableHtml(rows, 'Customers Export'),
      { filename: 'customers.pdf' },
    );
    return new StreamableFile(buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${filename}"`,
    });
  }

  @Post()
  @Roles('super_admin', 'admin', 'manager')
  create(@Body() payload: CreateCustomerDto, @CurrentUser() currentUser: RequestUser): Promise<PartyType> {
    return this.customersService.createCustomer(currentUser.organizationId, payload);
  }

  @Put(':customerId')
  @Roles('super_admin', 'admin', 'manager')
  replace(@Param('customerId') customerId: string, @Body() payload: UpdateCustomerDto, @CurrentUser() currentUser: RequestUser): Promise<PartyType> {
    return this.customersService.updateCustomer(currentUser.organizationId, customerId, payload);
  }

  @Patch(':customerId')
  @Roles('super_admin', 'admin', 'manager')
  patch(@Param('customerId') customerId: string, @Body() payload: UpdateCustomerDto, @CurrentUser() currentUser: RequestUser): Promise<PartyType> {
    return this.customersService.updateCustomer(currentUser.organizationId, customerId, payload);
  }

  @Delete(':customerId')
  @Roles('super_admin', 'admin')
  async remove(@Param('customerId') customerId: string, @CurrentUser() currentUser: RequestUser): Promise<{ ok: true }> {
    await this.customersService.archive(currentUser.organizationId, customerId);
    return { ok: true };
  }
}
