import { HydratedDocument } from 'mongoose';
export type NewsletterSubscriberDocument = HydratedDocument<NewsletterSubscriberSchema>;
export declare class NewsletterSubscriberSchema {
    id: string;
    email: string;
    phone: string | null;
    subscribed: boolean;
}
export declare const NewsletterSubscriberSchemaFactory: import("mongoose").Schema<NewsletterSubscriberSchema, import("mongoose").Model<NewsletterSubscriberSchema, any, any, any, any, any, NewsletterSubscriberSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string | null, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    subscribed?: import("mongoose").SchemaDefinitionProperty<boolean, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, NewsletterSubscriberSchema>;
