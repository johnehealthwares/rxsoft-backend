import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_incident_reports')
export class IncidentReportOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'polling_unit_id', type: 'text', nullable: true })
  pollingUnitId!: string | null;

  @Column({ type: 'text' })
  type!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text', default: 'medium' })
  severity!: string;

  @Column({ name: 'reported_by', type: 'text', nullable: true })
  reportedBy!: string | null;

  @Column({ name: 'reported_at', type: 'timestamp', nullable: true })
  reportedAt!: Date | null;

  @Column({ type: 'text', default: 'open' })
  status!: string;

  @Column({ name: 'legal_escalation', type: 'boolean', default: false })
  legalEscalation!: boolean;

  @Column({ name: 'security_escalation', type: 'boolean', default: false })
  securityEscalation!: boolean;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
