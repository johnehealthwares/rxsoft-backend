import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ItemCategoryOrmEntity } from './item-category.orm-entity';
import { UomOrmEntity } from '../../sales/entities/uom.orm-entity';

@Entity('items')
export class ItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  code!: string | null;

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

  @Column({ name: 'track_lot', type: 'boolean', default: true })
  trackLot!: boolean;

  @Column({ name: 'track_expiry', type: 'boolean', default: true })
  trackExpiry!: boolean;

  @Column({ name: 'shelf_life_days', type: 'int', nullable: true })
  shelfLifeDays!: number | null;

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
