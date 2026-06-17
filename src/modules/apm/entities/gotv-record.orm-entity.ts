import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_gotv_records')
export class GotvRecordOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'polling_unit_id', type: 'text' })
  pollingUnitId!: string;

  @Column({ name: 'supporter_name', type: 'text' })
  supporterName!: string;

  @Column({ name: 'supporter_phone', type: 'text', nullable: true })
  supporterPhone!: string | null;

  @Column({ type: 'boolean', default: false })
  contacted!: boolean;

  @Column({ type: 'boolean', default: false })
  turnedOut!: boolean;

  @Column({ name: 'contacted_via', type: 'text', nullable: true })
  contactedVia!: string | null;

  @Column({ name: 'contacted_at', type: 'timestamp', nullable: true })
  contactedAt!: Date | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
