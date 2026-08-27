import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

export type PaymentLinkType = 'order_payment' | 'wallet_deposit';
export type PaymentLinkStatus = 'active' | 'used' | 'expired' | 'revoked';

@Entity('payment_links')
@Index('uq_payment_links_token', ['token'], { unique: true })
export class PaymentLinkOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ name: 'token', type: 'text' })
  token!: string;

  @Column({ type: 'text' })
  type!: PaymentLinkType;

  // order id for order_payment, customer/user id for wallet_deposit
  @Column({ name: 'target_id', type: 'uuid', nullable: true })
  targetId!: string | null;

  @Column({ name: 'user_id', type: 'text', nullable: true })
  userId!: string | null;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  amount!: number | null;

  @Column({ type: 'text', nullable: true })
  note!: string | null;

  @Column({ type: 'text', default: 'active' })
  status!: PaymentLinkStatus;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt!: Date | null;

  @Column({ name: 'created_by_user_id', type: 'text', nullable: true })
  createdByUserId!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
