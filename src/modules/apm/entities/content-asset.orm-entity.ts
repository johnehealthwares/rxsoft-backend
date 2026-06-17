import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_content_assets')
export class ContentAssetOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  type!: string;

  @Column({ name: 'lga_id', type: 'text', nullable: true })
  lgaId!: string | null;

  @Column({ name: 'target_audience', type: 'text', nullable: true })
  targetAudience!: string | null;

  @Column({ name: 'message_key', type: 'text', nullable: true })
  messageKey!: string | null;

  @Column({ name: 'asset_url', type: 'text' })
  assetUrl!: string;

  @Column({ type: 'text', nullable: true })
  language!: string | null;

  @Column({ type: 'text', nullable: true })
  tags!: string | null;

  @Column({ type: 'text', default: 'draft' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
