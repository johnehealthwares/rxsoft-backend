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
exports.PatchItemUseCase = void 0;
const common_1 = require("@nestjs/common");
const catalog_di_tokens_1 = require("./catalog.di-tokens");
const item_entity_1 = require("../domains/item.entity");
const cache_service_1 = require("../../../common/cache/cache.service");
let PatchItemUseCase = class PatchItemUseCase {
    productRepository;
    cacheService;
    constructor(productRepository, cacheService) {
        this.productRepository = productRepository;
        this.cacheService = cacheService;
    }
    async execute(itemId, payload, organizationId) {
        const existing = await this.productRepository.findById(itemId, organizationId, true);
        if (!existing) {
            throw new common_1.NotFoundException('Item not found');
        }
        const patched = new item_entity_1.Item(existing.id, existing.organizationId, existing.code, payload.name ?? existing.name, existing.genericProductCode, existing.categoryId, existing.category, existing.baseUomId, existing.purchaseUomId, existing.saleUomId, existing.baseUom, existing.purchaseUom, existing.saleUom, payload.barcode ?? existing.barcode, existing.trackLot, existing.trackExpiry, existing.shelfLifeDays, payload.isActive ?? existing.isActive);
        const res = this.productRepository.save(patched);
        await this.cacheService?.invalidateByPrefix(`catalog:list:${organizationId}:`);
        await this.cacheService?.del(`catalog:get:${organizationId}:${existing.id}`);
        return res;
    }
};
exports.PatchItemUseCase = PatchItemUseCase;
exports.PatchItemUseCase = PatchItemUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_di_tokens_1.ITEM_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService])
], PatchItemUseCase);
//# sourceMappingURL=patch-item.use-case.js.map