"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRefreshTokenRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryRefreshTokenRepository = class InMemoryRefreshTokenRepository {
    store = new Map();
    async persist(userId, tokenHash, expiresAt) {
        const entries = this.store.get(userId) ?? [];
        entries.push({ tokenHash, expiresAt, revokedAt: null });
        this.store.set(userId, entries);
    }
    async isValid(userId, tokenHash) {
        const entries = this.store.get(userId) ?? [];
        const now = new Date();
        return entries.some((entry) => entry.tokenHash === tokenHash && entry.revokedAt === null && entry.expiresAt > now);
    }
    async revoke(userId, tokenHash) {
        const entries = this.store.get(userId) ?? [];
        for (const entry of entries) {
            if (entry.tokenHash === tokenHash && entry.revokedAt === null) {
                entry.revokedAt = new Date();
            }
        }
    }
};
exports.InMemoryRefreshTokenRepository = InMemoryRefreshTokenRepository;
exports.InMemoryRefreshTokenRepository = InMemoryRefreshTokenRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryRefreshTokenRepository);
//# sourceMappingURL=in-memory-refresh-token.repository.js.map