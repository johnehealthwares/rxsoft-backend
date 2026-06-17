import { HydratedDocument } from 'mongoose';
export type PollingAgentDocument = HydratedDocument<PollingAgentSchema>;
export declare class PollingAgentSchema {
    id: string;
    pollingUnitId: string;
    name: string;
    phone: string;
    role: string;
    trainingStatus: string;
    assignedAt: Date | null;
    notes: string | null;
    isActive: boolean;
}
export declare const PollingAgentSchemaFactory: import("mongoose").Schema<PollingAgentSchema, import("mongoose").Model<PollingAgentSchema, any, any, any, any, any, PollingAgentSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    pollingUnitId?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    trainingStatus?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    assignedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, PollingAgentSchema>;
