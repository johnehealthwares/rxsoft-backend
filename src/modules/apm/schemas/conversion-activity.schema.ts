import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConversionActivityDocument = HydratedDocument<ConversionActivitySchema>;

@Schema({ collection: 'apm_conversion_activities', timestamps: true })
export class ConversionActivitySchema {
  id!: string;

  @Prop({ type: String, required: true })
  stakeholderId!: string;

  @Prop({ type: String, required: true })
  type!: string;

  @Prop({ type: String, default: null })
  notes!: string | null;

  @Prop({ type: String, default: null })
  outcome!: string | null;

  @Prop({ type: String, default: null })
  conductedBy!: string | null;

  @Prop({ type: Date, default: null })
  conductedAt!: Date | null;

  @Prop({ type: Date, default: null })
  followUpDate!: Date | null;
}

export const ConversionActivitySchemaFactory = SchemaFactory.createForClass(ConversionActivitySchema);
