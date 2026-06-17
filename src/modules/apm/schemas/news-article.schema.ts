import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsArticleDocument = HydratedDocument<NewsArticleSchema>;

@Schema({ collection: 'apm_news_articles', timestamps: true })
export class NewsArticleSchema {
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true, unique: true })
  slug!: string;

  @Prop({ type: String, default: null })
  excerpt!: string | null;

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: String, default: null })
  category!: string | null;

  @Prop({ type: String, default: null })
  authorName!: string | null;

  @Prop({ type: String, default: null })
  imageUrl!: string | null;

  @Prop({ type: String, default: null })
  videoUrl!: string | null;

  @Prop({ type: Boolean, default: false })
  isFeatured!: boolean;

  @Prop({ type: Boolean, default: false })
  isPublished!: boolean;

  @Prop({ type: Date, default: null })
  publishedAt!: Date | null;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const NewsArticleSchemaFactory = SchemaFactory.createForClass(NewsArticleSchema);
