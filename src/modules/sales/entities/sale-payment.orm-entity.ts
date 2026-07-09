import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentMethodOrmEntity } from './payment-method.orm-entity';
import type { SaleOrmEntity } from './sale.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('sale_payments')
// Captures each payment instrument used to settle a sale.
export class SalePaymentOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne('SaleOrmEntity', 'payments', { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale!: SaleOrmEntity;

  @ManyToOne(() => PaymentMethodOrmEntity, { nullable: false })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod!: PaymentMethodOrmEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  amount!: number;

  @Column({ name: 'payment_reference', type: 'text', nullable: true })
  paymentReference!: string | null;

  @CreateDateColumn({ name: 'paid_at'/* timestamptzz */ })
  paidAt!: Date;

  @Column({ name: 'received_by_user_id', type: 'text', nullable: true })
  receivedByUserId!: string | null;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
