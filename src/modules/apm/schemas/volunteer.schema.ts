import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VolunteerDocument = HydratedDocument<VolunteerSchema>;

@Schema({ collection: 'apm_volunteers', timestamps: true })
export class VolunteerSchema {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  phone!: string;

  @Prop({ type: String, default: null })
  email!: string | null;

  @Prop({ type: String, default: null })
  lga!: string | null;

  @Prop({ type: String, default: null })
  ward!: string | null;

  @Prop({ type: String, default: null })
  pollingUnit!: string | null;

  @Prop({ type: String, default: null })
  skills!: string | null;

  @Prop({ type: String, default: null })
  interests!: string | null;

  @Prop({ type: String, default: null })
  availability!: string | null;

  @Prop({ type: Boolean, default: false })
  onboarded!: boolean;
}

export const VolunteerSchemaFactory = SchemaFactory.createForClass(VolunteerSchema);
