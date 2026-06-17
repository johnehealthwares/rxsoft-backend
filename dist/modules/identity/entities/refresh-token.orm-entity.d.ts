import { UserOrmEntity } from './user.orm-entity';
export declare class RefreshTokenOrmEntity {
    id: string;
    user: UserOrmEntity;
    tokenHash: string;
    expiresAt: Date;
    revokedAt: Date | null;
    createdAt: Date;
}
