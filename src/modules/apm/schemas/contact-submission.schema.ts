import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactSubmissionDocument = HydratedDocument<ContactSubmissionSchema>;

@Schema({ collection: 'apm_contact_submissions', timestamps: true })
export class ContactSubmissionSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({ type: String, default: null })
  phone!: string | null;

  @Prop({ type: String, required: true })
  subject!: string;

  @Prop({ type: String, required: true })
  message!: string;

  @Prop({ type: Boolean, default: false })
  read!: boolean;
}

export const ContactSubmissionSchemaFactory = SchemaFactory.createForClass(ContactSubmissionSchema);
