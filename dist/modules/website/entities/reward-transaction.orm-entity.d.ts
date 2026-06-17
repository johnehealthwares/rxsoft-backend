export type RewardTransactionType = 'earned' | 'redeemed' | 'expired' | 'referral_bonus';
export declare class RewardTransactionOrmEntity {
    id: string;
    userId: string;
    points: number;
    type: RewardTransactionType;
    description: string | null;
    referenceId: string | null;
    createdAt: Date;
}
