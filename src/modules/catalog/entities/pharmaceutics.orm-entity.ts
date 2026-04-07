import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { GenericProductOrmEntity } from './generic-product.orm-entity';
import { DrugComponentOrmEntity } from './drug-component.orm-entity';

@Entity('pharmaceutics')
@Unique('uq_pharmaceutics_org_code', ['organizationId', 'code'])
export class PharmaceuticsOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ type: 'text' })
  code!: string;

  @Column({ name: 'common_brand_name', type: 'text', nullable: true })
  commonBrandName!: string | null;

  @Column({ name: 'common_generic_name', type: 'text', nullable: true })
  commonGenericName!: string | null;

  @Column({ name: 'clinical_name', type: 'text', nullable: true })
  clinicalName!: string | null;

  @Column({ name: 'drug_class', type: 'text', nullable: true })
  drugClass!: string | null;

  @Column({ name: 'chemical_constituents', type: 'text', nullable: true })
  chemicalConstituents!: string | null;

  @Column({ type: 'text', name: 'pharmaceutics', nullable: true })
  pharmaceutics!: string | null;

  @Column({ type: 'text', nullable: true })
  indications!: string | null;

  @Column({ type: 'text', nullable: true })
  contraindications!: string | null;

  @Column({ type: 'text', nullable: true })
  mechanism!: string | null;

  @Column({ name: 'missed_dose', type: 'text', nullable: true })
  missedDose!: string | null;

  @Column({ name: 'drug_interactions', type: 'text', nullable: true })
  drugInteractions!: string | null;

  @Column({ name: 'dosage', type: 'text', nullable: true })
  dosage!: string | null;

  @OneToMany(() => GenericProductOrmEntity, (genericProduct) => genericProduct.pharmaceutics)
  genericProducts!: GenericProductOrmEntity[];

  @ManyToMany(() => DrugComponentOrmEntity, (drugComponent) => drugComponent.pharmaceutics)
  @JoinTable({
    name: 'pharmaceutics_drug_components',
    joinColumn: { name: 'pharmaceutics_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'drug_component_id', referencedColumnName: 'id' },
  })
  drugComponents!: DrugComponentOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at'/* timestamptzz */, nullable: true })
  deletedAt!: Date | null;
}
