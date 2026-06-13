import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type RewardTransactionType = 'earned' | 'redeemed' | 'expired' | 'referral_bonus';

@Entity('reward_transactions')
export class RewardTransactionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ type: 'int' })
  points!: number;

  @Column({ type: 'text' })
  type!: RewardTransactionType;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'reference_id', type: 'text', nullable: true })
  referenceId!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
