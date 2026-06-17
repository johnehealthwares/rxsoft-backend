import { HydratedDocument } from 'mongoose';
export type IssueReportDocument = HydratedDocument<IssueReportSchema>;
export declare class IssueReportSchema {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    lga: string | null;
    ward: string | null;
    category: string | null;
    description: string;
    status: string | null;
}
export declare const IssueReportSchemaFactory: import("mongoose").Schema<IssueReportSchema, import("mongoose").Model<IssueReportSchema, any, any, any, any, any, IssueReportSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    lga?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    ward?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, IssueReportSchema>;
