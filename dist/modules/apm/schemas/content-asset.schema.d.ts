import { HydratedDocument } from 'mongoose';
export type ContentAssetDocument = HydratedDocument<ContentAssetSchema>;
export declare class ContentAssetSchema {
    id: string;
    title: string;
    type: string;
    lgaId: string | null;
    targetAudience: string | null;
    messageKey: string | null;
    assetUrl: string;
    language: string | null;
    tags: string | null;
    status: string;
}
export declare const ContentAssetSchemaFactory: import("mongoose").Schema<ContentAssetSchema, import("mongoose").Model<ContentAssetSchema, any, any, any, any, any, ContentAssetSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lgaId?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    targetAudience?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    messageKey?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    assetUrl?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    language?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, ContentAssetSchema>;
