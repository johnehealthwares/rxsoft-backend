import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_result_entries')
export class ResultEntryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'polling_unit_id', type: 'text' })
  pollingUnitId!: string;

  @Column({ name: 'lga_id', type: 'text' })
  lgaId!: string;

  @Column({ name: 'ward_id', type: 'text' })
  wardId!: string;

  @Column({ name: 'apm_votes', type: 'int', default: 0 })
  apmVotes!: number;

  @Column({ name: 'pdp_votes', type: 'int', default: 0 })
  pdpVotes!: number;

  @Column({ name: 'apc_votes', type: 'int', default: 0 })
  apcVotes!: number;

  @Column({ name: 'other_votes', type: 'int', default: 0 })
  otherVotes!: number;

  @Column({ name: 'total_votes', type: 'int', default: 0 })
  totalVotes!: number;

  @Column({ name: 'registered_voters', type: 'int', default: 0 })
  registeredVoters!: number;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl!: string | null;

  @Column({ name: 'entered_by', type: 'text', nullable: true })
  enteredBy!: string | null;

  @Column({ type: 'text', default: 'draft' })
  status!: string;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
