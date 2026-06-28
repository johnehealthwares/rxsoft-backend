export declare class PartyOrmEntity {
    id: string;
    organizationId: string;
    partyType: 'customer' | 'supplier' | 'both';
    code: string | null;
    name: string;
    phone: string | null;
    email: string | null;
    addressLine1: string | null;
    userId: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
