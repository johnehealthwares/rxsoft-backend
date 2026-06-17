import { HydratedDocument } from 'mongoose';
export type DonationDocument = HydratedDocument<DonationSchema>;
export declare class DonationSchema {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    amount: number;
    reference: string | null;
    notes: string | null;
}
export declare const DonationSchemaFactory: import("mongoose").Schema<DonationSchema, import("mongoose").Model<DonationSchema, any, any, any, any, any, DonationSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string | null, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string | null, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    amount?: import("mongoose").SchemaDefinitionProperty<number, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    reference?: import("mongoose").SchemaDefinitionProperty<string | null, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, DonationSchema>;
