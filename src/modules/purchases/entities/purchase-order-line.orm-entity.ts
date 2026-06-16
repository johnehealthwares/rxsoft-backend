import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { PurchaseOrderOrmEntity } from './purchase-order.orm-entity';
import { UomOrmEntity } from '../../sales/entities/uom.orm-entity';

@Entity('purchase_order_lines')
export class PurchaseOrderLineOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => PurchaseOrderOrmEntity, (purchaseOrder) => purchaseOrder.lines, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder!: PurchaseOrderOrmEntity;

  @ManyToOne(() => ItemOrmEntity, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item!: ItemOrmEntity;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId!: string;

  @Column({ name: 'ordered_qty', type: 'numeric', precision: 14, scale: 3 })
  orderedQty!: number;

  @Column({ name: 'received_qty', type: 'numeric', precision: 14, scale: 3, default: 0 })
  receivedQty!: number;

  @ManyToOne(() => UomOrmEntity, { nullable: false })
  @JoinColumn({ name: 'uom_id' })
  uom!: UomOrmEntity;

  @Column({ name: 'uom_id', type: 'uuid' })
  uomId!: string;

  @Column({ name: 'unit_cost', type: 'numeric', precision: 14, scale: 4 })
  unitCost!: number;

  @Column({ name: 'discount_percent', type: 'numeric', precision: 8, scale: 4, default: 0 })
  discountPercent!: number;

  @Column({ name: 'tax_percent', type: 'numeric', precision: 8, scale: 4, default: 0 })
  taxPercent!: number;

  @Column({ name: 'line_subtotal', type: 'numeric', precision: 14, scale: 2, default: 0 })
  lineSubtotal!: number;

  @Column({ name: 'line_total', type: 'numeric', precision: 14, scale: 2, default: 0 })
  lineTotal!: number;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
