import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VolunteerAssignmentDocument = HydratedDocument<VolunteerAssignmentSchema>;

@Schema({ collection: 'apm_volunteer_assignments', timestamps: true })
export class VolunteerAssignmentSchema {
  id!: string;

  @Prop({ type: String, required: true })
  volunteerId!: string;

  @Prop({ type: String, required: true })
  lgaId!: string;

  @Prop({ type: String, default: null })
  wardId!: string | null;

  @Prop({ type: String, default: null })
  role!: string | null;

  @Prop({ type: String, default: 'active' })
  status!: string;

  @Prop({ type: Date, default: null })
  assignedAt!: Date | null;

  @Prop({ type: String, default: null })
  notes!: string | null;
}

export const VolunteerAssignmentSchemaFactory = SchemaFactory.createForClass(VolunteerAssignmentSchema);
