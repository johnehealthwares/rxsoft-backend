import { ConfigService } from '@nestjs/config';
export declare class AppCacheService {
    private readonly logger;
    private readonly inMemoryStore;
    private readonly redisStore;
    private redisAvailable;
    private defaultTtlSeconds;
    constructor(configService: ConfigService);
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    invalidateByPrefix(prefix: string): Promise<void>;
    private disableRedis;
}
