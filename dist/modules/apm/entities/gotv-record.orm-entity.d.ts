export declare class GotvRecordOrmEntity {
    id: string;
    pollingUnitId: string;
    supporterName: string;
    supporterPhone: string | null;
    contacted: boolean;
    turnedOut: boolean;
    contactedVia: string | null;
    contactedAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}
