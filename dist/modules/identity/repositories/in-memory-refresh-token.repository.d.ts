import { RefreshTokenRepository } from './refresh-token.repository';
export declare class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
    private readonly store;
    persist(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
    isValid(userId: string, tokenHash: string): Promise<boolean>;
    revoke(userId: string, tokenHash: string): Promise<void>;
}
