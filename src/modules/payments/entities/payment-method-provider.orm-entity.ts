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
import { PaymentProviderOrmEntity } from './payment-provider.orm-entity';
import type { PaymentProviderChannel } from './payment-provider.orm-entity';

@Entity('payment_method_providers')
@Index(
  'uq_payment_method_provider_method_provider',
  ['paymentMethodId', 'paymentProviderId'],
  { unique: true },
)
export class PaymentMethodProviderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'payment_method_id', type: 'uuid' })
  paymentMethodId!: string;

  @ManyToOne(() => PaymentProviderOrmEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_provider_id' })
  paymentProvider!: PaymentProviderOrmEntity;

  @Column({ name: 'payment_provider_id', type: 'uuid' })
  paymentProviderId!: string;

  @Column({ type: 'text' })
  channel!: PaymentProviderChannel;

  @Column({ name: 'is_default', type: 'boolean', default: false })
  isDefault!: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
