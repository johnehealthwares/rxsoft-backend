import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ItemOrmEntity } from './item.orm-entity';
import { DEFAULT_ORGANIZATION_ID } from 'src/shared/constants/persistence-scope';

@Entity('item_categories')
@Unique('uq_product_categories_org_code', ['organizationId', 'code'])
export class ItemCategoryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid', default: DEFAULT_ORGANIZATION_ID  })
  organizationId!: string;

  @ManyToOne(() => ItemCategoryOrmEntity, (parent) => parent.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent!: ItemCategoryOrmEntity | null;

  @OneToMany(() => ItemCategoryOrmEntity, (child) => child.parent)
  children!: ItemCategoryOrmEntity[];

  @Column({ type: 'text' })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @OneToMany(() => ItemOrmEntity, (item) => item.category)
  items!: ItemOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at'/* timestamptzz */, nullable: true })
  deletedAt!: Date | null;
}
