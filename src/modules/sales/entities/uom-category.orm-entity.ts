import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { UomOrmEntity } from './uom.orm-entity';

@Entity('uom_categories')
@Unique('uq_uom_categories_org_name', ['organizationId', 'name'])
export class UomCategoryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ type: 'text', nullable: true })
  code!: string | null;

  @Column({ type: 'text' })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => UomOrmEntity, (uom) => uom.category)
  uoms!: UomOrmEntity[];
}
