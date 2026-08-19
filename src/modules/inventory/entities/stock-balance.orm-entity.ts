import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { StockAdjustmentOrmEntity } from './stock-adjustment.orm-entity';
import { StockLocationOrmEntity } from './stock-location.orm-entity';
import { StockLotOrmEntity } from './stock-lot.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('stock_balances')
@Index('uq_stock_balances_org_location_item_lot', ['organizationId', 'location', 'item', 'lot'], {
  unique: true,
  where: 'lot_id IS NOT NULL',
})
@Index('uq_stock_balances_org_location_item_nolot', ['organizationId', 'location', 'item'], {
  unique: true,
  where: 'lot_id IS NULL',
})
export class StockBalanceOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @ManyToOne(() => ItemOrmEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'item_id' })
  item!: ItemOrmEntity;

  @ManyToOne(() => StockLocationOrmEntity, (location) => location.stockBalances, {
    nullable: false,
  })
  @JoinColumn({ name: 'location_id' })
  location!: StockLocationOrmEntity;

  @ManyToOne(() => StockLotOrmEntity, (lot) => lot.stockBalances, {
    nullable: true,
  })
  @JoinColumn({ name: 'lot_id' })
  lot!: StockLotOrmEntity | null;

  @Column({ name: 'quantity_on_hand', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  quantityOnHand!: number;

  @Column({ name: 'quantity_reserved', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  quantityReserved!: number;

  @Column({ name: 'average_cost', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  averageCost!: number;

  @Column({ name: 'reorder_min_qty', type: 'decimal', nullable: true, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  reorderMinQty!: number | null;

  @Column({ name: 'reorder_max_qty', type: 'decimal', nullable: true, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  reorderMaxQty!: number | null;

  @OneToMany(() => StockAdjustmentOrmEntity, (adjustment) => adjustment.stockBalance)
  adjustments!: StockAdjustmentOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
