import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apm_citizen_feedback')
export class CitizenFeedbackOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  phone!: string | null;

  @Column({ type: 'text', nullable: true })
  email!: string | null;

  @Column({ type: 'text', nullable: true })
  lga!: string | null;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'text', nullable: true })
  sentiment!: string | null;

  @Column({ type: 'text', nullable: true })
  topic!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
