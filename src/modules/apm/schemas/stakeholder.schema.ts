import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StakeholderDocument = HydratedDocument<StakeholderSchema>;

@Schema({ collection: 'apm_stakeholders', timestamps: true })
export class StakeholderSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  phone!: string | null;

  @Prop({ type: String, default: null })
  email!: string | null;

  @Prop({ type: String, default: null })
  role!: string | null;

  @Prop({ type: String, required: true })
  lgaId!: string;

  @Prop({ type: String, default: null })
  wardId!: string | null;

  @Prop({ type: String, default: null })
  affiliation!: string | null;

  @Prop({ type: String, default: 'medium' })
  influenceLevel!: string;

  @Prop({ type: String, default: 'untouched' })
  conversionStatus!: string;

  @Prop({ type: String, default: null })
  notes!: string | null;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const StakeholderSchemaFactory = SchemaFactory.createForClass(StakeholderSchema);
