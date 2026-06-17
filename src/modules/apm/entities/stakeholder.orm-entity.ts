import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LgaOrmEntity } from './lga.orm-entity';
import { WardOrmEntity } from './ward.orm-entity';
import { ConversionActivityOrmEntity } from './conversion-activity.orm-entity';

@Entity('apm_stakeholders')
export class StakeholderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  phone!: string | null;

  @Column({ type: 'text', nullable: true })
  email!: string | null;

  @Column({ type: 'text', nullable: true })
  role!: string | null;

  @Column({ name: 'lga_id', type: 'text' })
  lgaId!: string;

  @ManyToOne(() => LgaOrmEntity)
  @JoinColumn({ name: 'lga_id' })
  lga!: LgaOrmEntity;

  @Column({ name: 'ward_id', type: 'text', nullable: true })
  wardId!: string | null;

  @ManyToOne(() => WardOrmEntity)
  @JoinColumn({ name: 'ward_id' })
  ward!: WardOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  affiliation!: string | null;

  @Column({ name: 'influence_level', type: 'text', default: 'medium' })
  influenceLevel!: string;

  @Column({ name: 'conversion_status', type: 'text', default: 'untouched' })
  conversionStatus!: string;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany(() => ConversionActivityOrmEntity, (activity) => activity.stakeholder)
  activities!: ConversionActivityOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
