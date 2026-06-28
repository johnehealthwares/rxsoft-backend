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
exports.UpdateItemUseCase = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../common/cache/cache.service");
const inventory_service_1 = require("../../inventory/services/inventory.service");
const pricing_service_1 = require("../../pricing/services/pricing.service");
const catalog_di_tokens_1 = require("./catalog.di-tokens");
const item_entity_1 = require("../domains/item.entity");
const utils_1 = require("./utils");
const generic_drug_cache_service_1 = require("../../../services/generic-drug-cache.service");
let UpdateItemUseCase = class UpdateItemUseCase {
    productRepository;
    cache;
    pricingService;
    inventoryService;
    cacheService;
    constructor(productRepository, cache, pricingService, inventoryService, cacheService) {
        this.productRepository = productRepository;
        this.cache = cache;
        this.pricingService = pricingService;
        this.inventoryService = inventoryService;
        this.cacheService = cacheService;
    }
    async execute(productId, payload, organizationId, performedByUserId) {
        const category = await this.productRepository.findCategoryById(payload.categoryId, organizationId);
        if (!category) {
            throw new common_1.BadRequestException('Category does not exist');
        }
        if (payload.genericProductCode) {
            const genericProduct = this.cache.getByCode(payload.genericProductCode);
            if (!genericProduct) {
                throw new common_1.BadRequestException('Generic product does not exist');
            }
        }
        if (!payload.baseUomId || !payload.purchaseUomId || !payload.saleUomId) {
            throw new common_1.BadRequestException('Base UOM, Purchase UOM and Sale UOM are required');
        }
        let baseUom, purchaseUom, saleUom;
        baseUom = await this.productRepository.findUomById(payload.baseUomId, organizationId);
        if (!baseUom) {
            throw new common_1.BadRequestException('Base UOM does not exist');
        }
        purchaseUom = await this.productRepository.findUomById(payload.purchaseUomId, organizationId);
        if (!purchaseUom) {
            throw new common_1.BadRequestException('Purchase UOM does not exist');
        }
        saleUom = await this.productRepository.findUomById(payload.saleUomId, organizationId);
        if (!saleUom) {
            throw new common_1.BadRequestException('Sale UOM does not exist');
        }
        (0, utils_1.validateUoms)({ baseUom, saleUom, purchaseUom });
        const product = new item_entity_1.Item(productId, organizationId, payload.code, payload.name, payload.genericProductCode ?? null, category.id, category, payload.baseUomId, payload.purchaseUomId ?? null, payload.saleUomId ?? null, baseUom ?? null, purchaseUom ?? null, saleUom ?? null, payload.barcode ?? null, payload.trackLot ?? true, payload.trackExpiry ?? true, payload.shelfLifeDays ?? null, payload.isActive ?? true, payload.imageUrl ?? null, payload.smallImageUrl ?? null, payload.mediumImageUrl ?? null, payload.largeImageUrl ?? null);
        const created = await this.productRepository.save(product);
        for (const item of payload.priceListItems ?? []) {
            if (!item.priceListId) {
                throw new common_1.BadRequestException('Price list id is required for each price list item');
            }
            await this.pricingService?.createPriceListItem({
                ...item,
                priceListId: item.priceListId,
                itemId: created.id,
            }, organizationId);
        }
        for (const item of payload.stockItems ?? []) {
            if (!performedByUserId) {
                throw new common_1.BadRequestException('Performed by user id is required when creating stock items');
            }
            await this.inventoryService?.adjustByReference({
                ...item,
                itemId: created.id,
            }, performedByUserId, organizationId);
        }
        await this.cacheService?.invalidateByPrefix(`catalog:list:${organizationId}:`);
        await this.cacheService?.del(`catalog:get:${organizationId}:${productId}`);
        return created;
    }
};
exports.UpdateItemUseCase = UpdateItemUseCase;
exports.UpdateItemUseCase = UpdateItemUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_di_tokens_1.ITEM_REPOSITORY)),
    __param(2, (0, common_1.Optional)()),
    __param(3, (0, common_1.Optional)()),
    __param(4, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, generic_drug_cache_service_1.GenericDrugCacheService,
        pricing_service_1.PricingService,
        inventory_service_1.InventoryService,
        cache_service_1.AppCacheService])
], UpdateItemUseCase);
//# sourceMappingURL=update-item.use-case.js.map