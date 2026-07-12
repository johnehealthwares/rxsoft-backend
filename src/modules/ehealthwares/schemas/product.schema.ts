import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'ehealthwares_products', timestamps: true })
export class Product {
  id!: string;

  @Prop({ type: String, required: true, unique: true })
  slug!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  tagline!: string | null;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: [String], default: [] })
  features!: string[];

  @Prop({ type: String, default: null })
  iconName!: string | null;

  @Prop({ type: String, default: null })
  imageUrl!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;

  @Prop({ type: String, default: null })
  metaTitle!: string | null;

  @Prop({ type: String, default: null })
  metaDescription!: string | null;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
