import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_supporters')
export class SupporterOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @Column({ type: 'text', nullable: true })
  interests!: string | null;

  @Column({ type: 'text', nullable: true })
  skills!: string | null;

  @Column({ type: 'text', nullable: true })
  source!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
