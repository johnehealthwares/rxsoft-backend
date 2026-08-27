import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import type { JournalEntryOrmEntity } from './journal-entry.orm-entity';

@Entity('journals')
@Unique('uq_journals_code', ['code'])
export class JournalOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'journal_type', type: 'text' })
  journalType!: 'sale' | 'purchase' | 'cash' | 'bank' | 'general';

  @Column({ name: 'default_debit_account_id', type: 'uuid', nullable: true })
  defaultDebitAccountId!: string | null;

  @Column({ name: 'default_credit_account_id', type: 'uuid', nullable: true })
  defaultCreditAccountId!: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany('JournalEntryOrmEntity', 'journal')
  entries!: JournalEntryOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
