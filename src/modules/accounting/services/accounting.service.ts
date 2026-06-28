import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import {
  toJournalEntryLineType,
  toJournalEntryType,
  toJournalType,
} from '../../../shared/domain/mappers';
import {
  CreateJournalDto,
  CreateJournalEntryDto,
  CreateJournalEntryLineDto,
  ListJournalEntriesDto,
  ListJournalEntryLinesDto,
  ListJournalsDto,
  UpdateJournalDto,
  UpdateJournalEntryDto,
  UpdateJournalEntryLineDto,
} from '../dto/accounting.dto';
import { GlAccountOrmEntity, JournalEntryLineOrmEntity, JournalEntryOrmEntity, JournalOrmEntity } from '../entities';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

export type JournalType = ReturnType<typeof toJournalType>;
export type JournalEntryType = ReturnType<typeof toJournalEntryType>;
export type JournalEntryLineType = ReturnType<typeof toJournalEntryLineType>;

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(GlAccountOrmEntity)
    private readonly glAccountRepository: Repository<GlAccountOrmEntity>,
    @InjectRepository(JournalOrmEntity)
    private readonly journalRepository: Repository<JournalOrmEntity>,
    @InjectRepository(JournalEntryOrmEntity)
    private readonly journalEntryRepository: Repository<JournalEntryOrmEntity>,
    @InjectRepository(JournalEntryLineOrmEntity)
    private readonly journalEntryLineRepository: Repository<JournalEntryLineOrmEntity>,
  ) {}

  async listJournals(query: ListJournalsDto, organizationId: string): Promise<{ data: JournalType[]; total: number }> {
    const qb = this.journalRepository
      .createQueryBuilder('journal')
      .where('journal.organization_id = :organizationId', { organizationId })
      .orderBy('journal.updated_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(journal.code ILIKE :search OR journal.name ILIKE :search)', { search: `%${query.search}%` });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toJournalType), total };
  }

  async getJournal(id: string, organizationId: string): Promise<JournalType> {
    const journal = await this.journalRepository.findOne({ where: { id, organizationId } });
    if (!journal) throw new NotFoundException('Journal not found');
    return toJournalType(journal);
  }

  async createJournal(payload: CreateJournalDto, organizationId: string): Promise<JournalType> {
    const last = await this.journalRepository.findOne({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      select: ['code'],
    });
    const { valid, expectedCode } = validateSequentialCode({
      providedCode: payload.code,
      lastCode: last?.code,
      override: payload.overrideCodeValidation,
    });
    if (!valid) {
      throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }

    await this.ensureAccount(payload.defaultDebitAccountId, organizationId);
    await this.ensureAccount(payload.defaultCreditAccountId, organizationId);

    const duplicate = await this.journalRepository.findOne({ where: { organizationId, code: payload.code } });
    if (duplicate) throw new BadRequestException('Journal code already exists');

    const entity = this.journalRepository.create({
      organizationId,
      code: payload.code,
      name: payload.name,
      journalType: payload.journalType,
      defaultDebitAccountId: payload.defaultDebitAccountId ?? null,
      defaultCreditAccountId: payload.defaultCreditAccountId ?? null,
      isActive: payload.isActive ?? true,
    });
    const saved = await this.journalRepository.save(entity);
    return toJournalType(saved);
  }

  async updateJournal(id: string, payload: UpdateJournalDto, organizationId: string): Promise<JournalType> {
    const journal = await this.journalRepository.findOne({ where: { id, organizationId } });
    if (!journal) throw new NotFoundException('Journal not found');

    if (payload.code && payload.code !== journal.code) {
      const duplicate = await this.journalRepository.findOne({ where: { organizationId, code: payload.code } });
      if (duplicate) throw new BadRequestException('Journal code already exists');
      journal.code = payload.code;
    }

    await this.ensureAccount(payload.defaultDebitAccountId, organizationId);
    await this.ensureAccount(payload.defaultCreditAccountId, organizationId);

    if (payload.name !== undefined) journal.name = payload.name;
    if (payload.journalType !== undefined) journal.journalType = payload.journalType;
    if (payload.defaultDebitAccountId !== undefined) journal.defaultDebitAccountId = payload.defaultDebitAccountId;
    if (payload.defaultCreditAccountId !== undefined) journal.defaultCreditAccountId = payload.defaultCreditAccountId;
    if (payload.isActive !== undefined) journal.isActive = payload.isActive;

    const saved = await this.journalRepository.save(journal);
    return toJournalType(saved);
  }

  async removeJournal(id: string, organizationId: string): Promise<void> {
    const result = await this.journalRepository.delete({ id, organizationId });
    if (!result.affected) throw new NotFoundException('Journal not found');
  }

  async listJournalEntries(query: ListJournalEntriesDto, organizationId: string): Promise<{ data: JournalEntryType[]; total: number }> {
    const qb = this.journalEntryRepository
      .createQueryBuilder('entry')
      .leftJoinAndSelect('entry.lines', 'lines')
      .where('entry.organization_id = :organizationId', { organizationId })
      .orderBy('entry.updated_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(entry.entry_number ILIKE :search OR entry.reference ILIKE :search)', { search: `%${query.search}%` });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toJournalEntryType), total };
  }

  async getJournalEntry(id: string, organizationId: string): Promise<JournalEntryType> {
    const entry = await this.journalEntryRepository.findOne({
      where: { id, organizationId },
      relations: { lines: true },
    });
    if (!entry) throw new NotFoundException('Journal entry not found');
    return toJournalEntryType(entry);
  }

  async createJournalEntry(payload: CreateJournalEntryDto, currentUser: RequestUser): Promise<JournalEntryType> {
    const journal = await this.journalRepository.findOne({ where: { id: payload.journalId, organizationId: currentUser.organizationId } });
    if (!journal) throw new BadRequestException('Journal not found');

    const duplicate = await this.journalEntryRepository.findOne({
      where: { organizationId: currentUser.organizationId, entryNumber: payload.entryNumber },
    });
    if (duplicate) throw new BadRequestException('Journal entry number already exists');

    const entity = this.journalEntryRepository.create({
      organizationId: currentUser.organizationId,
      journalId: payload.journalId,
      entryNumber: payload.entryNumber,
      entryDate: payload.entryDate.slice(0, 10),
      reference: payload.reference ?? null,
      sourceType: payload.sourceType ?? null,
      sourceId: payload.sourceId ?? null,
      status: payload.status ?? 'draft',
      createdByUserId: currentUser.sub ?? null,
      postedAt: payload.status === 'posted' ? new Date() : null,
    });
    const saved = await this.journalEntryRepository.save(entity);
    if (payload.lines?.length) {
      await Promise.all(payload.lines.map((line) => this.createJournalEntryLine(saved.id, line, currentUser.organizationId)));
    }
    return this.getJournalEntry(saved.id, currentUser.organizationId);
  }

  async updateJournalEntry(id: string, payload: UpdateJournalEntryDto, currentUser: RequestUser): Promise<JournalEntryType> {
    const entry = await this.journalEntryRepository.findOne({ where: { id, organizationId: currentUser.organizationId } });
    if (!entry) throw new NotFoundException('Journal entry not found');

    if (payload.journalId !== undefined) {
      const journal = await this.journalRepository.findOne({ where: { id: payload.journalId, organizationId: currentUser.organizationId } });
      if (!journal) throw new BadRequestException('Journal not found');
      entry.journalId = payload.journalId;
    }

    if (payload.entryNumber && payload.entryNumber !== entry.entryNumber) {
      const duplicate = await this.journalEntryRepository.findOne({
        where: { organizationId: currentUser.organizationId, entryNumber: payload.entryNumber },
      });
      if (duplicate) throw new BadRequestException('Journal entry number already exists');
      entry.entryNumber = payload.entryNumber;
    }

    if (payload.entryDate !== undefined) entry.entryDate = payload.entryDate.slice(0, 10);
    if (payload.reference !== undefined) entry.reference = payload.reference;
    if (payload.sourceType !== undefined) entry.sourceType = payload.sourceType;
    if (payload.sourceId !== undefined) entry.sourceId = payload.sourceId;
    if (payload.status !== undefined) {
      entry.status = payload.status;
      entry.postedAt = payload.status === 'posted' ? new Date() : entry.postedAt;
    }

    await this.journalEntryRepository.save(entry);
    return this.getJournalEntry(id, currentUser.organizationId);
  }

  async removeJournalEntry(id: string, organizationId: string): Promise<void> {
    const result = await this.journalEntryRepository.delete({ id, organizationId });
    if (!result.affected) throw new NotFoundException('Journal entry not found');
  }

  async listJournalEntryLines(entryId: string, query: ListJournalEntryLinesDto, organizationId: string): Promise<{ data: JournalEntryLineType[]; total: number }> {
    await this.getJournalEntry(entryId, organizationId);
    const qb = this.journalEntryLineRepository
      .createQueryBuilder('line')
      .where('line.journal_entry_id = :entryId', { entryId })
      .orderBy('line.line_number', 'ASC')
      .skip(query.offset)
      .take(query.limit);

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toJournalEntryLineType), total };
  }

  async createJournalEntryLine(entryId: string, payload: CreateJournalEntryLineDto, organizationId: string): Promise<JournalEntryLineType> {
    await this.getJournalEntry(entryId, organizationId);
    await this.ensureAccount(payload.glAccountId, organizationId);
    this.validateAmounts(payload.debitAmount ?? 0, payload.creditAmount ?? 0);

    const entity = this.journalEntryLineRepository.create({
      journalEntryId: entryId,
      lineNumber: payload.lineNumber,
      glAccountId: payload.glAccountId,
      partyId: payload.partyId ?? null,
      itemId: payload.itemId ?? null,
      debitAmount: payload.debitAmount ?? 0,
      creditAmount: payload.creditAmount ?? 0,
      description: payload.description ?? null,
    });
    const saved = await this.journalEntryLineRepository.save(entity);
    return toJournalEntryLineType(saved);
  }

  async updateJournalEntryLine(entryId: string, lineId: string, payload: UpdateJournalEntryLineDto, organizationId: string): Promise<JournalEntryLineType> {
    await this.getJournalEntry(entryId, organizationId);
    const line = await this.journalEntryLineRepository.findOne({ where: { id: lineId, journalEntryId: entryId } });
    if (!line) throw new NotFoundException('Journal entry line not found');

    if (payload.glAccountId !== undefined) {
      await this.ensureAccount(payload.glAccountId, organizationId);
      line.glAccountId = payload.glAccountId;
    }
    if (payload.lineNumber !== undefined) line.lineNumber = payload.lineNumber;
    if (payload.partyId !== undefined) line.partyId = payload.partyId;
    if (payload.itemId !== undefined) line.itemId = payload.itemId;
    if (payload.debitAmount !== undefined) line.debitAmount = payload.debitAmount;
    if (payload.creditAmount !== undefined) line.creditAmount = payload.creditAmount;
    if (payload.description !== undefined) line.description = payload.description;
    this.validateAmounts(Number(line.debitAmount), Number(line.creditAmount));

    const saved = await this.journalEntryLineRepository.save(line);
    return toJournalEntryLineType(saved);
  }

  async removeJournalEntryLine(entryId: string, lineId: string, organizationId: string): Promise<void> {
    await this.getJournalEntry(entryId, organizationId);
    const result = await this.journalEntryLineRepository.delete({ id: lineId, journalEntryId: entryId });
    if (!result.affected) throw new NotFoundException('Journal entry line not found');
  }

  private async ensureAccount(accountId: string | null | undefined, organizationId: string): Promise<void> {
    if (!accountId) return;
    const account = await this.glAccountRepository.findOne({ where: { id: accountId, organizationId } });
    if (!account) throw new BadRequestException('GL account not found');
  }

  private validateAmounts(debitAmount: number, creditAmount: number): void {
    const debit = Number(debitAmount);
    const credit = Number(creditAmount);
    if ((debit > 0 && credit > 0) || (debit <= 0 && credit <= 0)) {
      throw new BadRequestException('Each journal entry line must have either a debit or a credit amount');
    }
  }
}
