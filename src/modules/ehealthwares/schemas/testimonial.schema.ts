import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema({ collection: 'ehealthwares_testimonials', timestamps: true })
export class Testimonial {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  role!: string | null;

  @Prop({ type: String, default: null })
  company!: string | null;

  @Prop({ type: String, required: true })
  text!: string;

  @Prop({ type: String, default: null })
  avatarUrl!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
