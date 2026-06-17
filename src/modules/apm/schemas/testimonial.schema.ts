import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestimonialDocument = HydratedDocument<TestimonialSchema>;

@Schema({ collection: 'apm_testimonials', timestamps: true })
export class TestimonialSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  text!: string;

  @Prop({ type: String, default: null })
  focus!: string | null;

  @Prop({ type: String, default: null })
  avatarUrl!: string | null;

  @Prop({ type: Boolean, default: true })
  isVerified!: boolean;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const TestimonialSchemaFactory = SchemaFactory.createForClass(TestimonialSchema);
