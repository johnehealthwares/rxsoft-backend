import { Repository } from 'typeorm';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { toGlAccountType, toJournalEntryLineType, toJournalEntryType, toJournalType } from '../../../shared/domain/mappers';
import { CreateGlAccountDto, CreateJournalDto, CreateJournalEntryDto, CreateJournalEntryLineDto, ListGlAccountsDto, ListJournalEntriesDto, ListJournalEntryLinesDto, ListJournalsDto, UpdateGlAccountDto, UpdateJournalDto, UpdateJournalEntryDto, UpdateJournalEntryLineDto } from '../dto/accounting.dto';
import { GlAccountOrmEntity, JournalEntryLineOrmEntity, JournalEntryOrmEntity, JournalOrmEntity } from '../entities';
export type GlAccountType = ReturnType<typeof toGlAccountType>;
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
    listGlAccounts(query: ListGlAccountsDto, organizationId: string): Promise<{
        data: GlAccountType[];
        total: number;
    }>;
    getGlAccount(id: string, organizationId: string): Promise<GlAccountType>;
    createGlAccount(payload: CreateGlAccountDto, organizationId: string): Promise<GlAccountType>;
    updateGlAccount(id: string, payload: UpdateGlAccountDto, organizationId: string): Promise<GlAccountType>;
    removeGlAccount(id: string, organizationId: string): Promise<void>;
    postJournalEntry(entryId: string, organizationId: string): Promise<JournalEntryType>;
    reverseJournalEntry(entryId: string, organizationId: string, userId: string): Promise<JournalEntryType>;
    getTrialBalance(organizationId: string, asOfDate: string): Promise<{
        asOfDate: string;
        data: {
            accountCode: any;
            accountName: any;
            accountType: any;
            debitBalance: number;
            creditBalance: number;
        }[];
        totals: {
            debitTotal: number;
            creditTotal: number;
        };
    }>;
    getBalanceSheet(organizationId: string, asOfDate: string): Promise<{
        asOfDate: string;
        assets: {
            accounts: {
                accountCode: any;
                accountName: any;
                accountType: any;
                debitBalance: number;
                creditBalance: number;
            }[];
            total: number;
        };
        liabilities: {
            accounts: {
                accountCode: any;
                accountName: any;
                accountType: any;
                debitBalance: number;
                creditBalance: number;
            }[];
            total: number;
        };
        equity: {
            accounts: {
                accountCode: any;
                accountName: any;
                accountType: any;
                debitBalance: number;
                creditBalance: number;
            }[];
            total: number;
        };
        totalLiabilitiesAndEquity: number;
    }>;
    getIncomeStatement(organizationId: string, fromDate: string, toDate: string): Promise<{
        fromDate: string;
        toDate: string;
        revenue: {
            accounts: {
                accountCode: any;
                accountName: any;
                accountType: any;
                balance: number;
            }[];
            total: number;
        };
        cogs: {
            accounts: {
                accountCode: any;
                accountName: any;
                accountType: any;
                balance: number;
            }[];
            total: number;
        };
        grossProfit: number;
        operatingExpenses: {
            accounts: {
                accountCode: any;
                accountName: any;
                accountType: any;
                balance: number;
            }[];
            total: number;
        };
        netIncome: number;
    }>;
    private ensureAccount;
    private validateAmounts;
}
