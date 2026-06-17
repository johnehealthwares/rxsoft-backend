import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgendaItemDocument = HydratedDocument<AgendaItemSchema>;

@Schema({ collection: 'apm_agenda_items', timestamps: true })
export class AgendaItemSchema {
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, default: null })
  summary!: string | null;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: String, default: null })
  icon!: string | null;

  @Prop({ type: String, default: null })
  imageUrl!: string | null;

  @Prop({ type: String, default: null })
  category!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const AgendaItemSchemaFactory = SchemaFactory.createForClass(AgendaItemSchema);
