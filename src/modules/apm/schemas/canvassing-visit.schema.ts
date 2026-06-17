import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CanvassingVisitDocument = HydratedDocument<CanvassingVisitSchema>;

@Schema({ collection: 'apm_canvassing_visits', timestamps: true })
export class CanvassingVisitSchema {
  id!: string;

  @Prop({ type: String, required: true })
  sessionId!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  phone!: string | null;

  @Prop({ type: String, default: null })
  address!: string | null;

  @Prop({ type: String, default: null })
  supportLevel!: string | null;

  @Prop({ type: String, default: null })
  issues!: string | null;

  @Prop({ type: String, default: null })
  outcome!: string | null;

  @Prop({ type: Date, default: null })
  contactedAt!: Date | null;
}

export const CanvassingVisitSchemaFactory = SchemaFactory.createForClass(CanvassingVisitSchema);
