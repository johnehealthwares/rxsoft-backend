import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<EventSchema>;

@Schema({ collection: 'apm_events', timestamps: true })
export class EventSchema {
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: String, default: null })
  location!: string | null;

  @Prop({ type: Date, default: null })
  eventDate!: Date | null;

  @Prop({ type: String, default: null })
  eventTime!: string | null;

  @Prop({ type: String, default: null })
  category!: string | null;

  @Prop({ type: String, default: null })
  imageUrl!: string | null;

  @Prop({ type: Number, default: null })
  maxAttendees!: number | null;

  @Prop({ type: Boolean, default: false })
  isPublished!: boolean;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const EventSchemaFactory = SchemaFactory.createForClass(EventSchema);
