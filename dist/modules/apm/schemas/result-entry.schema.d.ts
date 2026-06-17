import { HydratedDocument } from 'mongoose';
export type ResultEntryDocument = HydratedDocument<ResultEntrySchema>;
export declare class ResultEntrySchema {
    id: string;
    pollingUnitId: string;
    lgaId: string;
    wardId: string;
    apmVotes: number;
    pdpVotes: number;
    apcVotes: number;
    otherVotes: number;
    totalVotes: number;
    registeredVoters: number;
    photoUrl: string | null;
    enteredBy: string | null;
    status: string;
    notes: string | null;
}
export declare const ResultEntrySchemaFactory: import("mongoose").Schema<ResultEntrySchema, import("mongoose").Model<ResultEntrySchema, any, any, any, any, any, ResultEntrySchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pollingUnitId?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lgaId?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    wardId?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    apmVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pdpVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    apcVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    otherVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    totalVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    registeredVoters?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    photoUrl?: import("mongoose").SchemaDefinitionProperty<string | null, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    enteredBy?: import("mongoose").SchemaDefinitionProperty<string | null, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, ResultEntrySchema>;
