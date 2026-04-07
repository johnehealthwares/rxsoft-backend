import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('gl_accounts')
@Unique('uq_gl_accounts_org_code', ['organizationId', 'accountCode'])
export class GlAccountOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ name: 'account_code', type: 'text' })
  accountCode!: string;

  @Column({ name: 'account_name', type: 'text' })
  accountName!: string;

  @Column({ name: 'account_type', type: 'text' })
  accountType!: 'asset' | 'liability' | 'equity' | 'income' | 'expense';

  @Column({ name: 'allows_reconciliation', type: 'boolean', default: false })
  allowsReconciliation!: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
