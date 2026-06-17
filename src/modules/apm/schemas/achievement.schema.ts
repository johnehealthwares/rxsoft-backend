import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AchievementDocument = HydratedDocument<AchievementSchema>;

@Schema({ collection: 'apm_achievements', timestamps: true })
export class AchievementSchema {
  id!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, default: null })
  summary!: string | null;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: String, default: null })
  category!: string | null;

  @Prop({ type: String, default: null })
  statLabel!: string | null;

  @Prop({ type: String, default: null })
  statValue!: string | null;

  @Prop({ type: String, default: null })
  imageUrl!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const AchievementSchemaFactory = SchemaFactory.createForClass(AchievementSchema);
