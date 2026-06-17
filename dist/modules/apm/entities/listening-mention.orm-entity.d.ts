export declare class ListeningMentionOrmEntity {
    id: string;
    platform: string;
    mentionUrl: string | null;
    title: string;
    content: string | null;
    sentiment: string | null;
    reach: number;
    mentionedAt: Date | null;
    source: string | null;
    category: string | null;
    isUrgent: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
