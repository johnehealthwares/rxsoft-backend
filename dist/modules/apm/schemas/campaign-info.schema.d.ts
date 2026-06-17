import { HydratedDocument } from 'mongoose';
export type CampaignInfoDocument = HydratedDocument<CampaignInfoSchema>;
export declare class CampaignInfoSchema {
    id: string;
    key: string;
    value: string;
    label: string | null;
    displayOrder: number;
    isActive: boolean;
}
export declare const CampaignInfoSchemaFactory: import("mongoose").Schema<CampaignInfoSchema, import("mongoose").Model<CampaignInfoSchema, any, any, any, any, any, CampaignInfoSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    key?: import("mongoose").SchemaDefinitionProperty<string, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    value?: import("mongoose").SchemaDefinitionProperty<string, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    label?: import("mongoose").SchemaDefinitionProperty<string | null, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, CampaignInfoSchema>;
