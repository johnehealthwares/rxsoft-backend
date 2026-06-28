import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderOrmEntity } from './order.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('website_order_items')
export class OrderItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => OrderOrmEntity, (order) => order.items, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: OrderOrmEntity;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId!: string;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ name: 'unit_price', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  unitPrice!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
