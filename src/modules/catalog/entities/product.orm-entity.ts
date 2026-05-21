import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { GenericProductOrmEntity } from './generic-product.orm-entity';
import { ProductCategoryOrmEntity } from './product-category.orm-entity';
import { UomOrmEntity } from '../../sales/entities';

@Entity('products')
@Unique('uq_products_org_code', ['organizationId', 'code'])
@Unique('uq_products_org_barcode', ['organizationId', 'barcode'])
export class ProductOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ type: 'text' })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @ManyToOne(() => ProductCategoryOrmEntity, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id',  })
  category!: ProductCategoryOrmEntity;

  @ManyToOne(() => GenericProductOrmEntity, (genericProduct) => genericProduct.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'generic_product_id' })
  genericProduct!: GenericProductOrmEntity;

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

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at'/* timestamptzz */, nullable: true })
  deletedAt!: Date | null;
}
