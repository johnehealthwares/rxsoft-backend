import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResultEntryDocument = HydratedDocument<ResultEntrySchema>;

@Schema({ collection: 'apm_result_entries', timestamps: true })
export class ResultEntrySchema {
  id!: string;

  @Prop({ type: String, required: true })
  pollingUnitId!: string;

  @Prop({ type: String, required: true })
  lgaId!: string;

  @Prop({ type: String, required: true })
  wardId!: string;

  @Prop({ type: Number, default: 0 })
  apmVotes!: number;

  @Prop({ type: Number, default: 0 })
  pdpVotes!: number;

  @Prop({ type: Number, default: 0 })
  apcVotes!: number;

  @Prop({ type: Number, default: 0 })
  otherVotes!: number;

  @Prop({ type: Number, default: 0 })
  totalVotes!: number;

  @Prop({ type: Number, default: 0 })
  registeredVoters!: number;

  @Prop({ type: String, default: null })
  photoUrl!: string | null;

  @Prop({ type: String, default: null })
  enteredBy!: string | null;

  @Prop({ type: String, default: 'draft' })
  status!: string;

  @Prop({ type: String, default: null })
  notes!: string | null;
}

export const ResultEntrySchemaFactory = SchemaFactory.createForClass(ResultEntrySchema);
