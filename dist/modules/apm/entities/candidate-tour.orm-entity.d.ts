export declare class CandidateTourOrmEntity {
    id: string;
    title: string;
    lgaId: string;
    wardId: string | null;
    visitType: string;
    tourDate: Date | null;
    description: string | null;
    expectedAttendees: number;
    actualAttendees: number;
    stakeholdersMet: string | null;
    commitments: string | null;
    complaints: string | null;
    volunteerSignups: number;
    mediaCoverage: string | null;
    notes: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
