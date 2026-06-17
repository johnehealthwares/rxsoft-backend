import { HydratedDocument } from 'mongoose';
export type WhatsAppGroupDocument = HydratedDocument<WhatsAppGroupSchema>;
export declare class WhatsAppGroupSchema {
    id: string;
    level: string;
    name: string;
    parentId: string | null;
    description: string | null;
    groupLink: string | null;
    adminName: string | null;
    adminPhone: string | null;
    memberCount: number;
    isActive: boolean;
}
export declare const WhatsAppGroupSchemaFactory: import("mongoose").Schema<WhatsAppGroupSchema, import("mongoose").Model<WhatsAppGroupSchema, any, any, any, any, any, WhatsAppGroupSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    level?: import("mongoose").SchemaDefinitionProperty<string, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    parentId?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    groupLink?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    adminName?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    adminPhone?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    memberCount?: import("mongoose").SchemaDefinitionProperty<number, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, WhatsAppGroupSchema>;
