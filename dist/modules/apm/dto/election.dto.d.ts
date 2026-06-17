export declare class CreatePollingAgentDto {
    pollingUnitId: string;
    name: string;
    phone: string;
    role?: string;
}
export declare class UpdatePollingAgentDto {
    name?: string;
    phone?: string;
    role?: string;
    trainingStatus?: string;
    notes?: string;
    isActive?: boolean;
}
export declare class CreateResultEntryDto {
    pollingUnitId: string;
    lgaId: string;
    wardId: string;
    apmVotes: number;
    pdpVotes: number;
    apcVotes: number;
    otherVotes?: number;
    registeredVoters: number;
    photoUrl?: string;
    enteredBy?: string;
    notes?: string;
}
export declare class CreateIncidentReportDto {
    pollingUnitId?: string;
    type: string;
    description: string;
    severity?: string;
    reportedBy?: string;
}
export declare class UpdateIncidentReportDto {
    status?: string;
    legalEscalation?: boolean;
    securityEscalation?: boolean;
    notes?: string;
}
export declare class CreateGotvRecordDto {
    pollingUnitId: string;
    supporterName: string;
    supporterPhone?: string;
    contactedVia?: string;
    notes?: string;
}
export declare class UpdateGotvRecordDto {
    contacted?: boolean;
    turnedOut?: boolean;
    contactedVia?: string;
    notes?: string;
}
