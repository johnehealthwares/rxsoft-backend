import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PrescriptionFileOrmEntity } from './prescription-file.orm-entity';

export type PrescriptionStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Fulfilled';

@Entity('prescriptions')
export class PrescriptionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId!: string | null;

  @Column({ type: 'text', nullable: true })
  name!: string | null;

  @Column({ type: 'text', nullable: true })
  phone!: string | null;

  @Column({ type: 'text', nullable: true })
  email!: string | null;

  @Column({ type: 'text', default: 'Pending' })
  status!: PrescriptionStatus;

  @Column({ name: 'pharmacist_notes', type: 'text', nullable: true })
  pharmacistNotes!: string | null;

  @Column({ name: 'admin_notes', type: 'text', nullable: true })
  adminNotes!: string | null;

  @OneToMany(() => PrescriptionFileOrmEntity, (file) => file.prescription, { cascade: true })
  files!: PrescriptionFileOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null;
}
