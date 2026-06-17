export declare class IncidentReportOrmEntity {
    id: string;
    pollingUnitId: string | null;
    type: string;
    description: string;
    severity: string;
    reportedBy: string | null;
    reportedAt: Date | null;
    status: string;
    legalEscalation: boolean;
    securityEscalation: boolean;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}
