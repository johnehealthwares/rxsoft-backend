import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserOrmEntity } from '../../identity/entities/user.orm-entity';
import { SaleOrmEntity } from './sale.orm-entity';
import { SaleRefundLineOrmEntity } from './sale-refund-line.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('sale_refunds')
@Unique('uq_sale_refunds_org_number', ['organizationId', 'refundNumber'])
// Header for a sale refund transaction.
export class SaleRefundOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @ManyToOne(() => SaleOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale!: SaleOrmEntity;

  @Column({ name: 'refund_number', type: 'text' })
  refundNumber!: string;

  @Column({ type: 'text' })
  status!: 'posted' | 'voided';

  @Column({ name: 'total_amount', type: 'float', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  totalAmount!: number;

  @CreateDateColumn({ name: 'refund_date'/* timestamptzz */ })
  refundDate!: Date;

  @Column({ type: 'text', nullable: true })
  reason!: string | null;

  @ManyToOne(() => UserOrmEntity, { nullable: false })
  @JoinColumn({ name: 'refunded_by_user_id' })
  refundedByUser!: UserOrmEntity;

  @OneToMany(() => SaleRefundLineOrmEntity, (line) => line.refund)
  lines!: SaleRefundLineOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
