import { HydratedDocument } from 'mongoose';
export type TestimonialDocument = HydratedDocument<TestimonialSchema>;
export declare class TestimonialSchema {
    id: string;
    name: string;
    text: string;
    focus: string | null;
    avatarUrl: string | null;
    isVerified: boolean;
    displayOrder: number;
    isActive: boolean;
    deletedAt: Date | null;
}
export declare const TestimonialSchemaFactory: import("mongoose").Schema<TestimonialSchema, import("mongoose").Model<TestimonialSchema, any, any, any, any, any, TestimonialSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    text?: import("mongoose").SchemaDefinitionProperty<string, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    focus?: import("mongoose").SchemaDefinitionProperty<string | null, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    avatarUrl?: import("mongoose").SchemaDefinitionProperty<string | null, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isVerified?: import("mongoose").SchemaDefinitionProperty<boolean, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, TestimonialSchema>;
