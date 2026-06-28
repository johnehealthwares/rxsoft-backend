import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderItemOrmEntity } from './order-item.orm-entity';
import { DeliveryOrmEntity } from './delivery.orm-entity';
import { SaleOrmEntity } from '../../sales/entities/sale.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('website_orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'order_number', type: 'text' })
  orderNumber!: string;

  @Column({ name: 'customer_id', type: 'uuid', nullable: true })
  customerId!: string | null;

  @Column({ name: 'payment_method', type: 'text' })
  paymentMethod!: string;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ name: 'order_status', type: 'text', default: 'pending' })
  orderStatus!: 'pending' | 'confirmed' | 'processing' | 'dispatched' | 'in_transit' | 'delivered' | 'cancelled';

  @Column({ name: 'sale_id', type: 'uuid', nullable: true })
  saleId!: string | null;

  @ManyToOne(() => SaleOrmEntity, { nullable: true })
  @JoinColumn({ name: 'sale_id' })
  sale!: SaleOrmEntity | null;

  @Column({ name: 'created_by', type: 'text', nullable: true })
  createdBy!: string | null;

  @Column({ name: 'subtotal_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  subtotalAmount!: number;

  @Column({ name: 'total_amount', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  totalAmount!: number;

  @OneToMany(() => OrderItemOrmEntity, (item) => item.order)
  items!: OrderItemOrmEntity[];

  @OneToOne(() => DeliveryOrmEntity, (delivery) => delivery.order)
  delivery!: DeliveryOrmEntity | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
