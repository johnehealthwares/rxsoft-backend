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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemDependenciesUseCase = void 0;
const common_1 = require("@nestjs/common");
const catalog_di_tokens_1 = require("./catalog.di-tokens");
const generic_drug_cache_service_1 = require("../../../services/generic-drug-cache.service");
let ListItemDependenciesUseCase = class ListItemDependenciesUseCase {
    productRepository;
    genericDrugCache;
    constructor(productRepository, genericDrugCache) {
        this.productRepository = productRepository;
        this.genericDrugCache = genericDrugCache;
    }
    async listCategories(payload, organizationId) {
        return this.productRepository.listCategories({
            organizationId,
            offset: payload.offset,
            limit: payload.limit,
            search: payload.search,
        });
    }
    async listGenericProducts(payload, _organizationId) {
        const result = this.genericDrugCache.searchLightweight(payload.search ?? '', payload.offset, payload.limit);
        return { items: result.items, total: result.total };
    }
    async listUoms(payload, organizationId) {
        return this.productRepository.listUoms({
            organizationId,
            offset: payload.offset,
            limit: payload.limit,
            search: payload.search,
        });
    }
};
exports.ListItemDependenciesUseCase = ListItemDependenciesUseCase;
exports.ListItemDependenciesUseCase = ListItemDependenciesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_di_tokens_1.ITEM_REPOSITORY)),
    __metadata("design:paramtypes", [Object, generic_drug_cache_service_1.GenericDrugCacheService])
], ListItemDependenciesUseCase);
//# sourceMappingURL=list-item-dependencies.use-case.js.map