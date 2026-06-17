import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LgaDocument = HydratedDocument<LgaSchema>;

@Schema({ collection: 'apm_lgas', timestamps: true })
export class LgaSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true, unique: true })
  code!: string;

  @Prop({ type: String, default: null })
  region!: string | null;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const LgaSchemaFactory = SchemaFactory.createForClass(LgaSchema);
