export declare class RedisRespClient {
    private readonly timeoutMs;
    private readonly host;
    private readonly port;
    private readonly password;
    private readonly dbIndex;
    constructor(redisUrl: string, timeoutMs?: number);
    get(key: string): Promise<string | null>;
    setEx(key: string, value: string, ttlSeconds: number): Promise<void>;
    del(keys: string[]): Promise<void>;
    keys(pattern: string): Promise<string[]>;
    private command;
    private send;
}
