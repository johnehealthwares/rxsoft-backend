import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { JournalEntryOrmEntity } from './journal-entry.orm-entity';

@Entity('journal_entry_lines')
@Unique('uq_journal_entry_lines_number', ['journalEntryId', 'lineNumber'])
export class JournalEntryLineOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'journal_entry_id', type: 'uuid' })
  journalEntryId!: string;

  @ManyToOne(() => JournalEntryOrmEntity, (journalEntry) => journalEntry.lines, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'journal_entry_id' })
  journalEntry!: JournalEntryOrmEntity;

  @Column({ name: 'line_number', type: 'int' })
  lineNumber!: number;

  @Column({ name: 'gl_account_id', type: 'uuid' })
  glAccountId!: string;

  @Column({ name: 'party_id', type: 'uuid', nullable: true })
  partyId!: string | null;

  @Column({ name: 'item_id', type: 'uuid', nullable: true })
  itemId!: string | null;

  @Column({ name: 'debit_amount', type: 'numeric', precision: 14, scale: 2, default: 0 })
  debitAmount!: number;

  @Column({ name: 'credit_amount', type: 'numeric', precision: 14, scale: 2, default: 0 })
  creditAmount!: number;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
