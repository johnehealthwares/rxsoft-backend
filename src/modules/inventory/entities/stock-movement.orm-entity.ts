import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { StockLotOrmEntity } from './stock-lot.orm-entity';
import { StockLocationOrmEntity } from './stock-location.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('stock_movements')
@Index('idx_stock_movements_org', ['organizationId'])
@Index('idx_stock_movements_item', ['itemId'])
@Index('idx_stock_movements_doc', ['inventoryDocumentId'])
@Index('idx_stock_movements_occurred_at', ['occurredAt'])
export class StockMovementOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ name: 'inventory_document_id', type: 'text', nullable: true })
  inventoryDocumentId!: string | null;

  @Column({ name: 'inventory_document_line_id', type: 'text', nullable: true })
  inventoryDocumentLineId!: string | null;

  @ManyToOne(() => ItemOrmEntity, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item!: ItemOrmEntity;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId!: string;

  @ManyToOne(() => StockLotOrmEntity, { nullable: true })
  @JoinColumn({ name: 'lot_id' })
  lot!: StockLotOrmEntity | null;

  @Column({ name: 'lot_id', type: 'uuid', nullable: true })
  lotId!: string | null;

  @ManyToOne(() => StockLocationOrmEntity, { nullable: true })
  @JoinColumn({ name: 'from_location_id' })
  fromLocation!: StockLocationOrmEntity | null;

  @Column({ name: 'from_location_id', type: 'uuid', nullable: true })
  fromLocationId!: string | null;

  @ManyToOne(() => StockLocationOrmEntity, { nullable: true })
  @JoinColumn({ name: 'to_location_id' })
  toLocation!: StockLocationOrmEntity | null;

  @Column({ name: 'to_location_id', type: 'uuid', nullable: true })
  toLocationId!: string | null;

  @Column({ name: 'uom_id', type: 'uuid', nullable: true })
  uomId!: string | null;

  @Column({ name: 'movement_type', type: 'text' })
  movementType!: 'in' | 'out' | 'transfer' | 'adjustment' | 'base-conversion';

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  quantity!: number;

  @Column({ name: 'unit_cost', type: 'decimal', nullable: true, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  unitCost!: number | null;

  @CreateDateColumn({ name: 'occurred_at'/* timestamptzz */ })
  occurredAt!: Date;

  @Column({ name: 'created_by_user_id', type: 'text', nullable: true })
  createdByUserId!: string | null;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;
}
