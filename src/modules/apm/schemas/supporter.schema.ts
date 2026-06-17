import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupporterDocument = HydratedDocument<SupporterSchema>;

@Schema({ collection: 'apm_supporters', timestamps: true })
export class SupporterSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  phone!: string;

  @Prop({ type: String, default: null })
  email!: string | null;

  @Prop({ type: String, default: null })
  lga!: string | null;

  @Prop({ type: String, default: null })
  ward!: string | null;

  @Prop({ type: String, default: null })
  interests!: string | null;

  @Prop({ type: String, default: null })
  skills!: string | null;

  @Prop({ type: String, default: null })
  source!: string | null;
}

export const SupporterSchemaFactory = SchemaFactory.createForClass(SupporterSchema);
