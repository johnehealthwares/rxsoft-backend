import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { HealthcareConceptsService, CachedGenericProduct } from './healthcare-concepts.service';

@Injectable()
export class GenericDrugCacheService implements OnApplicationBootstrap {
  private readonly logger = new Logger(GenericDrugCacheService.name);
  private cache = new Map<string, CachedGenericProduct>();
  private loaded = false;

  constructor(private readonly healthcare: HealthcareConceptsService) {}

  async onApplicationBootstrap() {
    await this.refreshCache();
  }

  async refreshCache(): Promise<void> {
    try {
      this.logger.log('Loading generic drug cache from healthcare-concepts...');
      const products = await this.healthcare.listGenericProducts(1, 10000);
      this.cache.clear();
      for (const product of products) { 
        this.cache.set(product.code, product);
      }
      this.loaded = true;
      this.logger.log(`Loaded ${this.cache.size} generic products into cache`);
    } catch (err: any) {
      this.logger.error(`Failed to load generic drug cache: ${err.message}`);
    }
  }

  getByCode(code: string): CachedGenericProduct | undefined {
    return this.cache.get(code);
  }

  search(query: string): CachedGenericProduct[] {
    const q = query.toLowerCase();
    const results: CachedGenericProduct[] = [];
    for (const product of this.cache.values()) {
      if (product.code.toLowerCase().includes(q) || product.name.toLowerCase().includes(q)) {
        results.push(product);
      }
    }
    return results;
  }

  searchLightweight(query: string, offset = 0, limit = 20): { items: Array<{ id: string; code: string; name: string }>; total: number } {
    const all = this.search(query);
    const total = all.length;
    const page = all.slice(offset, offset + limit);
    return {
      items: page.map((p) => ({ id: p.code, code: p.code, name: p.name })),
      total,
    };
  }

  invalidate(code: string): void {
    this.cache.delete(code);
  }

  invalidateAll(): void {
    this.cache.clear();
    this.loaded = false;
    this.refreshCache().catch((err) => this.logger.error(`Cache refresh failed: ${err.message}`));
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  size(): number {
    return this.cache.size;
  }

  getAll(): CachedGenericProduct[] {
    return [...this.cache.values()];
  }
}
