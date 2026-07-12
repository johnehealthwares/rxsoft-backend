import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartnerDocument = HydratedDocument<Partner>;

@Schema({ collection: 'ehealthwares_partners', timestamps: true })
export class Partner {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  logoUrl!: string | null;

  @Prop({ type: String, default: null })
  websiteUrl!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
