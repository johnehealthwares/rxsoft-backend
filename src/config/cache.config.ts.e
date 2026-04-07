export const cacheConfig = {
  defaultTtlSeconds: Number(process.env.CACHE_TTL_SECONDS ?? 60),
  redisUrl: process.env.REDIS_URL ?? null,
  redisConnectTimeoutMs: Number(process.env.REDIS_CONNECT_TIMEOUT_MS ?? 300),
};

