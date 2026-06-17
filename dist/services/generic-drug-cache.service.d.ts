import { OnApplicationBootstrap } from '@nestjs/common';
import { HealthcareConceptsService, CachedGenericProduct } from './healthcare-concepts.service';
export declare class GenericDrugCacheService implements OnApplicationBootstrap {
    private readonly healthcare;
    private readonly logger;
    private cache;
    private loaded;
    constructor(healthcare: HealthcareConceptsService);
    onApplicationBootstrap(): Promise<void>;
    refreshCache(): Promise<void>;
    getByCode(code: string): CachedGenericProduct | undefined;
    search(query: string): CachedGenericProduct[];
    searchLightweight(query: string, offset?: number, limit?: number): {
        items: Array<{
            id: string;
            code: string;
            name: string;
        }>;
        total: number;
    };
    invalidate(code: string): void;
    invalidateAll(): void;
    isLoaded(): boolean;
    size(): number;
    getAll(): CachedGenericProduct[];
}
