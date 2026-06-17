import { HydratedDocument } from 'mongoose';
export type NewsArticleDocument = HydratedDocument<NewsArticleSchema>;
export declare class NewsArticleSchema {
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
    deletedAt: Date | null;
}
export declare const NewsArticleSchemaFactory: import("mongoose").Schema<NewsArticleSchema, import("mongoose").Model<NewsArticleSchema, any, any, any, any, any, NewsArticleSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    slug?: import("mongoose").SchemaDefinitionProperty<string, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    excerpt?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    authorName?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    videoUrl?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isFeatured?: import("mongoose").SchemaDefinitionProperty<boolean, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isPublished?: import("mongoose").SchemaDefinitionProperty<boolean, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    publishedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, NewsArticleSchema>;
