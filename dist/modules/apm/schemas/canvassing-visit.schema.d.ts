import { HydratedDocument } from 'mongoose';
export type CanvassingVisitDocument = HydratedDocument<CanvassingVisitSchema>;
export declare class CanvassingVisitSchema {
    id: string;
    sessionId: string;
    name: string;
    phone: string | null;
    address: string | null;
    supportLevel: string | null;
    issues: string | null;
    outcome: string | null;
    contactedAt: Date | null;
}
export declare const CanvassingVisitSchemaFactory: import("mongoose").Schema<CanvassingVisitSchema, import("mongoose").Model<CanvassingVisitSchema, any, any, any, any, any, CanvassingVisitSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    sessionId?: import("mongoose").SchemaDefinitionProperty<string, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    supportLevel?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    issues?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    outcome?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    contactedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, CanvassingVisitSchema>;
