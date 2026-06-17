import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PollingAgentDocument = HydratedDocument<PollingAgentSchema>;

@Schema({ collection: 'apm_polling_agents', timestamps: true })
export class PollingAgentSchema {
  id!: string;

  @Prop({ type: String, required: true })
  pollingUnitId!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  phone!: string;

  @Prop({ type: String, default: 'agent' })
  role!: string;

  @Prop({ type: String, default: 'untrained' })
  trainingStatus!: string;

  @Prop({ type: Date, default: null })
  assignedAt!: Date | null;

  @Prop({ type: String, default: null })
  notes!: string | null;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const PollingAgentSchemaFactory = SchemaFactory.createForClass(PollingAgentSchema);
