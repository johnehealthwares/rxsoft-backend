import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true, collection: 'ehealthwares_articles' })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  excerpt: string;

  @Prop()
  body: string;

  @Prop()
  imageUrl: string;

  @Prop()
  category: string;

  @Prop()
  publishedAt: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
