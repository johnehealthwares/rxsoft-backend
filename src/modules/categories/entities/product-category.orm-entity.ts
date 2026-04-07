import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ProductOrmEntity } from '../../catalog/entities/product.orm-entity';

@Entity('product_categories')
@Unique('uq_product_categories_org_code', ['organizationId', 'code'])
export class ProductCategoryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @ManyToOne(() => ProductCategoryOrmEntity, (parent) => parent.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent!: ProductCategoryOrmEntity | null;

  @OneToMany(() => ProductCategoryOrmEntity, (child) => child.parent)
  children!: ProductCategoryOrmEntity[];

  @Column({ type: 'text' })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @OneToMany(() => ProductOrmEntity, (product) => product.category)
  products!: ProductOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at'/* timestamptzz */, nullable: true })
  deletedAt!: Date | null;
}
