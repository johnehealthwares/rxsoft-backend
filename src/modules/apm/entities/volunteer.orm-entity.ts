import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_volunteers')
export class VolunteerOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  phone!: string;

  @Column({ type: 'text', nullable: true })
  email!: string | null;

  @Column({ type: 'text', nullable: true })
  lga!: string | null;

  @Column({ type: 'text', nullable: true })
  ward!: string | null;

  @Column({ type: 'text', nullable: true })
  pollingUnit!: string | null;

  @Column({ type: 'text', nullable: true })
  skills!: string | null;

  @Column({ type: 'text', nullable: true })
  interests!: string | null;

  @Column({ type: 'text', nullable: true })
  availability!: string | null;

  @Column({ type: 'boolean', default: false })
  onboarded!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
