import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SiteSectionDocument = HydratedDocument<SiteSection>;

@Schema({ collection: 'ehealthwares_site_sections', timestamps: true })
export class SiteSection {
  id!: string;

  @Prop({ type: String, required: true, unique: true })
  key!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, default: null })
  subtitle!: string | null;

  @Prop({ type: String, default: null })
  content!: string | null;

  @Prop({ type: String, default: null })
  imageUrl!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const SiteSectionSchema = SchemaFactory.createForClass(SiteSection);
