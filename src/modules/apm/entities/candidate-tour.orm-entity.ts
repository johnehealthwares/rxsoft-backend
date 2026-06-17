import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_candidate_tours')
export class CandidateTourOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ name: 'lga_id', type: 'text' })
  lgaId!: string;

  @Column({ name: 'ward_id', type: 'text', nullable: true })
  wardId!: string | null;

  @Column({ name: 'visit_type', type: 'text', default: 'rally' })
  visitType!: string;

  @Column({ name: 'tour_date', type: 'timestamp', nullable: true })
  tourDate!: Date | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'expected_attendees', type: 'int', default: 0 })
  expectedAttendees!: number;

  @Column({ name: 'actual_attendees', type: 'int', default: 0 })
  actualAttendees!: number;

  @Column({ name: 'stakeholders_met', type: 'text', nullable: true })
  stakeholdersMet!: string | null;

  @Column({ type: 'text', nullable: true })
  commitments!: string | null;

  @Column({ type: 'text', nullable: true })
  complaints!: string | null;

  @Column({ name: 'volunteer_signups', type: 'int', default: 0 })
  volunteerSignups!: number;

  @Column({ name: 'media_coverage', type: 'text', nullable: true })
  mediaCoverage!: string | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @Column({ type: 'text', default: 'planned' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
