export declare class AchievementOrmEntity {
    id: string;
    title: string;
    summary: string | null;
    description: string | null;
    category: string | null;
    statLabel: string | null;
    statValue: string | null;
    imageUrl: string | null;
    displayOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
