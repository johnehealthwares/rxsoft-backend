import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { PharmaceuticsOrmEntity } from './pharmaceutics.orm-entity';

@Entity('drug_components')
@Unique('uq_drug_components_org_name', ['organizationId', 'name'])
export class DrugComponentOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ type: 'text' })
  name!: string;

  @ManyToMany(() => PharmaceuticsOrmEntity, (pharmaceutics) => pharmaceutics.drugComponents)
  pharmaceutics!: PharmaceuticsOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at'/* timestamptzz */, nullable: true })
  deletedAt!: Date | null;
}
