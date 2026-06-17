export declare class BranchOrmEntity {
    id: string;
    name: string;
    slug: string;
    address: string;
    city: string | null;
    state: string | null;
    phone: string | null;
    email: string | null;
    openingHours: string | null;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
