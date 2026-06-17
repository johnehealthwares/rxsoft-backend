import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RapidResponseDocument = HydratedDocument<RapidResponseSchema>;

@Schema({ collection: 'apm_rapid_responses', timestamps: true })
export class RapidResponseSchema {
  id!: string;

  @Prop({ type: String, required: true })
  mentionId!: string;

  @Prop({ type: String, default: 'rebuttal' })
  responseType!: string;

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: Date, default: null })
  publishedAt!: Date | null;

  @Prop({ type: String, default: null })
  publishedBy!: string | null;

  @Prop({ type: String, default: null })
  platform!: string | null;

  @Prop({ type: String, default: null })
  effectiveness!: string | null;
}

export const RapidResponseSchemaFactory = SchemaFactory.createForClass(RapidResponseSchema);
