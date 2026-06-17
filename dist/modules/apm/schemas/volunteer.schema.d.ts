import { HydratedDocument } from 'mongoose';
export type VolunteerDocument = HydratedDocument<VolunteerSchema>;
export declare class VolunteerSchema {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    lga: string | null;
    ward: string | null;
    pollingUnit: string | null;
    skills: string | null;
    interests: string | null;
    availability: string | null;
    onboarded: boolean;
}
export declare const VolunteerSchemaFactory: import("mongoose").Schema<VolunteerSchema, import("mongoose").Model<VolunteerSchema, any, any, any, any, any, VolunteerSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lga?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    ward?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pollingUnit?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    skills?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    interests?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    availability?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    onboarded?: import("mongoose").SchemaDefinitionProperty<boolean, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, VolunteerSchema>;
