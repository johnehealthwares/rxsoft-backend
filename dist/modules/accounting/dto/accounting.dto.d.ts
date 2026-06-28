import { ListQueryDto } from '../../../shared/dto/list-query.dto';
export declare class ListJournalsDto extends ListQueryDto {
}
export declare class ListJournalEntriesDto extends ListQueryDto {
}
export declare class ListJournalEntryLinesDto extends ListQueryDto {
}
export declare class CreateJournalDto {
    code: string;
    name: string;
    journalType: 'sale' | 'purchase' | 'cash' | 'bank' | 'general';
    defaultDebitAccountId?: string;
    defaultCreditAccountId?: string;
    isActive?: boolean;
    overrideCodeValidation?: boolean;
}
export declare class UpdateJournalDto {
    code?: string;
    name?: string;
    journalType?: 'sale' | 'purchase' | 'cash' | 'bank' | 'general';
    defaultDebitAccountId?: string | null;
    defaultCreditAccountId?: string | null;
    isActive?: boolean;
}
export declare class CreateJournalEntryLineDto {
    lineNumber: number;
    glAccountId: string;
    partyId?: string;
    itemId?: string;
    debitAmount?: number;
    creditAmount?: number;
    description?: string;
}
export declare class UpdateJournalEntryLineDto {
    lineNumber?: number;
    glAccountId?: string;
    partyId?: string | null;
    itemId?: string | null;
    debitAmount?: number;
    creditAmount?: number;
    description?: string | null;
}
export declare class CreateJournalEntryDto {
    journalId: string;
    entryNumber: string;
    entryDate: string;
    reference?: string;
    sourceType?: string;
    sourceId?: string;
    status?: 'draft' | 'posted' | 'reversed';
    lines?: CreateJournalEntryLineDto[];
}
export declare class UpdateJournalEntryDto {
    journalId?: string;
    entryNumber?: string;
    entryDate?: string;
    reference?: string | null;
    sourceType?: string | null;
    sourceId?: string | null;
    status?: 'draft' | 'posted' | 'reversed';
}
