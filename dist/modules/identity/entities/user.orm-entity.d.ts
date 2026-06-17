import { RefreshTokenOrmEntity } from './refresh-token.orm-entity';
import { RoleOrmEntity } from './role.orm-entity';
export declare class UserOrmEntity {
    id: string;
    organizationId: string;
    username: string;
    passwordHash: string;
    isActive: boolean;
    phone?: string;
    roles: RoleOrmEntity[];
    refreshTokens: RefreshTokenOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
