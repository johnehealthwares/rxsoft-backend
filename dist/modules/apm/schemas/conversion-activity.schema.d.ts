import { HydratedDocument } from 'mongoose';
export type ConversionActivityDocument = HydratedDocument<ConversionActivitySchema>;
export declare class ConversionActivitySchema {
    id: string;
    stakeholderId: string;
    type: string;
    notes: string | null;
    outcome: string | null;
    conductedBy: string | null;
    conductedAt: Date | null;
    followUpDate: Date | null;
}
export declare const ConversionActivitySchemaFactory: import("mongoose").Schema<ConversionActivitySchema, import("mongoose").Model<ConversionActivitySchema, any, any, any, any, any, ConversionActivitySchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    stakeholderId?: import("mongoose").SchemaDefinitionProperty<string, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    outcome?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    conductedBy?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    conductedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    followUpDate?: import("mongoose").SchemaDefinitionProperty<Date | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, ConversionActivitySchema>;
