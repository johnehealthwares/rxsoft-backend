import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { LgaOrmEntity } from './lga.orm-entity';
import type { PollingUnitOrmEntity } from './polling-unit.orm-entity';

@Entity('apm_wards')
export class WardOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', unique: true })
  code!: string;

  @Column({ name: 'lga_id', type: 'text' })
  lgaId!: string;

  @ManyToOne('LgaOrmEntity', 'wards')
  @JoinColumn({ name: 'lga_id' })
  lga!: LgaOrmEntity;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany('PollingUnitOrmEntity', 'ward')
  pollingUnits!: PollingUnitOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
