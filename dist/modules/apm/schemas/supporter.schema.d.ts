import { HydratedDocument } from 'mongoose';
export type SupporterDocument = HydratedDocument<SupporterSchema>;
export declare class SupporterSchema {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    lga: string | null;
    ward: string | null;
    interests: string | null;
    skills: string | null;
    source: string | null;
}
export declare const SupporterSchemaFactory: import("mongoose").Schema<SupporterSchema, import("mongoose").Model<SupporterSchema, any, any, any, any, any, SupporterSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lga?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    ward?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    interests?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    skills?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    source?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, SupporterSchema>;
