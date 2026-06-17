import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IncidentReportDocument = HydratedDocument<IncidentReportSchema>;

@Schema({ collection: 'apm_incident_reports', timestamps: true })
export class IncidentReportSchema {
  id!: string;

  @Prop({ type: String, default: null })
  pollingUnitId!: string | null;

  @Prop({ type: String, required: true })
  type!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: String, default: 'medium' })
  severity!: string;

  @Prop({ type: String, default: null })
  reportedBy!: string | null;

  @Prop({ type: Date, default: null })
  reportedAt!: Date | null;

  @Prop({ type: String, default: 'open' })
  status!: string;

  @Prop({ type: Boolean, default: false })
  legalEscalation!: boolean;

  @Prop({ type: Boolean, default: false })
  securityEscalation!: boolean;

  @Prop({ type: String, default: null })
  notes!: string | null;
}

export const IncidentReportSchemaFactory = SchemaFactory.createForClass(IncidentReportSchema);
