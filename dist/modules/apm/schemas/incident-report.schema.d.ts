import { HydratedDocument } from 'mongoose';
export type IncidentReportDocument = HydratedDocument<IncidentReportSchema>;
export declare class IncidentReportSchema {
    id: string;
    pollingUnitId: string | null;
    type: string;
    description: string;
    severity: string;
    reportedBy: string | null;
    reportedAt: Date | null;
    status: string;
    legalEscalation: boolean;
    securityEscalation: boolean;
    notes: string | null;
}
export declare const IncidentReportSchemaFactory: import("mongoose").Schema<IncidentReportSchema, import("mongoose").Model<IncidentReportSchema, any, any, any, any, any, IncidentReportSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pollingUnitId?: import("mongoose").SchemaDefinitionProperty<string | null, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    severity?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    reportedBy?: import("mongoose").SchemaDefinitionProperty<string | null, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    reportedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    legalEscalation?: import("mongoose").SchemaDefinitionProperty<boolean, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    securityEscalation?: import("mongoose").SchemaDefinitionProperty<boolean, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, IncidentReportSchema>;
