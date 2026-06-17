import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CanvassingSessionDocument = HydratedDocument<CanvassingSessionSchema>;

@Schema({ collection: 'apm_canvassing_sessions', timestamps: true })
export class CanvassingSessionSchema {
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  lgaId!: string;

  @Prop({ type: String, default: null })
  wardId!: string | null;

  @Prop({ type: String, default: null })
  teamLead!: string | null;

  @Prop({ type: Number, default: 1 })
  teamSize!: number;

  @Prop({ type: String, default: 'planned' })
  status!: string;

  @Prop({ type: Date, default: null })
  scheduledDate!: Date | null;

  @Prop({ type: Date, default: null })
  completedDate!: Date | null;

  @Prop({ type: String, default: null })
  notes!: string | null;
}

export const CanvassingSessionSchemaFactory = SchemaFactory.createForClass(CanvassingSessionSchema);
