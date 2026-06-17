import { HydratedDocument } from 'mongoose';
export type CitizenFeedbackDocument = HydratedDocument<CitizenFeedbackSchema>;
export declare class CitizenFeedbackSchema {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    lga: string | null;
    message: string;
    sentiment: string | null;
    topic: string | null;
}
export declare const CitizenFeedbackSchemaFactory: import("mongoose").Schema<CitizenFeedbackSchema, import("mongoose").Model<CitizenFeedbackSchema, any, any, any, any, any, CitizenFeedbackSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lga?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    sentiment?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    topic?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, CitizenFeedbackSchema>;
