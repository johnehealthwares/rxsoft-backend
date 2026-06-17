import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MediaAssetDocument = HydratedDocument<MediaAssetSchema>;

@Schema({ collection: 'apm_media_assets', timestamps: true })
export class MediaAssetSchema {
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: String, required: true })
  type!: string;

  @Prop({ type: String, required: true })
  assetUrl!: string;

  @Prop({ type: String, default: null })
  thumbnailUrl!: string | null;

  @Prop({ type: String, default: null })
  category!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const MediaAssetSchemaFactory = SchemaFactory.createForClass(MediaAssetSchema);
