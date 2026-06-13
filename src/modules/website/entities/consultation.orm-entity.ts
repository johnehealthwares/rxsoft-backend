import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type ConsultationChannel = 'WhatsApp' | 'Phone' | 'Video Call';
export type ConsultationStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';

@Entity('consultations')
export class ConsultationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId!: string | null;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  phone!: string;

  @Column({ type: 'text', nullable: true })
  email!: string | null;

  @Column({ type: 'text', nullable: true })
  symptoms!: string | null;

  @Column({ type: 'text', nullable: true })
  questions!: string | null;

  @Column({ type: 'text', default: 'WhatsApp' })
  channel!: ConsultationChannel;

  @Column({ type: 'text', default: 'Pending' })
  status!: ConsultationStatus;

  @Column({ name: 'pharmacist_notes', type: 'text', nullable: true })
  pharmacistNotes!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null;
}
