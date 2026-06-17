import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DonationDocument = HydratedDocument<DonationSchema>;

@Schema({ collection: 'apm_donations', timestamps: true })
export class DonationSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  email!: string | null;

  @Prop({ type: String, default: null })
  phone!: string | null;

  @Prop({ type: Number, required: true })
  amount!: number;

  @Prop({ type: String, default: null })
  reference!: string | null;

  @Prop({ type: String, default: null })
  notes!: string | null;
}

export const DonationSchemaFactory = SchemaFactory.createForClass(DonationSchema);
