export type PermissionType = {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
};
export type RoleType = {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    description: string | null;
    isSystem: boolean;
    createdAt: string;
    updatedAt: string;
};
export type UserType = {
    id: string;
    organizationId: string;
    username: string;
    passwordHash: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};
export type RefreshTokenType = {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: string;
    revokedAt: string | null;
    createdAt: string;
};
