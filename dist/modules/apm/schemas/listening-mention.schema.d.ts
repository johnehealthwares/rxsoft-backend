import { HydratedDocument } from 'mongoose';
export type ListeningMentionDocument = HydratedDocument<ListeningMentionSchema>;
export declare class ListeningMentionSchema {
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
}
export declare const ListeningMentionSchemaFactory: import("mongoose").Schema<ListeningMentionSchema, import("mongoose").Model<ListeningMentionSchema, any, any, any, any, any, ListeningMentionSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    platform?: import("mongoose").SchemaDefinitionProperty<string, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    mentionUrl?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    sentiment?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    reach?: import("mongoose").SchemaDefinitionProperty<number, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    mentionedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    source?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isUrgent?: import("mongoose").SchemaDefinitionProperty<boolean, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, ListeningMentionSchema>;
