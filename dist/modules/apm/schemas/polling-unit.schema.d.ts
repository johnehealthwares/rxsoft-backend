import { HydratedDocument } from 'mongoose';
export type PollingUnitDocument = HydratedDocument<PollingUnitSchema>;
export declare class PollingUnitSchema {
    id: string;
    code: string;
    name: string;
    wardId: string;
    lgaId: string;
    registeredVoters: number;
    pastResultApm: number;
    pastResultPdp: number;
    pastResultApc: number;
    pastResultOther: number;
    latitude: string | null;
    longitude: string | null;
    riskLevel: string;
    conversionStatus: string;
    assignedAgentName: string | null;
    assignedAgentPhone: string | null;
    notes: string | null;
    isActive: boolean;
}
export declare const PollingUnitSchemaFactory: import("mongoose").Schema<PollingUnitSchema, import("mongoose").Model<PollingUnitSchema, any, any, any, any, any, PollingUnitSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    code?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    wardId?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lgaId?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    registeredVoters?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pastResultApm?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pastResultPdp?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pastResultApc?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pastResultOther?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    latitude?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    longitude?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    riskLevel?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    conversionStatus?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    assignedAgentName?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    assignedAgentPhone?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, PollingUnitSchema>;
