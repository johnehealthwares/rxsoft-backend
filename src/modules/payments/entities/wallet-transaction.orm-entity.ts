import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';
import { CustomerWalletOrmEntity } from './customer-wallet.orm-entity';

export type WalletTransactionType =
  'deposit' | 'payment' | 'withdrawal' | 'refund';

@Entity('wallet_transactions')
export class WalletTransactionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @ManyToOne(() => CustomerWalletOrmEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'wallet_id' })
  wallet!: CustomerWalletOrmEntity;

  @Column({ name: 'wallet_id', type: 'uuid' })
  walletId!: string;

  @Column({ type: 'text' })
  type!: WalletTransactionType;

  @Column({
    type: 'decimal',
    precision: 14,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount!: number;

  @Column({
    name: 'balance_after',
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  balanceAfter!: number;

  @Column({ type: 'text', nullable: true })
  reference!: string | null;

  @Column({ name: 'payment_reference', type: 'text', nullable: true })
  paymentReference!: string | null;

  @Column({ name: 'source_type', type: 'text', nullable: true })
  sourceType!: string | null;

  @Column({ name: 'source_id', type: 'uuid', nullable: true })
  sourceId!: string | null;

  @Column({ type: 'text', nullable: true })
  note!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
