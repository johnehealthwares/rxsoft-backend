import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { GoodsReceiptLineOrmEntity } from './goods-receipt-line.orm-entity';
import { PurchaseOrderOrmEntity } from './purchase-order.orm-entity';

@Entity('goods_receipts')
export class GoodsReceiptOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ name: 'receipt_number', type: 'text' })
  receiptNumber!: string;

  @ManyToOne(() => PurchaseOrderOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder!: PurchaseOrderOrmEntity;

  @Column({ name: 'received_date', type: 'timestamp' })
  receivedDate!: Date;

  @Column({ name: 'created_by_user_id', type: 'text' })
  createdByUserId!: string;

  @Column({ type: 'text', nullable: true })
  note!: string | null;

  @OneToMany(() => GoodsReceiptLineOrmEntity, (line) => line.goodsReceipt)
  lines!: GoodsReceiptLineOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
