import { HydratedDocument } from 'mongoose';
export type VolunteerAssignmentDocument = HydratedDocument<VolunteerAssignmentSchema>;
export declare class VolunteerAssignmentSchema {
    id: string;
    volunteerId: string;
    lgaId: string;
    wardId: string | null;
    role: string | null;
    status: string;
    assignedAt: Date | null;
    notes: string | null;
}
export declare const VolunteerAssignmentSchemaFactory: import("mongoose").Schema<VolunteerAssignmentSchema, import("mongoose").Model<VolunteerAssignmentSchema, any, any, any, any, any, VolunteerAssignmentSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    volunteerId?: import("mongoose").SchemaDefinitionProperty<string, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lgaId?: import("mongoose").SchemaDefinitionProperty<string, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    wardId?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    assignedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, VolunteerAssignmentSchema>;
