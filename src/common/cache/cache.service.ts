import { Injectable, Logger } from '@nestjs/common';
import { InMemoryCacheStore } from './in-memory-cache.store';
import { RedisRespClient } from './redis-resp.client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppCacheService {
  private readonly logger = new Logger(AppCacheService.name);
  private readonly inMemoryStore = new InMemoryCacheStore();
  private readonly redisStore: RedisRespClient | null;
  private redisAvailable = false;
  private defaultTtlSeconds: number = 3000;

  constructor(configService: ConfigService) {
    const redisUrl = configService.get('REDIS_URL');
    const redisConnectTimeoutMs = configService.get('REDIS_CONNECT_TIMEOUT_MS');
    this.defaultTtlSeconds = configService.get<number>('CACHE_TTL_SECONDS') || 3000;
    this.redisStore = 
    redisUrl
      ? new RedisRespClient(redisUrl, redisConnectTimeoutMs)
      : null;
    this.redisAvailable = this.redisStore !== null;
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.redisStore && this.redisAvailable) {
      try {
        const rawValue = await this.redisStore.get(key);
        if (!rawValue) {
          return null;
        }

        return JSON.parse(rawValue) as T;
      } catch (error) {
        this.disableRedis(error);
      }
    }

    const rawValue = this.inMemoryStore.get(key);
    if (!rawValue) {
      return null;
    }
    return JSON.parse(rawValue) as T;
  }

  async set<T>(key: string, value: T, ttlSeconds = this.defaultTtlSeconds): Promise<void> {
    const serialized = JSON.stringify(value);

    if (this.redisStore && this.redisAvailable) {
      try {
        await this.redisStore.setEx(key, serialized, ttlSeconds);
        return;
      } catch (error) {
        this.disableRedis(error);
      }
    }

    this.inMemoryStore.set(key, serialized, ttlSeconds);
  }

  async del(key: string): Promise<void> {
    if (this.redisStore && this.redisAvailable) {
      try {
        await this.redisStore.del([key]);
      } catch (error) {
        this.disableRedis(error);
      }
    }
    this.inMemoryStore.del(key);
  }

  async invalidateByPrefix(prefix: string): Promise<void> {
    if (this.redisStore && this.redisAvailable) {
      try {
        const redisKeys = await this.redisStore.keys(`${prefix}*`);
        await this.redisStore.del(redisKeys);
      } catch (error) {
        this.disableRedis(error);
      }
    }
    this.inMemoryStore.invalidateByPrefix(prefix);
  }

  private disableRedis(error: unknown): void {
    if (!this.redisAvailable) {
      return;
    }

    this.redisAvailable = false;
    const message = error instanceof Error ? error.message : 'unknown redis error';
    this.logger.warn(`Redis cache unavailable, switching to in-memory cache: ${message}`);
  }
}

