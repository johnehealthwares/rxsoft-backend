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
import { PaymentProviderOrmEntity } from './payment-provider.orm-entity';
import type {
  PaymentProviderChannel,
  PaymentProviderType,
} from './payment-provider.orm-entity';

export type PaymentTransactionStatus =
  | 'initiated'
  | 'pending'
  | 'success'
  | 'failed'
  | 'cancelled'
  | 'partial'
  | 'reversed'
  | 'expired'
  | 'settled'
  | 'unknown';

export type PaymentTransactionSourceType =
  'sale' | 'order' | 'receivable' | 'wallet_deposit';

@Entity('payment_transactions')
@Index('uq_payment_transactions_reference', ['reference'], { unique: true })
export class PaymentTransactionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @ManyToOne(() => PaymentProviderOrmEntity, { nullable: false })
  @JoinColumn({ name: 'payment_provider_id' })
  paymentProvider!: PaymentProviderOrmEntity;

  @Column({ name: 'payment_provider_id', type: 'uuid' })
  paymentProviderId!: string;

  @Column({ name: 'provider_type', type: 'text' })
  providerType!: PaymentProviderType;

  @Column({ type: 'text' })
  reference!: string;

  @Column({ name: 'provider_reference', type: 'text', nullable: true })
  providerReference!: string | null;

  @Column({ type: 'text', default: 'initiated' })
  status!: PaymentTransactionStatus;

  @Column({ type: 'text' })
  channel!: PaymentProviderChannel;

  @Column({ name: 'payment_method_id', type: 'uuid', nullable: true })
  paymentMethodId!: string | null;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  amount!: number;

  @Column({
    name: 'amount_paid',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  amountPaid!: number;

  @Column({ type: 'text', default: 'NGN' })
  currency!: string;

  @Column({ name: 'source_type', type: 'text', nullable: true })
  sourceType!: PaymentTransactionSourceType | null;

  @Column({ name: 'source_id', type: 'uuid', nullable: true })
  sourceId!: string | null;

  @Column({ name: 'customer_id', type: 'uuid', nullable: true })
  customerId!: string | null;

  @Column({ name: 'user_id', type: 'text', nullable: true })
  userId!: string | null;

  @Column({ name: 'terminal_id', type: 'uuid', nullable: true })
  terminalId!: string | null;

  @Column({ name: 'checkout_url', type: 'text', nullable: true })
  checkoutUrl!: string | null;

  @Column({ name: 'raw', type: 'simple-json', nullable: true })
  raw!: Record<string, unknown> | null;

  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true })
  paidAt!: Date | null;

  @Column({ name: 'settled_at', type: 'timestamptz', nullable: true })
  settledAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
