export declare class CreateStakeholderDto {
    name: string;
    phone?: string;
    email?: string;
    role?: string;
    lgaId: string;
    wardId?: string;
    affiliation?: string;
    influenceLevel?: string;
    conversionStatus?: string;
    notes?: string;
}
export declare class UpdateStakeholderDto {
    name?: string;
    phone?: string;
    email?: string;
    role?: string;
    lgaId?: string;
    wardId?: string;
    affiliation?: string;
    influenceLevel?: string;
    conversionStatus?: string;
    notes?: string;
}
export declare class CreateConversionActivityDto {
    type: string;
    notes?: string;
    outcome?: string;
    conductedBy?: string;
    conductedAt?: string;
    followUpDate?: string;
}
export declare class UpdateConversionScoreDto {
    score: number;
    status?: string;
    assessedBy?: string;
    notes?: string;
}
export declare class UpdatePollingUnitDto {
    name?: string;
    registeredVoters?: number;
    pastResultApm?: number;
    pastResultPdp?: number;
    pastResultApc?: number;
    pastResultOther?: number;
    riskLevel?: string;
    conversionStatus?: string;
    assignedAgentName?: string;
    assignedAgentPhone?: string;
    notes?: string;
}
export declare class CreateWhatsAppGroupDto {
    level: string;
    name: string;
    parentId?: string;
    description?: string;
    groupLink?: string;
    adminName?: string;
    adminPhone?: string;
    memberCount?: number;
}
