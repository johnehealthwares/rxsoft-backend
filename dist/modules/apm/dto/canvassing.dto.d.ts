export declare class CreateCanvassingSessionDto {
    title: string;
    lgaId: string;
    wardId?: string;
    teamLead?: string;
    teamSize?: number;
    scheduledDate?: string;
    notes?: string;
}
export declare class UpdateCanvassingSessionDto {
    title?: string;
    status?: string;
    teamLead?: string;
    teamSize?: number;
    completedDate?: string;
    notes?: string;
}
export declare class CreateCanvassingVisitDto {
    name: string;
    phone?: string;
    address?: string;
    supportLevel?: string;
    issues?: string;
    outcome?: string;
    contactedAt?: string;
}
export declare class CreateVolunteerAssignmentDto {
    volunteerId: string;
    lgaId: string;
    wardId?: string;
    role?: string;
    notes?: string;
}
export declare class UpdateVolunteerAssignmentDto {
    wardId?: string;
    role?: string;
    status?: string;
    notes?: string;
}
