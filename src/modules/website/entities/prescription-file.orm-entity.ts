import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { PrescriptionOrmEntity } from './prescription.orm-entity';

@Entity('prescription_files')
export class PrescriptionFileOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne('PrescriptionOrmEntity', 'files', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prescription_id' })
  prescription!: PrescriptionOrmEntity;

  @Column({ name: 'file_url', type: 'text' })
  fileUrl!: string;

  @Column({ type: 'text' })
  mime!: string;

  @Column({ name: 'original_name', type: 'text' })
  originalName!: string;

  @Column({ type: 'int', nullable: true })
  size!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
