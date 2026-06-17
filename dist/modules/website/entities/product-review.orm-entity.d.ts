export declare class ProductReviewOrmEntity {
    id: string;
    productId: string;
    userId: string | null;
    name: string | null;
    rating: number;
    comment: string | null;
    imageUrls: string[] | null;
    isVerifiedPurchase: boolean;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
