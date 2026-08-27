import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { SaleOrmEntity } from './sale.orm-entity';
import { PartyOrmEntity } from '../../customers/entities/party.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('accounts_receivable')
@Unique('uq_accounts_receivable_org_number', ['organizationId', 'receivableNumber'])
// Receivable opened when a posted sale is underpaid.
export class AccountReceivableOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @ManyToOne(() => PartyOrmEntity, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer!: PartyOrmEntity;

  @Column({ name: 'customer_id', type: 'text' })
  customerId!: string;

  @ManyToOne(() => SaleOrmEntity, { nullable: false })
  @JoinColumn({ name: 'sale_id' })
  sale!: SaleOrmEntity;

  @Column({ name: 'sale_id', type: 'text' })
  saleId!: string;

  @Column({ name: 'receivable_number', type: 'text' })
  receivableNumber!: string;

  @Column({ name: 'original_amount', type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  originalAmount!: number;

  @Column({ name: 'outstanding_amount', type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  outstandingAmount!: number;

  @Column({ type: 'text' })
  status!: 'open' | 'partially_paid' | 'closed' | 'written_off';

  @CreateDateColumn({ name: 'opened_at'/* timestamptzz */ })
  openedAt!: Date;

  @CreateDateColumn({ name: 'closed_at'/* timestamptzz */, nullable: true })
  closedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
