import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { GoodsReceiptOrmEntity } from './goods-receipt.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('goods_receipt_lines')
export class GoodsReceiptLineOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => GoodsReceiptOrmEntity, (gr) => gr.lines, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'goods_receipt_id' })
  goodsReceipt!: GoodsReceiptOrmEntity;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId!: string;

  @Column({ name: 'ordered_qty', type: 'decimal', precision: 14, scale: 3, transformer: new ColumnNumericTransformer() })
  orderedQty!: number;

  @Column({ name: 'received_qty', type: 'decimal', precision: 14, scale: 3, transformer: new ColumnNumericTransformer() })
  receivedQty!: number;

  @Column({ name: 'uom_id', type: 'uuid' })
  uomId!: string;

  @Column({ name: 'unit_cost', type: 'decimal', precision: 14, scale: 4, transformer: new ColumnNumericTransformer() })
  unitCost!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
