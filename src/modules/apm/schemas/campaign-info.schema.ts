import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CampaignInfoDocument = HydratedDocument<CampaignInfoSchema>;

@Schema({ collection: 'apm_campaign_info', timestamps: true })
export class CampaignInfoSchema {
  id!: string;

  @Prop({ type: String, required: true })
  key!: string;

  @Prop({ type: String, required: true })
  value!: string;

  @Prop({ type: String, default: null })
  label!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const CampaignInfoSchemaFactory = SchemaFactory.createForClass(CampaignInfoSchema);
