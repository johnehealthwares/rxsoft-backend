import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refresh-token.repository';

type RefreshTokenStore = {
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
};

@Injectable()
export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  private readonly store = new Map<string, RefreshTokenStore[]>();

  async persist(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
    const entries = this.store.get(userId) ?? [];
    entries.push({ tokenHash, expiresAt, revokedAt: null });
    this.store.set(userId, entries);
  }

  async isValid(userId: string, tokenHash: string): Promise<boolean> {
    const entries = this.store.get(userId) ?? [];
    const now = new Date();

    return entries.some(
      (entry) => entry.tokenHash === tokenHash && entry.revokedAt === null && entry.expiresAt > now,
    );
  }

  async revoke(userId: string, tokenHash: string): Promise<void> {
    const entries = this.store.get(userId) ?? [];
    for (const entry of entries) {
      if (entry.tokenHash === tokenHash && entry.revokedAt === null) {
        entry.revokedAt = new Date();
      }
    }
  }
}
