"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCacheStore = void 0;
class InMemoryCacheStore {
    store = new Map();
    get(key) {
        const item = this.store.get(key);
        if (!item) {
            return null;
        }
        if (item.expiresAt <= Date.now()) {
            this.store.delete(key);
            return null;
        }
        return item.value;
    }
    set(key, value, ttlSeconds) {
        this.store.set(key, {
            value,
            expiresAt: Date.now() + ttlSeconds * 1000,
        });
    }
    del(key) {
        this.store.delete(key);
    }
    invalidateByPrefix(prefix) {
        for (const key of this.store.keys()) {
            if (key.startsWith(prefix)) {
                this.store.delete(key);
            }
        }
    }
}
exports.InMemoryCacheStore = InMemoryCacheStore;
//# sourceMappingURL=in-memory-cache.store.js.map