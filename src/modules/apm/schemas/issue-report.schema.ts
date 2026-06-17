import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IssueReportDocument = HydratedDocument<IssueReportSchema>;

@Schema({ collection: 'apm_issue_reports', timestamps: true })
export class IssueReportSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  phone!: string | null;

  @Prop({ type: String, default: null })
  email!: string | null;

  @Prop({ type: String, default: null })
  lga!: string | null;

  @Prop({ type: String, default: null })
  ward!: string | null;

  @Prop({ type: String, default: null })
  category!: string | null;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: String, default: null })
  status!: string | null;
}

export const IssueReportSchemaFactory = SchemaFactory.createForClass(IssueReportSchema);
