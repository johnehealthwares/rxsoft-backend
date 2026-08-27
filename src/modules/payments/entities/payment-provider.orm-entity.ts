import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type PaymentProviderType =
  | 'paystack'
  | 'monnify'
  | 'opay'
  | 'moniepoint'
  | 'wallet'
  | 'insurance'
  | 'cash';

export type PaymentProviderChannel =
  'cash' | 'pos' | 'web' | 'wallet' | 'insurance';

export type ProviderCredentialSet = {
  publicKey?: string;
  secretKey?: string;
  apiKey?: string;
  apiSecret?: string;
  contractCode?: string;
  clientSecret?: string;
  merchantId?: string;
  terminalId?: string;
  webhookSecret?: string;
  baseUrl?: string;
  sandboxBaseUrl?: string;
};

@Entity('payment_providers')
@Index('uq_payment_providers_code', ['code'], { unique: true })
export class PaymentProviderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'provider_type', type: 'text' })
  providerType!: PaymentProviderType;

  @Column({ type: 'text' })
  channel!: PaymentProviderChannel;

  @Column({ name: 'description', type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'production', type: 'boolean', default: false })
  production!: boolean;

  @Column({ name: 'test_config', type: 'simple-json', nullable: true })
  testConfig!: ProviderCredentialSet | null;

  @Column({ name: 'live_config', type: 'simple-json', nullable: true })
  liveConfig!: ProviderCredentialSet | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
