import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WhatsAppGroupDocument = HydratedDocument<WhatsAppGroupSchema>;

@Schema({ collection: 'apm_whatsapp_groups', timestamps: true })
export class WhatsAppGroupSchema {
  id!: string;

  @Prop({ type: String, required: true })
  level!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  parentId!: string | null;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: String, default: null })
  groupLink!: string | null;

  @Prop({ type: String, default: null })
  adminName!: string | null;

  @Prop({ type: String, default: null })
  adminPhone!: string | null;

  @Prop({ type: Number, default: 0 })
  memberCount!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const WhatsAppGroupSchemaFactory = SchemaFactory.createForClass(WhatsAppGroupSchema);
