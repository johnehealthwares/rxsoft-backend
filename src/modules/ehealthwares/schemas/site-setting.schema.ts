import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SiteSettingDocument = HydratedDocument<SiteSetting>;

@Schema({ collection: 'ehealthwares_site_settings', timestamps: true })
export class SiteSetting {
  id!: string;

  @Prop({ type: String, required: true, unique: true })
  key!: string;

  @Prop({ type: Object, required: true })
  value!: Record<string, unknown>;
}

export const SiteSettingSchema = SchemaFactory.createForClass(SiteSetting);
