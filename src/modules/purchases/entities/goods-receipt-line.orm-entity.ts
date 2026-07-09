import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { GoodsReceiptOrmEntity } from './goods-receipt.orm-entity';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { UomOrmEntity } from '../../sales/entities/uom.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('goods_receipt_lines')
export class GoodsReceiptLineOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne('GoodsReceiptOrmEntity', 'lines', { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'goods_receipt_id' })
  goodsReceipt!: GoodsReceiptOrmEntity;

  @ManyToOne(() => ItemOrmEntity, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item!: ItemOrmEntity;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId!: string;

  @Column({ name: 'ordered_qty', type: 'decimal', precision: 14, scale: 3, transformer: new ColumnNumericTransformer() })
  orderedQty!: number;

  @Column({ name: 'received_qty', type: 'decimal', precision: 14, scale: 3, transformer: new ColumnNumericTransformer() })
  receivedQty!: number;

  @ManyToOne(() => UomOrmEntity, { nullable: false })
  @JoinColumn({ name: 'uom_id' })
  uom!: UomOrmEntity;

  @Column({ name: 'uom_id', type: 'uuid' })
  uomId!: string;

  @Column({ name: 'unit_cost', type: 'decimal', precision: 14, scale: 4, transformer: new ColumnNumericTransformer() })
  unitCost!: number;

  @Column({ name: 'is_unposted', type: 'boolean', default: false })
  isUnposted!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
