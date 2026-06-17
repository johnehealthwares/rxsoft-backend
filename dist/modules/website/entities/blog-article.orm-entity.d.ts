export declare class BlogArticleOrmEntity {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    category: string | null;
    authorName: string | null;
    imageUrl: string | null;
    readingTime: number | null;
    isPublished: boolean;
    publishedAt: Date | null;
    metaTitle: string | null;
    metaDescription: string | null;
    ogImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
