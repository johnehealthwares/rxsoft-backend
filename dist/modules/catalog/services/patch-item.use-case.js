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
const generic_drug_cache_service_1 = require("../../../services/generic-drug-cache.service");
let PatchItemUseCase = class PatchItemUseCase {
    productRepository;
    genericDrugCache;
    cacheService;
    constructor(productRepository, genericDrugCache, cacheService) {
        this.productRepository = productRepository;
        this.genericDrugCache = genericDrugCache;
        this.cacheService = cacheService;
    }
    async execute(itemId, payload, organizationId) {
        const existing = await this.productRepository.findById(itemId, organizationId, true);
        if (!existing) {
            throw new common_1.NotFoundException('Item not found');
        }
        if (payload.genericProductCode !== undefined) {
            const genericProduct = this.genericDrugCache.getByCode(payload.genericProductCode);
            if (!genericProduct) {
                throw new common_1.BadRequestException('Generic product does not exist');
            }
        }
        let category = existing.category;
        if (payload.categoryId !== undefined) {
            category = await this.productRepository.findCategoryById(payload.categoryId, organizationId);
            if (!category) {
                throw new common_1.BadRequestException('Category does not exist');
            }
        }
        if (payload.baseUomId !== undefined) {
            const baseUom = await this.productRepository.findUomById(payload.baseUomId, organizationId);
            if (!baseUom)
                throw new common_1.BadRequestException('Base UOM does not exist');
        }
        if (payload.purchaseUomId !== undefined) {
            const purchaseUom = await this.productRepository.findUomById(payload.purchaseUomId, organizationId);
            if (!purchaseUom)
                throw new common_1.BadRequestException('Purchase UOM does not exist');
        }
        if (payload.saleUomId !== undefined) {
            const saleUom = await this.productRepository.findUomById(payload.saleUomId, organizationId);
            if (!saleUom)
                throw new common_1.BadRequestException('Sale UOM does not exist');
        }
        const patched = new item_entity_1.Item(existing.id, existing.organizationId, payload.code ?? existing.code, payload.name ?? existing.name, payload.genericProductCode ?? existing.genericProductCode, payload.categoryId ?? existing.categoryId, category, payload.baseUomId ?? existing.baseUomId, payload.purchaseUomId ?? existing.purchaseUomId, payload.saleUomId ?? existing.saleUomId, existing.baseUom, existing.purchaseUom, existing.saleUom, payload.barcode ?? existing.barcode, payload.trackLot ?? existing.trackLot, payload.trackExpiry ?? existing.trackExpiry, payload.shelfLifeDays ?? existing.shelfLifeDays, payload.isActive ?? existing.isActive, payload.imageUrl ?? existing.imageUrl, payload.smallImageUrl ?? existing.smallImageUrl, payload.mediumImageUrl ?? existing.mediumImageUrl, payload.largeImageUrl ?? existing.largeImageUrl);
        const res = await this.productRepository.save(patched);
        await this.cacheService?.invalidateByPrefix(`catalog:list:${organizationId}:`);
        await this.cacheService?.del(`catalog:get:${organizationId}:${existing.id}`);
        return res;
    }
};
exports.PatchItemUseCase = PatchItemUseCase;
exports.PatchItemUseCase = PatchItemUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_di_tokens_1.ITEM_REPOSITORY)),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, generic_drug_cache_service_1.GenericDrugCacheService,
        cache_service_1.AppCacheService])
], PatchItemUseCase);
//# sourceMappingURL=patch-item.use-case.js.map