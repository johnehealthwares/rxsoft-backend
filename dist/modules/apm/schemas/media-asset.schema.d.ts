import { HydratedDocument } from 'mongoose';
export type MediaAssetDocument = HydratedDocument<MediaAssetSchema>;
export declare class MediaAssetSchema {
    id: string;
    title: string;
    description: string | null;
    type: string;
    assetUrl: string;
    thumbnailUrl: string | null;
    category: string | null;
    displayOrder: number;
    isActive: boolean;
    deletedAt: Date | null;
}
export declare const MediaAssetSchemaFactory: import("mongoose").Schema<MediaAssetSchema, import("mongoose").Model<MediaAssetSchema, any, any, any, any, any, MediaAssetSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | null, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    assetUrl?: import("mongoose").SchemaDefinitionProperty<string, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    thumbnailUrl?: import("mongoose").SchemaDefinitionProperty<string | null, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string | null, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, MediaAssetSchema>;
