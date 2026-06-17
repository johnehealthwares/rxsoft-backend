import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsletterSubscriberDocument = HydratedDocument<NewsletterSubscriberSchema>;

@Schema({ collection: 'apm_newsletter_subscribers', timestamps: true })
export class NewsletterSubscriberSchema {
  id!: string;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({ type: String, default: null })
  phone!: string | null;

  @Prop({ type: Boolean, default: true })
  subscribed!: boolean;
}

export const NewsletterSubscriberSchemaFactory = SchemaFactory.createForClass(NewsletterSubscriberSchema);
