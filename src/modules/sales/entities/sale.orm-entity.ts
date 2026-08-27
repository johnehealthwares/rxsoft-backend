import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SaleLineOrmEntity } from './sale-line.orm-entity';
import { SalePaymentOrmEntity } from './sale-payment.orm-entity';
import { SaleRefundOrmEntity } from './sale-refund.orm-entity';
import { PartyOrmEntity } from '../../customers/entities/party.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';
import { DEFAULT_SYSTEM_USER_ID } from 'src/shared/constants/persistence-scope';

@Entity('sales')
// Transaction header for a posted POS/invoice/mobile sale.
export class SaleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ name: 'sale_number', type: 'text' })
  saleNumber!: string;

  @Column({ name: 'sale_channel', type: 'text' })
  saleChannel!: 'pos' | 'invoice' | 'mobile' | 'website';

  @Column({ name: 'store_id', type: 'text' })
  storeId!: string;

  @ManyToOne(() => PartyOrmEntity, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer!: PartyOrmEntity | null;

  @Column({ name: 'customer_id', type: 'text', nullable: true })
  customerId!: string | null;

  @Column({ type: 'text' })
  status!: 'draft' | 'posted' | 'voided' | 'refunded';

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ name: 'stock_location_id', type: 'uuid', nullable: true })
  stockLocationId!: string | null;

  @Column({ name: 'subtotal_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  subtotalAmount!: number;

  @Column({ name: 'discount_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  discountAmount!: number;

  @Column({ name: 'tax_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  taxAmount!: number;

  @Column({ name: 'total_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  totalAmount!: number;

  @Column({ name: 'paid_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  paidAmount!: number;

  @Column({ name: 'change_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  changeAmount!: number;

  @CreateDateColumn({ name: 'sale_date'/* timestamptzz */ })
  saleDate!: Date;

  @Column({ name: 'sold_by_user_id', type: 'text' })
  soldByUserId!: string;

  @Column({ name: 'created_by_user_id', type: 'text', default: DEFAULT_SYSTEM_USER_ID })
  createdBy!: string;

  @OneToMany(() => SaleLineOrmEntity, (line) => line.sale)
  lines!: SaleLineOrmEntity[];

  @OneToMany(() => SalePaymentOrmEntity, (payment) => payment.sale)
  payments!: SalePaymentOrmEntity[];

  @OneToMany(() => SaleRefundOrmEntity, (refund) => refund.sale)
  refunds!: SaleRefundOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
