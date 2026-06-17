import { HydratedDocument } from 'mongoose';
export type AchievementDocument = HydratedDocument<AchievementSchema>;
export declare class AchievementSchema {
    id: string;
    title: string;
    summary: string | null;
    description: string | null;
    category: string | null;
    statLabel: string | null;
    statValue: string | null;
    imageUrl: string | null;
    displayOrder: number;
    isActive: boolean;
    deletedAt: Date | null;
}
export declare const AchievementSchemaFactory: import("mongoose").Schema<AchievementSchema, import("mongoose").Model<AchievementSchema, any, any, any, any, any, AchievementSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    summary?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    statLabel?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    statValue?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, AchievementSchema>;
