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
exports.ListItemsUseCase = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../common/cache/cache.service");
const catalog_di_tokens_1 = require("./catalog.di-tokens");
let ListItemsUseCase = class ListItemsUseCase {
    productRepository;
    cacheService;
    constructor(productRepository, cacheService) {
        this.productRepository = productRepository;
        this.cacheService = cacheService;
    }
    async execute(payload, organizationId) {
        const key = [
            'catalog:list',
            organizationId,
            payload.page,
            payload.limit,
            payload.search ?? '',
            payload.includeAll ?? false,
            payload.categoryCode ?? '',
            payload.sortBy,
            payload.sortOrder,
        ].join(':');
        const cached = await this.cacheService?.get(key);
        if (cached) {
            return cached;
        }
        const result = await this.productRepository.list({
            organizationId,
            offset: payload.offset,
            limit: payload.limit,
            search: payload.search,
            categoryCode: payload.categoryCode,
            sortBy: payload.sortBy,
            showAll: payload.includeAll,
            sortOrder: payload.sortOrder,
        });
        await this.cacheService?.set(key, result, 60);
        return result;
    }
};
exports.ListItemsUseCase = ListItemsUseCase;
exports.ListItemsUseCase = ListItemsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_di_tokens_1.ITEM_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService])
], ListItemsUseCase);
//# sourceMappingURL=list-items.use-case.js.map