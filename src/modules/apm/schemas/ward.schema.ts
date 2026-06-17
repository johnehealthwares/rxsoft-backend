import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WardDocument = HydratedDocument<WardSchema>;

@Schema({ collection: 'apm_wards', timestamps: true })
export class WardSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true, unique: true })
  code!: string;

  @Prop({ type: String, required: true })
  lgaId!: string;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const WardSchemaFactory = SchemaFactory.createForClass(WardSchema);
