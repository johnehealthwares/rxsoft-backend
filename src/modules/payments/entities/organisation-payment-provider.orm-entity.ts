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

@Entity('organisation_payment_providers')
@Index(
  'uq_org_payment_provider_org_provider',
  ['organizationId', 'paymentProviderId'],
  { unique: true },
)
export class OrganisationPaymentProviderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @ManyToOne(() => PaymentProviderOrmEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_provider_id' })
  paymentProvider!: PaymentProviderOrmEntity;

  @Column({ name: 'payment_provider_id', type: 'uuid' })
  paymentProviderId!: string;

  // true = explicit whitelist, false = explicit blacklist. Absence of a row = not decided (default).
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'is_default', type: 'boolean', default: false })
  isDefault!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
