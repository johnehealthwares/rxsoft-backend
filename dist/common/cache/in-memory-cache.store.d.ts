export declare class InMemoryCacheStore {
    private readonly store;
    get(key: string): string | null;
    set(key: string, value: string, ttlSeconds: number): void;
    del(key: string): void;
    invalidateByPrefix(prefix: string): void;
}
