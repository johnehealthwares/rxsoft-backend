import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { StockLocationOrmEntity } from './stock-location.orm-entity';

@Entity('store_stock_locations')
@Unique('uq_store_stock_locations_org_store_purpose', ['organizationId', 'storeId', 'purpose'])
// Explicit mapping between a store and inventory location for a concrete workflow purpose.
export class StoreStockLocationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ name: 'store_id', type: 'text' })
  storeId!: string;

  @Column({ type: 'text' })
  purpose!: 'sale_issue' | 'sale_return';

  @ManyToOne(() => StockLocationOrmEntity, { nullable: false })
  @JoinColumn({ name: 'stock_location_id' })
  stockLocation!: StockLocationOrmEntity;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
