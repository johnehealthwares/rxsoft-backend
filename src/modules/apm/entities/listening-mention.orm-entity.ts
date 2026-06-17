import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_listening_mentions')
export class ListeningMentionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  platform!: string;

  @Column({ name: 'mention_url', type: 'text', nullable: true })
  mentionUrl!: string | null;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text', nullable: true })
  content!: string | null;

  @Column({ type: 'text', nullable: true })
  sentiment!: string | null;

  @Column({ type: 'int', default: 0 })
  reach!: number;

  @Column({ name: 'mentioned_at', type: 'timestamp', nullable: true })
  mentionedAt!: Date | null;

  @Column({ type: 'text', nullable: true })
  source!: string | null;

  @Column({ type: 'text', nullable: true })
  category!: string | null;

  @Column({ name: 'is_urgent', type: 'boolean', default: false })
  isUrgent!: boolean;

  @Column({ type: 'text', default: 'new' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
