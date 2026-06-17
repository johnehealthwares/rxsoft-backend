import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_volunteer_assignments')
export class VolunteerAssignmentOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'volunteer_id', type: 'text' })
  volunteerId!: string;

  @Column({ name: 'lga_id', type: 'text' })
  lgaId!: string;

  @Column({ name: 'ward_id', type: 'text', nullable: true })
  wardId!: string | null;

  @Column({ type: 'text', nullable: true })
  role!: string | null;

  @Column({ type: 'text', default: 'active' })
  status!: string;

  @Column({ name: 'assigned_at', type: 'timestamp', nullable: true })
  assignedAt!: Date | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
