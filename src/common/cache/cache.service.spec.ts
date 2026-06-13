import { AppCacheService } from './cache.service';

describe('AppCacheService', () => {
  const originalRedisUrl = process.env.REDIS_URL;

  beforeEach(() => {
    delete process.env.REDIS_URL;
  });

  afterAll(() => {
    if (originalRedisUrl) {
      process.env.REDIS_URL = originalRedisUrl;
    } else {
      delete process.env.REDIS_URL;
    }
  });

  it('sets and gets a value from fallback in-memory store', async () => {
    const cacheService = new AppCacheService();
    await cacheService.set('k1', { ok: true }, 60);

    const value = await cacheService.get<{ ok: boolean }>('k1');
    expect(value).toEqual({ ok: true });
  });

  it('invalidates values by prefix', async () => {
    const cacheService = new AppCacheService();
    await cacheService.set('items:list:1', { id: 1 }, 60);
    await cacheService.set('items:list:2', { id: 2 }, 60);
    await cacheService.set('sales:list:1', { id: 3 }, 60);

    await cacheService.invalidateByPrefix('items:list:');

    expect(await cacheService.get('items:list:1')).toBeNull();
    expect(await cacheService.get('items:list:2')).toBeNull();
    expect(await cacheService.get('sales:list:1')).toEqual({ id: 3 });
  });
});

