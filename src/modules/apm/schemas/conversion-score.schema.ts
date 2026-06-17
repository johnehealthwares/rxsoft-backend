import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConversionScoreDocument = HydratedDocument<ConversionScoreSchema>;

@Schema({ collection: 'apm_conversion_scores', timestamps: true })
export class ConversionScoreSchema {
  id!: string;

  @Prop({ type: String, required: true })
  entityType!: string;

  @Prop({ type: String, required: true })
  entityId!: string;

  @Prop({ type: Number, default: 0 })
  score!: number;

  @Prop({ type: String, default: 'grey' })
  status!: string;

  @Prop({ type: Date, default: null })
  lastAssessedAt!: Date | null;

  @Prop({ type: String, default: null })
  assessedBy!: string | null;

  @Prop({ type: String, default: null })
  notes!: string | null;
}

export const ConversionScoreSchemaFactory = SchemaFactory.createForClass(ConversionScoreSchema);
