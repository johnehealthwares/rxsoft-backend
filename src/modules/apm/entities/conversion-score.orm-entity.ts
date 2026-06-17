import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_conversion_scores')
export class ConversionScoreOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'entity_type', type: 'text' })
  entityType!: string;

  @Column({ name: 'entity_id', type: 'text' })
  entityId!: string;

  @Column({ type: 'int', default: 0 })
  score!: number;

  @Column({ type: 'text', default: 'grey' })
  status!: string;

  @Column({ name: 'last_assessed_at', type: 'timestamp', nullable: true })
  lastAssessedAt!: Date | null;

  @Column({ name: 'assessed_by', type: 'text', nullable: true })
  assessedBy!: string | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
