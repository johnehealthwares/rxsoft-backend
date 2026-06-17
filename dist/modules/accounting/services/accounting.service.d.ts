import { Repository } from 'typeorm';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { toJournalEntryLineType, toJournalEntryType, toJournalType } from '../../../shared/domain/mappers';
import { CreateJournalDto, CreateJournalEntryDto, CreateJournalEntryLineDto, ListJournalEntriesDto, ListJournalEntryLinesDto, ListJournalsDto, UpdateJournalDto, UpdateJournalEntryDto, UpdateJournalEntryLineDto } from '../dto/accounting.dto';
import { GlAccountOrmEntity, JournalEntryLineOrmEntity, JournalEntryOrmEntity, JournalOrmEntity } from '../entities';
export type JournalType = ReturnType<typeof toJournalType>;
export type JournalEntryType = ReturnType<typeof toJournalEntryType>;
export type JournalEntryLineType = ReturnType<typeof toJournalEntryLineType>;
export declare class AccountingService {
    private readonly glAccountRepository;
    private readonly journalRepository;
    private readonly journalEntryRepository;
    private readonly journalEntryLineRepository;
    constructor(glAccountRepository: Repository<GlAccountOrmEntity>, journalRepository: Repository<JournalOrmEntity>, journalEntryRepository: Repository<JournalEntryOrmEntity>, journalEntryLineRepository: Repository<JournalEntryLineOrmEntity>);
    listJournals(query: ListJournalsDto, organizationId: string): Promise<{
        data: JournalType[];
        total: number;
    }>;
    getJournal(id: string, organizationId: string): Promise<JournalType>;
    createJournal(payload: CreateJournalDto, organizationId: string): Promise<JournalType>;
    updateJournal(id: string, payload: UpdateJournalDto, organizationId: string): Promise<JournalType>;
    removeJournal(id: string, organizationId: string): Promise<void>;
    listJournalEntries(query: ListJournalEntriesDto, organizationId: string): Promise<{
        data: JournalEntryType[];
        total: number;
    }>;
    getJournalEntry(id: string, organizationId: string): Promise<JournalEntryType>;
    createJournalEntry(payload: CreateJournalEntryDto, currentUser: RequestUser): Promise<JournalEntryType>;
    updateJournalEntry(id: string, payload: UpdateJournalEntryDto, currentUser: RequestUser): Promise<JournalEntryType>;
    removeJournalEntry(id: string, organizationId: string): Promise<void>;
    listJournalEntryLines(entryId: string, query: ListJournalEntryLinesDto, organizationId: string): Promise<{
        data: JournalEntryLineType[];
        total: number;
    }>;
    createJournalEntryLine(entryId: string, payload: CreateJournalEntryLineDto, organizationId: string): Promise<JournalEntryLineType>;
    updateJournalEntryLine(entryId: string, lineId: string, payload: UpdateJournalEntryLineDto, organizationId: string): Promise<JournalEntryLineType>;
    removeJournalEntryLine(entryId: string, lineId: string, organizationId: string): Promise<void>;
    private ensureAccount;
    private validateAmounts;
}
