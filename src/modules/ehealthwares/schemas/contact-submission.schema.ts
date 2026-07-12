import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactSubmissionDocument = HydratedDocument<ContactSubmission>;

@Schema({ collection: 'ehealthwares_contact_submissions', timestamps: true })
export class ContactSubmission {
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

export const ContactSubmissionSchema = SchemaFactory.createForClass(ContactSubmission);
