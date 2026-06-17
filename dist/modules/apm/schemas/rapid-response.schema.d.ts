import { HydratedDocument } from 'mongoose';
export type RapidResponseDocument = HydratedDocument<RapidResponseSchema>;
export declare class RapidResponseSchema {
    id: string;
    mentionId: string;
    responseType: string;
    content: string;
    publishedAt: Date | null;
    publishedBy: string | null;
    platform: string | null;
    effectiveness: string | null;
}
export declare const RapidResponseSchemaFactory: import("mongoose").Schema<RapidResponseSchema, import("mongoose").Model<RapidResponseSchema, any, any, any, any, any, RapidResponseSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    mentionId?: import("mongoose").SchemaDefinitionProperty<string, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    responseType?: import("mongoose").SchemaDefinitionProperty<string, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    publishedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    publishedBy?: import("mongoose").SchemaDefinitionProperty<string | null, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    platform?: import("mongoose").SchemaDefinitionProperty<string | null, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    effectiveness?: import("mongoose").SchemaDefinitionProperty<string | null, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, RapidResponseSchema>;
