import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ItemCategoryOrmEntity } from './item-category.orm-entity';
import { UomOrmEntity } from '../../sales/entities';

@Entity('items')
@Unique('uq_items_org_code', ['organizationId', 'code'])
@Unique('uq_items_org_barcode', ['organizationId', 'barcode'])
export class ItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ type: 'text' })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @ManyToOne(() => ItemCategoryOrmEntity, (category) => category.items, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id',  })
  category!: ItemCategoryOrmEntity;

  @Column({ name: 'generic_product_code', type: 'text', nullable: true })
  genericProductCode!: string | null;

  @Column({ name: 'base_uom_id', type: 'text' })
  baseUomId!: string;

  @ManyToOne(() => UomOrmEntity, { nullable: false })
  @JoinColumn({ name: 'base_uom_id' })
  baseUom!: UomOrmEntity;

  @Column({ name: 'purchase_uom_id', type: 'text', nullable: true })
  purchaseUomId!: string | null;

  @ManyToOne(() => UomOrmEntity, { nullable: true })
  @JoinColumn({ name: 'purchase_uom_id' })
  purchaseUom!: UomOrmEntity | null;

  @Column({ name: 'sale_uom_id', type: 'text', nullable: true })
  saleUomId!: string | null;

  @ManyToOne(() => UomOrmEntity, { nullable: true })
  @JoinColumn({ name: 'sale_uom_id' })
  saleUom!: UomOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  barcode!: string | null;

  @Column({ name: 'track_lot', type: 'boolean', default: true })
  trackLot!: boolean;

  @Column({ name: 'track_expiry', type: 'boolean', default: true })
  trackExpiry!: boolean;

  @Column({ name: 'shelf_life_days', type: 'int', nullable: true })
  shelfLifeDays!: number | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl!: string | null;

  @Column({ name: 'small_image_url', type: 'text', nullable: true })
  smallImageUrl!: string | null;

  @Column({ name: 'medium_image_url', type: 'text', nullable: true })
  mediumImageUrl!: string | null;

  @Column({ name: 'large_image_url', type: 'text', nullable: true })
  largeImageUrl!: string | null;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at'/* timestamptzz */, nullable: true })
  deletedAt!: Date | null;
}
