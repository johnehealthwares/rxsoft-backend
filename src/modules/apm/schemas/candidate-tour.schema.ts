import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CandidateTourDocument = HydratedDocument<CandidateTourSchema>;

@Schema({ collection: 'apm_candidate_tours', timestamps: true })
export class CandidateTourSchema {
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  lgaId!: string;

  @Prop({ type: String, default: null })
  wardId!: string | null;

  @Prop({ type: String, default: 'rally' })
  visitType!: string;

  @Prop({ type: Date, default: null })
  tourDate!: Date | null;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: Number, default: 0 })
  expectedAttendees!: number;

  @Prop({ type: Number, default: 0 })
  actualAttendees!: number;

  @Prop({ type: String, default: null })
  stakeholdersMet!: string | null;

  @Prop({ type: String, default: null })
  commitments!: string | null;

  @Prop({ type: String, default: null })
  complaints!: string | null;

  @Prop({ type: Number, default: 0 })
  volunteerSignups!: number;

  @Prop({ type: String, default: null })
  mediaCoverage!: string | null;

  @Prop({ type: String, default: null })
  notes!: string | null;

  @Prop({ type: String, default: 'planned' })
  status!: string;
}

export const CandidateTourSchemaFactory = SchemaFactory.createForClass(CandidateTourSchema);
