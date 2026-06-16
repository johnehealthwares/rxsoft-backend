import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DateOrNullTransformer } from 'src/shared/utils/column-transformer';

@Entity('apm_events')
export class EventOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'text', nullable: true })
  location!: string | null;

  @Column({ name: 'event_date', nullable: true, type: 'text', transformer: DateOrNullTransformer })
  eventDate!: Date | null;

  @Column({ name: 'event_time', type: 'text', nullable: true })
  eventTime!: string | null;

  @Column({ type: 'text', nullable: true })
  category!: string | null;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl!: string | null;

  @Column({ name: 'max_attendees', type: 'int', nullable: true })
  maxAttendees!: number | null;

  @Column({ name: 'is_published', type: 'boolean', default: false })
  isPublished!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null;
}
