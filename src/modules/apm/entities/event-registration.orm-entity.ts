import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apm_event_registrations')
export class EventRegistrationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'event_id', type: 'text' })
  eventId!: string;

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

  @Column({ type: 'boolean', default: false })
  attended!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
