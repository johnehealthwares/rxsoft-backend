export declare class ResultEntryOrmEntity {
    id: string;
    pollingUnitId: string;
    lgaId: string;
    wardId: string;
    apmVotes: number;
    pdpVotes: number;
    apcVotes: number;
    otherVotes: number;
    totalVotes: number;
    registeredVoters: number;
    photoUrl: string | null;
    enteredBy: string | null;
    status: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}
