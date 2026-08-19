import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import type { ItemOrmEntity } from './item.orm-entity';

@Entity('item_categories')
@Unique('uq_product_categories_code', ['code'])
export class ItemCategoryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => ItemCategoryOrmEntity, (parent) => parent.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent!: ItemCategoryOrmEntity | null;

  @OneToMany(() => ItemCategoryOrmEntity, (child) => child.parent)
  children!: ItemCategoryOrmEntity[];

  @Column({ type: 'text' })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'uom_category_id', type: 'uuid', nullable: true })
  uomCategoryId!: string | null;

  @OneToMany('ItemOrmEntity', 'category')
  items!: ItemOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at'/* timestamptzz */, nullable: true })
  deletedAt!: Date | null;
}
