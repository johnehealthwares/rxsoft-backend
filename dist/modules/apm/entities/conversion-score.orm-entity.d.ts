export declare class ConversionScoreOrmEntity {
    id: string;
    entityType: string;
    entityId: string;
    score: number;
    status: string;
    lastAssessedAt: Date | null;
    assessedBy: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}
