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
exports.GetItemUseCase = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../common/cache/cache.service");
const catalog_di_tokens_1 = require("./catalog.di-tokens");
let GetItemUseCase = class GetItemUseCase {
    productRepository;
    cacheService;
    constructor(productRepository, cacheService) {
        this.productRepository = productRepository;
        this.cacheService = cacheService;
    }
    async execute(productId, organizationId) {
        const key = `catalog:get:${organizationId}:${productId}`;
        const cached = await this.cacheService?.get(key);
        if (cached) {
            return cached;
        }
        const product = await this.productRepository.findById(productId, organizationId, false);
        if (!product) {
            throw new common_1.NotFoundException('Item not found');
        }
        await this.cacheService?.set(key, product, 120);
        return product;
    }
};
exports.GetItemUseCase = GetItemUseCase;
exports.GetItemUseCase = GetItemUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_di_tokens_1.ITEM_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService])
], GetItemUseCase);
//# sourceMappingURL=get-item.use-case.js.map