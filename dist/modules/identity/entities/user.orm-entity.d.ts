export declare class UserOrmEntity {
    id: string;
    organizationId: string;
    username: string;
    passwordHash: string;
    isActive: boolean;
    phone?: string;
    email?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
