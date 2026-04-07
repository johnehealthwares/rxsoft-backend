import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { StockLocationOrmEntity } from './stock-location.orm-entity';

@Entity('warehouses')
@Unique('uq_warehouses_org_code', ['organizationId', 'code'])
export class WarehouseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ name: 'store_id', type: 'text', nullable: true })
  storeId!: string | null;

  @Column({ type: 'text' })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @OneToMany(
  () => StockLocationOrmEntity,
  (location) => location.warehouse
)
stockLocations!: StockLocationOrmEntity[];

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
