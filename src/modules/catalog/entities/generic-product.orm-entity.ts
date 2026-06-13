import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { PharmaceuticsOrmEntity } from './pharmaceutics.orm-entity';
import { ItemOrmEntity } from './item.orm-entity';

@Entity('generic_products')
@Unique('uq_generic_products_org_code', ['organizationId', 'code'])
export class GenericProductOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @Column({ type: 'text' })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'therapeutic_class', type: 'text', nullable: true })
  therapeuticClass!: string | null;

  @Column({ name: 'dosage_form', type: 'text', nullable: true })
  dosageForm!: string | null;

  @Column({ type: 'text', nullable: true })
  strength!: string | null;

  @Column({ name: 'general_use', type: 'text' })
  generalUse!: string;

  @Column({ name: 'adult_dosage', type: 'text' })
  adultDosage!: string;

  @Column({ name: 'pediatric_dosage', type: 'text' })
  pediatricDosage!: string;

  @Column({ name: 'is_prescription_required', type: 'boolean', default: false })
  isPrescriptionRequired!: boolean;

  @Column({ name: 'is_controlled_substance', type: 'boolean', default: false })
  isControlledSubstance!: boolean;

  @ManyToOne(() => PharmaceuticsOrmEntity, (pharmaceutics) => pharmaceutics.genericProducts, {
    nullable: false,
  })
  @JoinColumn({ name: 'pharmaceutics_id' })
  pharmaceutics!: PharmaceuticsOrmEntity;

  @OneToMany(() => ItemOrmEntity, (item) => item.genericProduct)
  items!: ItemOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at'/* timestamptzz */, nullable: true })
  deletedAt!: Date | null;
}
