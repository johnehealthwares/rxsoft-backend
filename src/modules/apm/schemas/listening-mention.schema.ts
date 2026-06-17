import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ListeningMentionDocument = HydratedDocument<ListeningMentionSchema>;

@Schema({ collection: 'apm_listening_mentions', timestamps: true })
export class ListeningMentionSchema {
  id!: string;

  @Prop({ type: String, required: true })
  platform!: string;

  @Prop({ type: String, default: null })
  mentionUrl!: string | null;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, default: null })
  content!: string | null;

  @Prop({ type: String, default: null })
  sentiment!: string | null;

  @Prop({ type: Number, default: 0 })
  reach!: number;

  @Prop({ type: Date, default: null })
  mentionedAt!: Date | null;

  @Prop({ type: String, default: null })
  source!: string | null;

  @Prop({ type: String, default: null })
  category!: string | null;

  @Prop({ type: Boolean, default: false })
  isUrgent!: boolean;

  @Prop({ type: String, default: 'new' })
  status!: string;
}

export const ListeningMentionSchemaFactory = SchemaFactory.createForClass(ListeningMentionSchema);
