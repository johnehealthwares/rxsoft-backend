import { HydratedDocument } from 'mongoose';
export type CandidateTourDocument = HydratedDocument<CandidateTourSchema>;
export declare class CandidateTourSchema {
    id: string;
    title: string;
    lgaId: string;
    wardId: string | null;
    visitType: string;
    tourDate: Date | null;
    description: string | null;
    expectedAttendees: number;
    actualAttendees: number;
    stakeholdersMet: string | null;
    commitments: string | null;
    complaints: string | null;
    volunteerSignups: number;
    mediaCoverage: string | null;
    notes: string | null;
    status: string;
}
export declare const CandidateTourSchemaFactory: import("mongoose").Schema<CandidateTourSchema, import("mongoose").Model<CandidateTourSchema, any, any, any, any, any, CandidateTourSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lgaId?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    wardId?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    visitType?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    tourDate?: import("mongoose").SchemaDefinitionProperty<Date | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    expectedAttendees?: import("mongoose").SchemaDefinitionProperty<number, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    actualAttendees?: import("mongoose").SchemaDefinitionProperty<number, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    stakeholdersMet?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    commitments?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    complaints?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    volunteerSignups?: import("mongoose").SchemaDefinitionProperty<number, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    mediaCoverage?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, CandidateTourSchema>;
