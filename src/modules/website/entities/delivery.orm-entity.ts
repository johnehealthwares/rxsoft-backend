import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { OrderOrmEntity } from './order.orm-entity';

@Entity('website_deliveries')
export class DeliveryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne('OrderOrmEntity', 'delivery', { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: OrderOrmEntity;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'text', nullable: true })
  city!: string | null;

  @Column({ type: 'text', nullable: true })
  state!: string | null;

  @Column({ type: 'text', nullable: true })
  phone!: string | null;

  @Column({ name: 'shipping_method', type: 'text', nullable: true })
  shippingMethod!: string | null;

  @Column({ name: 'tracking_number', type: 'text', nullable: true })
  trackingNumber!: string | null;

  @Column({ type: 'text', default: 'pending' })
  status!: 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'failed';

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ name: 'delivered_at', type: 'timestamptz', nullable: true })
  deliveredAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
