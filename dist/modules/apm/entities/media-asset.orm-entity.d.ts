export declare class MediaAssetOrmEntity {
    id: string;
    title: string;
    description: string | null;
    type: string;
    assetUrl: string;
    thumbnailUrl: string | null;
    category: string | null;
    displayOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
