import type { JournalEntryOrmEntity } from './journal-entry.orm-entity';
export declare class JournalOrmEntity {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    journalType: 'sale' | 'purchase' | 'cash' | 'bank' | 'general';
    defaultDebitAccountId: string | null;
    defaultCreditAccountId: string | null;
    isActive: boolean;
    entries: JournalEntryOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
