import { HydratedDocument } from 'mongoose';
export type LgaDocument = HydratedDocument<LgaSchema>;
export declare class LgaSchema {
    id: string;
    name: string;
    code: string;
    region: string | null;
    description: string | null;
    displayOrder: number;
    isActive: boolean;
}
export declare const LgaSchemaFactory: import("mongoose").Schema<LgaSchema, import("mongoose").Model<LgaSchema, any, any, any, any, any, LgaSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    code?: import("mongoose").SchemaDefinitionProperty<string, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    region?: import("mongoose").SchemaDefinitionProperty<string | null, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | null, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, LgaSchema>;
