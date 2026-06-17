import { HydratedDocument } from 'mongoose';
export type EventDocument = HydratedDocument<EventSchema>;
export declare class EventSchema {
    id: string;
    title: string;
    description: string | null;
    location: string | null;
    eventDate: Date | null;
    eventTime: string | null;
    category: string | null;
    imageUrl: string | null;
    maxAttendees: number | null;
    isPublished: boolean;
    deletedAt: Date | null;
}
export declare const EventSchemaFactory: import("mongoose").Schema<EventSchema, import("mongoose").Model<EventSchema, any, any, any, any, any, EventSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    eventDate?: import("mongoose").SchemaDefinitionProperty<Date | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    eventTime?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    maxAttendees?: import("mongoose").SchemaDefinitionProperty<number | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isPublished?: import("mongoose").SchemaDefinitionProperty<boolean, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, EventSchema>;
