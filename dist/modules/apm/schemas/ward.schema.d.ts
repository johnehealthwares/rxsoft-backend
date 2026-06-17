import { HydratedDocument } from 'mongoose';
export type WardDocument = HydratedDocument<WardSchema>;
export declare class WardSchema {
    id: string;
    name: string;
    code: string;
    lgaId: string;
    description: string | null;
    displayOrder: number;
    isActive: boolean;
}
export declare const WardSchemaFactory: import("mongoose").Schema<WardSchema, import("mongoose").Model<WardSchema, any, any, any, any, any, WardSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    code?: import("mongoose").SchemaDefinitionProperty<string, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lgaId?: import("mongoose").SchemaDefinitionProperty<string, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | null, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, WardSchema>;
