import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CareerDocument = HydratedDocument<Career>;

@Schema({ timestamps: true, collection: 'ehealthwares_careers' })
export class Career {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  location: string;

  @Prop({ enum: ['full-time', 'contract', 'remote'], default: 'full-time' })
  type: string;

  @Prop()
  department: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const CareerSchema = SchemaFactory.createForClass(Career);
