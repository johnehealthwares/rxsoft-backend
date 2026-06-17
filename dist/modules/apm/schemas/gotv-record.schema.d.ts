import { HydratedDocument } from 'mongoose';
export type GotvRecordDocument = HydratedDocument<GotvRecordSchema>;
export declare class GotvRecordSchema {
    id: string;
    pollingUnitId: string;
    supporterName: string;
    supporterPhone: string | null;
    contacted: boolean;
    turnedOut: boolean;
    contactedVia: string | null;
    contactedAt: Date | null;
    notes: string | null;
}
export declare const GotvRecordSchemaFactory: import("mongoose").Schema<GotvRecordSchema, import("mongoose").Model<GotvRecordSchema, any, any, any, any, any, GotvRecordSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pollingUnitId?: import("mongoose").SchemaDefinitionProperty<string, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    supporterName?: import("mongoose").SchemaDefinitionProperty<string, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    supporterPhone?: import("mongoose").SchemaDefinitionProperty<string | null, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    contacted?: import("mongoose").SchemaDefinitionProperty<boolean, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    turnedOut?: import("mongoose").SchemaDefinitionProperty<boolean, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    contactedVia?: import("mongoose").SchemaDefinitionProperty<string | null, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    contactedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, GotvRecordSchema>;
