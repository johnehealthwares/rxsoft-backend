import { HydratedDocument } from 'mongoose';
export type EventRegistrationDocument = HydratedDocument<EventRegistrationSchema>;
export declare class EventRegistrationSchema {
    id: string;
    eventId: string;
    name: string;
    phone: string;
    email: string | null;
    lga: string | null;
    ward: string | null;
    attended: boolean;
}
export declare const EventRegistrationSchemaFactory: import("mongoose").Schema<EventRegistrationSchema, import("mongoose").Model<EventRegistrationSchema, any, any, any, any, any, EventRegistrationSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    eventId?: import("mongoose").SchemaDefinitionProperty<string, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string | null, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lga?: import("mongoose").SchemaDefinitionProperty<string | null, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    ward?: import("mongoose").SchemaDefinitionProperty<string | null, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    attended?: import("mongoose").SchemaDefinitionProperty<boolean, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, EventRegistrationSchema>;
