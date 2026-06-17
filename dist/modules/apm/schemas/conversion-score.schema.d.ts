import { HydratedDocument } from 'mongoose';
export type ConversionScoreDocument = HydratedDocument<ConversionScoreSchema>;
export declare class ConversionScoreSchema {
    id: string;
    entityType: string;
    entityId: string;
    score: number;
    status: string;
    lastAssessedAt: Date | null;
    assessedBy: string | null;
    notes: string | null;
}
export declare const ConversionScoreSchemaFactory: import("mongoose").Schema<ConversionScoreSchema, import("mongoose").Model<ConversionScoreSchema, any, any, any, any, any, ConversionScoreSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    entityType?: import("mongoose").SchemaDefinitionProperty<string, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    entityId?: import("mongoose").SchemaDefinitionProperty<string, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    score?: import("mongoose").SchemaDefinitionProperty<number, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lastAssessedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    assessedBy?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, ConversionScoreSchema>;
