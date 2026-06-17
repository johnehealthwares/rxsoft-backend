import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_rapid_responses')
export class RapidResponseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'mention_id', type: 'text' })
  mentionId!: string;

  @Column({ name: 'response_type', type: 'text', default: 'rebuttal' })
  responseType!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt!: Date | null;

  @Column({ name: 'published_by', type: 'text', nullable: true })
  publishedBy!: string | null;

  @Column({ type: 'text', nullable: true })
  platform!: string | null;

  @Column({ type: 'text', nullable: true })
  effectiveness!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
