import { ColumnNumericTransformer } from 'src/shared/utils/column-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UomCategoryOrmEntity } from './uom-category.orm-entity';

@Entity('uoms')
export class UomOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ name: 'category_id', type: 'uuid', nullable: true })
  categoryId!: string | null;

  @ManyToOne(() => UomCategoryOrmEntity, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category!: UomCategoryOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  code!: string | null;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'uom_type', type: 'text', default: 'reference' })
  uomType!: 'reference' | 'bigger' | 'smaller';

  @Column({ type: 'decimal', default: 1, precision: 10, 
    scale: 2, 
    transformer: new ColumnNumericTransformer()  })
  factor!: number;

  @Column({ type: 'decimal', default: 0.01, precision: 10, 
    scale: 2, 
    transformer: new ColumnNumericTransformer()  })
  rounding!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
