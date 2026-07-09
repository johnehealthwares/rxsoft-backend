import type { StakeholderOrmEntity } from './stakeholder.orm-entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { CanvassingSessionOrmEntity } from './canvassing-session.orm-entity';

@Entity('apm_conversion_activities')
export class ConversionActivityOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'stakeholder_id', type: 'text' })
  stakeholderId!: string;

  @ManyToOne('StakeholderOrmEntity', 'activities')
  @JoinColumn({ name: 'stakeholder_id' })
  stakeholder!: StakeholderOrmEntity;

  @Column({ type: 'text' })
  type!: string;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ type: 'text', nullable: true })
  outcome!: string | null;

  @Column({ name: 'conducted_by', type: 'text', nullable: true })
  conductedBy!: string | null;

  @Column({ name: 'conducted_at', type: 'timestamp', nullable: true })
  conductedAt!: Date | null;

  @Column({ name: 'follow_up_date', type: 'timestamp', nullable: true })
  followUpDate!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
