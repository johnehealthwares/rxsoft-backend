import { HydratedDocument } from 'mongoose';
export type ContactSubmissionDocument = HydratedDocument<ContactSubmissionSchema>;
export declare class ContactSubmissionSchema {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    read: boolean;
}
export declare const ContactSubmissionSchemaFactory: import("mongoose").Schema<ContactSubmissionSchema, import("mongoose").Model<ContactSubmissionSchema, any, any, any, any, any, ContactSubmissionSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string | null, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    subject?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    read?: import("mongoose").SchemaDefinitionProperty<boolean, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, ContactSubmissionSchema>;
