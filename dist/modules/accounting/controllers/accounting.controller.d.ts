import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { CreateJournalDto, CreateJournalEntryDto, CreateJournalEntryLineDto, ListJournalEntriesDto, ListJournalEntryLinesDto, ListJournalsDto, UpdateJournalDto, UpdateJournalEntryDto, UpdateJournalEntryLineDto } from '../dto/accounting.dto';
import { AccountingService, JournalEntryLineType, JournalEntryType, JournalType } from '../services/accounting.service';
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
}
export {};
