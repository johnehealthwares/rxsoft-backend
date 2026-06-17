import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PollingUnitDocument = HydratedDocument<PollingUnitSchema>;

@Schema({ collection: 'apm_polling_units', timestamps: true })
export class PollingUnitSchema {
  id!: string;

  @Prop({ type: String, required: true, unique: true })
  code!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  wardId!: string;

  @Prop({ type: String, required: true })
  lgaId!: string;

  @Prop({ type: Number, default: 0 })
  registeredVoters!: number;

  @Prop({ type: Number, default: 0 })
  pastResultApm!: number;

  @Prop({ type: Number, default: 0 })
  pastResultPdp!: number;

  @Prop({ type: Number, default: 0 })
  pastResultApc!: number;

  @Prop({ type: Number, default: 0 })
  pastResultOther!: number;

  @Prop({ type: String, default: null })
  latitude!: string | null;

  @Prop({ type: String, default: null })
  longitude!: string | null;

  @Prop({ type: String, default: 'grey' })
  riskLevel!: string;

  @Prop({ type: String, default: 'untouched' })
  conversionStatus!: string;

  @Prop({ type: String, default: null })
  assignedAgentName!: string | null;

  @Prop({ type: String, default: null })
  assignedAgentPhone!: string | null;

  @Prop({ type: String, default: null })
  notes!: string | null;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const PollingUnitSchemaFactory = SchemaFactory.createForClass(PollingUnitSchema);
