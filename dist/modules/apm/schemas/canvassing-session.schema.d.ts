import { HydratedDocument } from 'mongoose';
export type CanvassingSessionDocument = HydratedDocument<CanvassingSessionSchema>;
export declare class CanvassingSessionSchema {
    id: string;
    title: string;
    lgaId: string;
    wardId: string | null;
    teamLead: string | null;
    teamSize: number;
    status: string;
    scheduledDate: Date | null;
    completedDate: Date | null;
    notes: string | null;
}
export declare const CanvassingSessionSchemaFactory: import("mongoose").Schema<CanvassingSessionSchema, import("mongoose").Model<CanvassingSessionSchema, any, any, any, any, any, CanvassingSessionSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lgaId?: import("mongoose").SchemaDefinitionProperty<string, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    wardId?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    teamLead?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    teamSize?: import("mongoose").SchemaDefinitionProperty<number, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    scheduledDate?: import("mongoose").SchemaDefinitionProperty<Date | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    completedDate?: import("mongoose").SchemaDefinitionProperty<Date | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, CanvassingSessionSchema>;
