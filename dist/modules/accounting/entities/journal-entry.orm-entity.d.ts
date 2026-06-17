import { JournalOrmEntity } from './journal.orm-entity';
import { JournalEntryLineOrmEntity } from './journal-entry-line.orm-entity';
export declare class JournalEntryOrmEntity {
    id: string;
    organizationId: string;
    journalId: string;
    journal: JournalOrmEntity;
    entryNumber: string;
    entryDate: string;
    reference: string | null;
    sourceType: string | null;
    sourceId: string | null;
    status: 'draft' | 'posted' | 'reversed';
    createdByUserId: string | null;
    postedAt: Date | null;
    lines: JournalEntryLineOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
