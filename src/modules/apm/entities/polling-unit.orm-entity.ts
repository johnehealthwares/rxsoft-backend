import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { WardOrmEntity } from './ward.orm-entity';
import { LgaOrmEntity } from './lga.orm-entity';

@Entity('apm_polling_units')
export class PollingUnitOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  code!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'ward_id', type: 'text' })
  wardId!: string;

  @ManyToOne(() => WardOrmEntity, (ward) => ward.pollingUnits)
  @JoinColumn({ name: 'ward_id' })
  ward!: WardOrmEntity;

  @Column({ name: 'lga_id', type: 'text' })
  lgaId!: string;

  @ManyToOne(() => LgaOrmEntity)
  @JoinColumn({ name: 'lga_id' })
  lga!: LgaOrmEntity;

  @Column({ name: 'registered_voters', type: 'int', default: 0 })
  registeredVoters!: number;

  @Column({ name: 'past_result_apm', type: 'int', default: 0 })
  pastResultApm!: number;

  @Column({ name: 'past_result_pdp', type: 'int', default: 0 })
  pastResultPdp!: number;

  @Column({ name: 'past_result_apc', type: 'int', default: 0 })
  pastResultApc!: number;

  @Column({ name: 'past_result_other', type: 'int', default: 0 })
  pastResultOther!: number;

  @Column({ type: 'text', nullable: true })
  latitude!: string | null;

  @Column({ type: 'text', nullable: true })
  longitude!: string | null;

  @Column({ name: 'risk_level', type: 'text', default: 'grey' })
  riskLevel!: string;

  @Column({ name: 'conversion_status', type: 'text', default: 'untouched' })
  conversionStatus!: string;

  @Column({ name: 'assigned_agent_name', type: 'text', nullable: true })
  assignedAgentName!: string | null;

  @Column({ name: 'assigned_agent_phone', type: 'text', nullable: true })
  assignedAgentPhone!: string | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
