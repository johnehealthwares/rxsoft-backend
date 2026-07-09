import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import type { StockBalanceOrmEntity } from './stock-balance.orm-entity';
import type { WarehouseOrmEntity } from './warehouse.orm-entity';

@Entity('stock_locations')
@Unique('uq_stock_locations_org_name', ['organizationId', 'name'])
export class StockLocationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ name: 'warehouse_id', type: 'text', nullable: true })
  warehouseId!: string | null;

  @ManyToOne('WarehouseOrmEntity', 'stockLocations', { nullable: true })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse!: WarehouseOrmEntity | null;

  @Column({ name: 'parent_id', type: 'text', nullable: true })
  parentId!: string | null;

  @ManyToOne(
    () => StockLocationOrmEntity,
    (location) => location.children, // 👈 ADD THIS
    { nullable: true }
  )
  @JoinColumn({ name: 'parent_id' })
  parent!: StockLocationOrmEntity | null;

  @OneToMany(
    () => StockLocationOrmEntity,
    (location) => location.parent
  )
  children!: StockLocationOrmEntity[];

  @Column({ type: 'text', nullable: true })
  code!: string | null;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'location_type', type: 'text', default: 'internal' })
  locationType!: 'internal' | 'supplier' | 'customer' | 'inventory' | 'scrap' | 'transit';

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany('StockBalanceOrmEntity', 'location')
  stockBalances!: StockBalanceOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
