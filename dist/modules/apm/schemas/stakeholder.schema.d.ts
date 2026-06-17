import { HydratedDocument } from 'mongoose';
export type StakeholderDocument = HydratedDocument<StakeholderSchema>;
export declare class StakeholderSchema {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    role: string | null;
    lgaId: string;
    wardId: string | null;
    affiliation: string | null;
    influenceLevel: string;
    conversionStatus: string;
    notes: string | null;
    isActive: boolean;
}
export declare const StakeholderSchemaFactory: import("mongoose").Schema<StakeholderSchema, import("mongoose").Model<StakeholderSchema, any, any, any, any, any, StakeholderSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lgaId?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    wardId?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    affiliation?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    influenceLevel?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    conversionStatus?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, StakeholderSchema>;
