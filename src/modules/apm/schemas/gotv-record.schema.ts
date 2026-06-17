import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GotvRecordDocument = HydratedDocument<GotvRecordSchema>;

@Schema({ collection: 'apm_gotv_records', timestamps: true })
export class GotvRecordSchema {
  id!: string;

  @Prop({ type: String, required: true })
  pollingUnitId!: string;

  @Prop({ type: String, required: true })
  supporterName!: string;

  @Prop({ type: String, default: null })
  supporterPhone!: string | null;

  @Prop({ type: Boolean, default: false })
  contacted!: boolean;

  @Prop({ type: Boolean, default: false })
  turnedOut!: boolean;

  @Prop({ type: String, default: null })
  contactedVia!: string | null;

  @Prop({ type: Date, default: null })
  contactedAt!: Date | null;

  @Prop({ type: String, default: null })
  notes!: string | null;
}

export const GotvRecordSchemaFactory = SchemaFactory.createForClass(GotvRecordSchema);
