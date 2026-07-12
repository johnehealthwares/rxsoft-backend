import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamMemberDocument = HydratedDocument<TeamMember>;

@Schema({ collection: 'ehealthwares_team_members', timestamps: true })
export class TeamMember {
  id!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: null })
  role!: string | null;

  @Prop({ type: String, default: null })
  bio!: string | null;

  @Prop({ type: String, default: null })
  imageUrl!: string | null;

  @Prop({ type: Number, default: 0 })
  displayOrder!: number;

  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
