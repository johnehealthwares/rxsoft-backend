"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCacheService = void 0;
const common_1 = require("@nestjs/common");
const in_memory_cache_store_1 = require("./in-memory-cache.store");
const redis_resp_client_1 = require("./redis-resp.client");
const config_1 = require("@nestjs/config");
let AppCacheService = AppCacheService_1 = class AppCacheService {
    logger = new common_1.Logger(AppCacheService_1.name);
    inMemoryStore = new in_memory_cache_store_1.InMemoryCacheStore();
    redisStore;
    redisAvailable = false;
    defaultTtlSeconds = 3000;
    constructor(configService) {
        const redisUrl = configService.get('REDIS_URL');
        const redisConnectTimeoutMs = configService.get('REDIS_CONNECT_TIMEOUT_MS');
        this.defaultTtlSeconds = configService.get('CACHE_TTL_SECONDS') || 3000;
        this.redisStore =
            redisUrl
                ? new redis_resp_client_1.RedisRespClient(redisUrl, redisConnectTimeoutMs)
                : null;
        this.redisAvailable = this.redisStore !== null;
    }
    async get(key) {
        if (this.redisStore && this.redisAvailable) {
            try {
                const rawValue = await this.redisStore.get(key);
                if (!rawValue) {
                    return null;
                }
                return JSON.parse(rawValue);
            }
            catch (error) {
                this.disableRedis(error);
            }
        }
        const rawValue = this.inMemoryStore.get(key);
        if (!rawValue) {
            return null;
        }
        return JSON.parse(rawValue);
    }
    async set(key, value, ttlSeconds = this.defaultTtlSeconds) {
        const serialized = JSON.stringify(value);
        if (this.redisStore && this.redisAvailable) {
            try {
                await this.redisStore.setEx(key, serialized, ttlSeconds);
                return;
            }
            catch (error) {
                this.disableRedis(error);
            }
        }
        this.inMemoryStore.set(key, serialized, ttlSeconds);
    }
    async del(key) {
        if (this.redisStore && this.redisAvailable) {
            try {
                await this.redisStore.del([key]);
            }
            catch (error) {
                this.disableRedis(error);
            }
        }
        this.inMemoryStore.del(key);
    }
    async invalidateByPrefix(prefix) {
        if (this.redisStore && this.redisAvailable) {
            try {
                const redisKeys = await this.redisStore.keys(`${prefix}*`);
                await this.redisStore.del(redisKeys);
            }
            catch (error) {
                this.disableRedis(error);
            }
        }
        this.inMemoryStore.invalidateByPrefix(prefix);
    }
    disableRedis(error) {
        if (!this.redisAvailable) {
            return;
        }
        this.redisAvailable = false;
        const message = error instanceof Error ? error.message : 'unknown redis error';
        this.logger.warn(`Redis cache unavailable, switching to in-memory cache: ${message}`);
    }
};
exports.AppCacheService = AppCacheService;
exports.AppCacheService = AppCacheService = AppCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppCacheService);
//# sourceMappingURL=cache.service.js.map