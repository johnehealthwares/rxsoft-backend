import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CanvassingVisitOrmEntity } from './canvassing-visit.orm-entity';

@Entity('apm_canvassing_sessions')
export class CanvassingSessionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ name: 'lga_id', type: 'text' })
  lgaId!: string;

  @Column({ name: 'ward_id', type: 'text', nullable: true })
  wardId!: string | null;

  @Column({ name: 'team_lead', type: 'text', nullable: true })
  teamLead!: string | null;

  @Column({ name: 'team_size', type: 'int', default: 1 })
  teamSize!: number;

  @Column({ type: 'text', default: 'planned' })
  status!: string;

  @Column({ name: 'scheduled_date', type: 'timestamp', nullable: true })
  scheduledDate!: Date | null;

  @Column({ name: 'completed_date', type: 'timestamp', nullable: true })
  completedDate!: Date | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @OneToMany(() => CanvassingVisitOrmEntity, (visit) => visit.session)
  visits!: CanvassingVisitOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
