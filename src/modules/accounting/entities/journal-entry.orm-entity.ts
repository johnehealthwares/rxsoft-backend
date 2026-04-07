import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { JournalOrmEntity } from './journal.orm-entity';
import { JournalEntryLineOrmEntity } from './journal-entry-line.orm-entity';

@Entity('journal_entries')
@Unique('uq_journal_entries_org_number', ['organizationId', 'entryNumber'])
export class JournalEntryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ name: 'journal_id', type: 'uuid' })
  journalId!: string;

  @ManyToOne(() => JournalOrmEntity, (journal) => journal.entries, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'journal_id' })
  journal!: JournalOrmEntity;

  @Column({ name: 'entry_number', type: 'text' })
  entryNumber!: string;

  @Column({ name: 'entry_date', type: 'date' })
  entryDate!: string;

  @Column({ type: 'text', nullable: true })
  reference!: string | null;

  @Column({ name: 'source_type', type: 'text', nullable: true })
  sourceType!: string | null;

  @Column({ name: 'source_id', type: 'uuid', nullable: true })
  sourceId!: string | null;

  @Column({ type: 'text' })
  status!: 'draft' | 'posted' | 'reversed';

  @Column({ name: 'created_by_user_id', type: 'uuid', nullable: true })
  createdByUserId!: string | null;

  @Column({ name: 'posted_at', type: 'timestamptz', nullable: true })
  postedAt!: Date | null;

  @OneToMany(() => JournalEntryLineOrmEntity, (line) => line.journalEntry)
  lines!: JournalEntryLineOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
