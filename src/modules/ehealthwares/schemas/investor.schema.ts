import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvestorDataDocument = HydratedDocument<InvestorData>;

@Schema({ timestamps: true, collection: 'ehealthwares_investor_data' })
export class InvestorData {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  value: string;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const InvestorDataSchema = SchemaFactory.createForClass(InvestorData);
