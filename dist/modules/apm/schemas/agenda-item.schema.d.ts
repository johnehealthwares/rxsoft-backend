import { HydratedDocument } from 'mongoose';
export type AgendaItemDocument = HydratedDocument<AgendaItemSchema>;
export declare class AgendaItemSchema {
    id: string;
    title: string;
    summary: string | null;
    description: string | null;
    icon: string | null;
    imageUrl: string | null;
    category: string | null;
    displayOrder: number;
    isActive: boolean;
}
export declare const AgendaItemSchemaFactory: import("mongoose").Schema<AgendaItemSchema, import("mongoose").Model<AgendaItemSchema, any, any, any, any, any, AgendaItemSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    summary?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    icon?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, AgendaItemSchema>;
