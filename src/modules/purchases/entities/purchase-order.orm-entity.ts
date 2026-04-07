import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { PurchaseOrderLineOrmEntity } from './purchase-order-line.orm-entity';

@Entity('purchase_orders')
@Unique('uq_purchase_orders_org_number', ['organizationId', 'purchaseOrderNumber'])
export class PurchaseOrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ name: 'purchase_order_number', type: 'text' })
  purchaseOrderNumber!: string;

  @Column({ name: 'supplier_id', type: 'uuid' })
  supplierId!: string;

  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId!: string;

  @Column({ name: 'currency_code', type: 'text', default: 'USD' })
  currencyCode!: string;

  @Column({ name: 'order_date', type: 'date' })
  orderDate!: string;

  @Column({ name: 'expected_date', type: 'date', nullable: true })
  expectedDate!: string | null;

  @Column({ name: 'status', type: 'text' })
  status!: 'draft' | 'approved' | 'partially_received' | 'received' | 'cancelled';

  @Column({ name: 'subtotal_amount', type: 'numeric', precision: 14, scale: 2, default: 0 })
  subtotalAmount!: number;

  @Column({ name: 'tax_amount', type: 'numeric', precision: 14, scale: 2, default: 0 })
  taxAmount!: number;

  @Column({ name: 'total_amount', type: 'numeric', precision: 14, scale: 2, default: 0 })
  totalAmount!: number;

  @Column({ name: 'created_by_user_id', type: 'uuid', nullable: true })
  createdByUserId!: string | null;

  @Column({ name: 'approved_by_user_id', type: 'uuid', nullable: true })
  approvedByUserId!: string | null;

  @CreateDateColumn({ name: 'approved_at'/* timestamptzz */, nullable: true })
  approvedAt!: Date | null;

  @Column({ name: 'note', type: 'text', nullable: true })
  note!: string | null;

  @OneToMany(() => PurchaseOrderLineOrmEntity, (line) => line.purchaseOrder)
  lines!: PurchaseOrderLineOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
