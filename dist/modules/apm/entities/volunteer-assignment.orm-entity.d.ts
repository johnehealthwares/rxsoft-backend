export declare class VolunteerAssignmentOrmEntity {
    id: string;
    volunteerId: string;
    lgaId: string;
    wardId: string | null;
    role: string | null;
    status: string;
    assignedAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}
