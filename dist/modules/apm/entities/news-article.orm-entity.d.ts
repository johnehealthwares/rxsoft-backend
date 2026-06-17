export declare class NewsArticleOrmEntity {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    category: string | null;
    authorName: string | null;
    imageUrl: string | null;
    videoUrl: string | null;
    isFeatured: boolean;
    isPublished: boolean;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
