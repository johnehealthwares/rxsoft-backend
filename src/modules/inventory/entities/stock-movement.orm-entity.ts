import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('stock_movements')
export class StockMovementOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ name: 'inventory_document_id', type: 'text', nullable: true })
  inventoryDocumentId!: string | null;

  @Column({ name: 'inventory_document_line_id', type: 'text', nullable: true })
  inventoryDocumentLineId!: string | null;

  @Column({ name: 'product_id', type: 'text' })
  productId!: string;

  @Column({ name: 'lot_id', type: 'text', nullable: true })
  lotId!: string | null;

  @Column({ name: 'from_location_id', type: 'text', nullable: true })
  fromLocationId!: string | null;

  @Column({ name: 'to_location_id', type: 'text', nullable: true })
  toLocationId!: string | null;

  @Column({ name: 'movement_type', type: 'text' })
  movementType!: 'in' | 'out' | 'transfer' | 'adjustment';

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
