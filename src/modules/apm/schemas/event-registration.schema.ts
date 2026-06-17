import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventRegistrationDocument = HydratedDocument<EventRegistrationSchema>;

@Schema({ collection: 'apm_event_registrations', timestamps: true })
export class EventRegistrationSchema {
  id!: string;

  @Prop({ type: String, required: true })
  eventId!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  phone!: string;

  @Prop({ type: String, default: null })
  email!: string | null;

  @Prop({ type: String, default: null })
  lga!: string | null;

  @Prop({ type: String, default: null })
  ward!: string | null;

  @Prop({ type: Boolean, default: false })
  attended!: boolean;
}

export const EventRegistrationSchemaFactory = SchemaFactory.createForClass(EventRegistrationSchema);
