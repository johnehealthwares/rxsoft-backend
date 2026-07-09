import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { CreateGlAccountDto, CreateJournalDto, CreateJournalEntryDto, CreateJournalEntryLineDto, ListGlAccountsDto, ListJournalEntriesDto, ListJournalEntryLinesDto, ListJournalsDto, UpdateGlAccountDto, UpdateJournalDto, UpdateJournalEntryDto, UpdateJournalEntryLineDto } from '../dto/accounting.dto';
import { AccountingService, GlAccountType, JournalEntryLineType, JournalEntryType, JournalType } from '../services/accounting.service';
type GlAccountListResponse = {
    data: GlAccountType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
type JournalListResponse = {
    data: JournalType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
type JournalEntryListResponse = {
    data: JournalEntryType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
type JournalEntryLineListResponse = {
    data: JournalEntryLineType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class AccountingController {
    private readonly accountingService;
    constructor(accountingService: AccountingService);
    listJournals(query: ListJournalsDto, currentUser: RequestUser): Promise<JournalListResponse>;
    getJournal(journalId: string, currentUser: RequestUser): Promise<JournalType>;
    createJournal(payload: CreateJournalDto, currentUser: RequestUser): Promise<JournalType>;
    updateJournal(journalId: string, payload: UpdateJournalDto, currentUser: RequestUser): Promise<JournalType>;
    removeJournal(journalId: string, currentUser: RequestUser): Promise<void>;
    listJournalEntries(query: ListJournalEntriesDto, currentUser: RequestUser): Promise<JournalEntryListResponse>;
    getJournalEntry(entryId: string, currentUser: RequestUser): Promise<JournalEntryType>;
    createJournalEntry(payload: CreateJournalEntryDto, currentUser: RequestUser): Promise<JournalEntryType>;
    updateJournalEntry(entryId: string, payload: UpdateJournalEntryDto, currentUser: RequestUser): Promise<JournalEntryType>;
    removeJournalEntry(entryId: string, currentUser: RequestUser): Promise<void>;
    listJournalEntryLines(entryId: string, query: ListJournalEntryLinesDto, currentUser: RequestUser): Promise<JournalEntryLineListResponse>;
    createJournalEntryLine(entryId: string, payload: CreateJournalEntryLineDto, currentUser: RequestUser): Promise<JournalEntryLineType>;
    updateJournalEntryLine(entryId: string, lineId: string, payload: UpdateJournalEntryLineDto, currentUser: RequestUser): Promise<JournalEntryLineType>;
    removeJournalEntryLine(entryId: string, lineId: string, currentUser: RequestUser): Promise<void>;
    listGlAccounts(query: ListGlAccountsDto, currentUser: RequestUser): Promise<GlAccountListResponse>;
    getGlAccount(accountId: string, currentUser: RequestUser): Promise<GlAccountType>;
    createGlAccount(payload: CreateGlAccountDto, currentUser: RequestUser): Promise<GlAccountType>;
    updateGlAccount(accountId: string, payload: UpdateGlAccountDto, currentUser: RequestUser): Promise<GlAccountType>;
    removeGlAccount(accountId: string, currentUser: RequestUser): Promise<void>;
    postJournalEntry(entryId: string, currentUser: RequestUser): Promise<JournalEntryType>;
    reverseJournalEntry(entryId: string, currentUser: RequestUser): Promise<JournalEntryType>;
    getTrialBalance(asOfDate: string, currentUser: RequestUser): Promise<{
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
    getBalanceSheet(asOfDate: string, currentUser: RequestUser): Promise<{
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
    getIncomeStatement(fromDate: string, toDate: string, currentUser: RequestUser): Promise<{
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
}
export {};
