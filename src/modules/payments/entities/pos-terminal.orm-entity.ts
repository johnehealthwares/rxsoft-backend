import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { PaymentProviderType } from './payment-provider.orm-entity';

@Entity('pos_terminals')
@Index('uq_pos_terminal_org_code', ['organizationId', 'code'], { unique: true })
export class PosTerminalOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ type: 'text' })
  code!: string;

  @Column({ name: 'label', type: 'text', nullable: true })
  label!: string | null;

  @Column({ name: 'provider_type', type: 'text' })
  providerType!: Exclude<PaymentProviderType, 'wallet' | 'cash' | 'insurance'>;

  @Column({ name: 'serial', type: 'text', nullable: true })
  serial!: string | null;

  @Column({ name: 'terminal_id', type: 'text', nullable: true })
  terminalId!: string | null;

  @Column({ name: 'store_id', type: 'text', nullable: true })
  storeId!: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'last_used_at', type: 'timestamptz', nullable: true })
  lastUsedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
