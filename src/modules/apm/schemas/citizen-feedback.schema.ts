import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CitizenFeedbackDocument = HydratedDocument<CitizenFeedbackSchema>;

@Schema({ collection: 'apm_citizen_feedback', timestamps: true })
export class CitizenFeedbackSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  phone!: string | null;

  @Prop({ type: String, default: null })
  email!: string | null;

  @Prop({ type: String, default: null })
  lga!: string | null;

  @Prop({ type: String, required: true })
  message!: string;

  @Prop({ type: String, default: null })
  sentiment!: string | null;

  @Prop({ type: String, default: null })
  topic!: string | null;
}

export const CitizenFeedbackSchemaFactory = SchemaFactory.createForClass(CitizenFeedbackSchema);
