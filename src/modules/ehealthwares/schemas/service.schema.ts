import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema({ collection: 'ehealthwares_services', timestamps: true })
export class Service {
  id!: string;

  @Prop({ type: String, required: true, unique: true })
  slug!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  tagline!: string | null;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: String, default: null })
  iconName!: string | null;

  @Prop({ type: String, default: null })
  imageUrl!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
