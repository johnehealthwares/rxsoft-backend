import { JournalEntryOrmEntity } from './journal-entry.orm-entity';
export declare class JournalEntryLineOrmEntity {
    id: string;
    journalEntryId: string;
    journalEntry: JournalEntryOrmEntity;
    lineNumber: number;
    glAccountId: string;
    partyId: string | null;
    itemId: string | null;
    debitAmount: number;
    creditAmount: number;
    description: string | null;
    createdAt: Date;
}
