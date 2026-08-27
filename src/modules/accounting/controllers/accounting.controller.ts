import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import {
  CreateGlAccountDto,
  CreateJournalDto,
  CreateJournalEntryDto,
  CreateJournalEntryLineDto,
  ListGlAccountsDto,
  ListJournalEntriesDto,
  ListJournalEntryLinesDto,
  ListJournalsDto,
  UpdateGlAccountDto,
  UpdateJournalDto,
  UpdateJournalEntryDto,
  UpdateJournalEntryLineDto,
} from '../dto/accounting.dto';
import {
  AccountingService,
  GlAccountType,
  JournalEntryLineType,
  JournalEntryType,
  JournalType,
} from '../services/accounting.service';

type GlAccountListResponse = {
  data: GlAccountType[];
  meta: { page: number; limit: number; total: number };
};

type JournalListResponse = {
  data: JournalType[];
  meta: { page: number; limit: number; total: number };
};

type JournalEntryListResponse = {
  data: JournalEntryType[];
  meta: { page: number; limit: number; total: number };
};

type JournalEntryLineListResponse = {
  data: JournalEntryLineType[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('accounting')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get('journals')
  @Roles('admin', 'super_admin', 'auditor')
  async listJournals(
    @Query() query: ListJournalsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<JournalListResponse> {
    const result = await this.accountingService.listJournals(query);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('journals/:journalId')
  @Roles('admin', 'super_admin', 'auditor')
  async getJournal(@Param('journalId') journalId: string): Promise<JournalType> {
    return this.accountingService.getJournal(journalId);
  }

  @Post('journals')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal.create')
  async createJournal(@Body() payload: CreateJournalDto, @CurrentUser() currentUser: RequestUser): Promise<JournalType> {
    return this.accountingService.createJournal(payload, currentUser.organizationId);
  }

  @Patch('journals/:journalId')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal.update')
  async updateJournal(
    @Param('journalId') journalId: string,
    @Body() payload: UpdateJournalDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<JournalType> {
    return this.accountingService.updateJournal(journalId, payload, currentUser.organizationId);
  }

  @Delete('journals/:journalId')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal.delete')
  async removeJournal(@Param('journalId') journalId: string): Promise<void> {
    await this.accountingService.removeJournal(journalId);
  }

  @Get('journal-entries')
  @Roles('admin', 'super_admin', 'auditor')
  async listJournalEntries(
    @Query() query: ListJournalEntriesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<JournalEntryListResponse> {
    const result = await this.accountingService.listJournalEntries(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('journal-entries/:entryId')
  @Roles('admin', 'super_admin', 'auditor')
  async getJournalEntry(@Param('entryId') entryId: string, @CurrentUser() currentUser: RequestUser): Promise<JournalEntryType> {
    return this.accountingService.getJournalEntry(entryId, currentUser.organizationId);
  }

  @Post('journal-entries')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal_entry.create')
  async createJournalEntry(
    @Body() payload: CreateJournalEntryDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<JournalEntryType> {
    return this.accountingService.createJournalEntry(payload, currentUser);
  }

  @Patch('journal-entries/:entryId')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal_entry.update')
  async updateJournalEntry(
    @Param('entryId') entryId: string,
    @Body() payload: UpdateJournalEntryDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<JournalEntryType> {
    return this.accountingService.updateJournalEntry(entryId, payload, currentUser);
  }

  @Delete('journal-entries/:entryId')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal_entry.delete')
  async removeJournalEntry(@Param('entryId') entryId: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.accountingService.removeJournalEntry(entryId, currentUser.organizationId);
  }

  @Get('journal-entries/:entryId/lines')
  @Roles('admin', 'super_admin', 'auditor')
  async listJournalEntryLines(
    @Param('entryId') entryId: string,
    @Query() query: ListJournalEntryLinesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<JournalEntryLineListResponse> {
    const result = await this.accountingService.listJournalEntryLines(entryId, query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Post('journal-entries/:entryId/lines')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal_entry_line.create')
  async createJournalEntryLine(
    @Param('entryId') entryId: string,
    @Body() payload: CreateJournalEntryLineDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<JournalEntryLineType> {
    return this.accountingService.createJournalEntryLine(entryId, payload, currentUser.organizationId);
  }

  @Patch('journal-entries/:entryId/lines/:lineId')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal_entry_line.update')
  async updateJournalEntryLine(
    @Param('entryId') entryId: string,
    @Param('lineId') lineId: string,
    @Body() payload: UpdateJournalEntryLineDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<JournalEntryLineType> {
    return this.accountingService.updateJournalEntryLine(entryId, lineId, payload, currentUser.organizationId);
  }

  @Delete('journal-entries/:entryId/lines/:lineId')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal_entry_line.delete')
  async removeJournalEntryLine(
    @Param('entryId') entryId: string,
    @Param('lineId') lineId: string,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<void> {
    await this.accountingService.removeJournalEntryLine(entryId, lineId, currentUser.organizationId);
  }

  // ─── GL Account CRUD ───────────────────────────────────────────────

  @Get('gl-accounts')
  @Roles('admin', 'super_admin', 'auditor')
  async listGlAccounts(
    @Query() query: ListGlAccountsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<GlAccountListResponse> {
    const result = await this.accountingService.listGlAccounts(query, currentUser.organizationId);
    return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
  }

  @Get('gl-accounts/:accountId')
  @Roles('admin', 'super_admin', 'auditor')
  async getGlAccount(@Param('accountId') accountId: string, @CurrentUser() currentUser: RequestUser): Promise<GlAccountType> {
    return this.accountingService.getGlAccount(accountId, currentUser.organizationId);
  }

  @Post('gl-accounts')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.gl_account.create')
  async createGlAccount(@Body() payload: CreateGlAccountDto, @CurrentUser() currentUser: RequestUser): Promise<GlAccountType> {
    return this.accountingService.createGlAccount(payload, currentUser.organizationId);
  }

  @Patch('gl-accounts/:accountId')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.gl_account.update')
  async updateGlAccount(
    @Param('accountId') accountId: string,
    @Body() payload: UpdateGlAccountDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<GlAccountType> {
    return this.accountingService.updateGlAccount(accountId, payload, currentUser.organizationId);
  }

  @Delete('gl-accounts/:accountId')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.gl_account.delete')
  async removeGlAccount(@Param('accountId') accountId: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.accountingService.removeGlAccount(accountId, currentUser.organizationId);
  }

  // ─── Posting / Reversal ─────────────────────────────────────────────

  @Post('journal-entries/:entryId/post')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal_entry.post')
  async postJournalEntry(@Param('entryId') entryId: string, @CurrentUser() currentUser: RequestUser): Promise<JournalEntryType> {
    return this.accountingService.postJournalEntry(entryId, currentUser.organizationId);
  }

  @Post('journal-entries/:entryId/reverse')
  @Roles('admin', 'super_admin')
  @AuditAction('accounting.journal_entry.reverse')
  async reverseJournalEntry(@Param('entryId') entryId: string, @CurrentUser() currentUser: RequestUser): Promise<JournalEntryType> {
    return this.accountingService.reverseJournalEntry(entryId, currentUser.organizationId, currentUser.sub);
  }

  // ─── Reports ────────────────────────────────────────────────────────

  @Get('reports/trial-balance')
  @Roles('admin', 'super_admin', 'auditor')
  async getTrialBalance(
    @Query('asOfDate') asOfDate: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.accountingService.getTrialBalance(currentUser.organizationId, asOfDate ?? new Date().toISOString().slice(0, 10));
  }

  @Get('reports/balance-sheet')
  @Roles('admin', 'super_admin', 'auditor')
  async getBalanceSheet(
    @Query('asOfDate') asOfDate: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.accountingService.getBalanceSheet(currentUser.organizationId, asOfDate ?? new Date().toISOString().slice(0, 10));
  }

  @Get('reports/income-statement')
  @Roles('admin', 'super_admin', 'auditor')
  async getIncomeStatement(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const to = toDate ?? new Date().toISOString().slice(0, 10);
    const from = fromDate ?? new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 10);
    return this.accountingService.getIncomeStatement(currentUser.organizationId, from, to);
  }
}
