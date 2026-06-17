import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContentAssetDocument = HydratedDocument<ContentAssetSchema>;

@Schema({ collection: 'apm_content_assets', timestamps: true })
export class ContentAssetSchema {
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  type!: string;

  @Prop({ type: String, default: null })
  lgaId!: string | null;

  @Prop({ type: String, default: null })
  targetAudience!: string | null;

  @Prop({ type: String, default: null })
  messageKey!: string | null;

  @Prop({ type: String, required: true })
  assetUrl!: string;

  @Prop({ type: String, default: null })
  language!: string | null;

  @Prop({ type: String, default: null })
  tags!: string | null;

  @Prop({ type: String, default: 'draft' })
  status!: string;
}

export const ContentAssetSchemaFactory = SchemaFactory.createForClass(ContentAssetSchema);
