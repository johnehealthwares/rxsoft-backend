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
var GenericDrugCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericDrugCacheService = void 0;
const common_1 = require("@nestjs/common");
const healthcare_concepts_service_1 = require("./healthcare-concepts.service");
let GenericDrugCacheService = GenericDrugCacheService_1 = class GenericDrugCacheService {
    healthcare;
    logger = new common_1.Logger(GenericDrugCacheService_1.name);
    cache = new Map();
    loaded = false;
    constructor(healthcare) {
        this.healthcare = healthcare;
    }
    async onApplicationBootstrap() {
        await this.refreshCache();
    }
    async refreshCache() {
        try {
            this.logger.log('Loading generic drug cache from healthcare-concepts...');
            const products = await this.healthcare.listGenericProducts(1, 10000);
            this.cache.clear();
            for (const product of products) {
                this.cache.set(product.code, product);
            }
            this.loaded = true;
            this.logger.log(`Loaded ${this.cache.size} generic products into cache`);
        }
        catch (err) {
            this.logger.error(`Failed to load generic drug cache: ${err.message}`);
        }
    }
    getByCode(code) {
        return this.cache.get(code);
    }
    search(query) {
        const q = query.toLowerCase();
        const results = [];
        for (const product of this.cache.values()) {
            if (product.code.toLowerCase().includes(q) || product.name.toLowerCase().includes(q)) {
                results.push(product);
            }
        }
        return results;
    }
    searchLightweight(query, offset = 0, limit = 20) {
        const all = this.search(query);
        const total = all.length;
        const page = all.slice(offset, offset + limit);
        return {
            items: page.map((p) => ({ id: p.code, code: p.code, name: p.name })),
            total,
        };
    }
    invalidate(code) {
        this.cache.delete(code);
    }
    invalidateAll() {
        this.cache.clear();
        this.loaded = false;
        this.refreshCache().catch((err) => this.logger.error(`Cache refresh failed: ${err.message}`));
    }
    isLoaded() {
        return this.loaded;
    }
    size() {
        return this.cache.size;
    }
    getAll() {
        return [...this.cache.values()];
    }
};
exports.GenericDrugCacheService = GenericDrugCacheService;
exports.GenericDrugCacheService = GenericDrugCacheService = GenericDrugCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [healthcare_concepts_service_1.HealthcareConceptsService])
], GenericDrugCacheService);
//# sourceMappingURL=generic-drug-cache.service.js.map