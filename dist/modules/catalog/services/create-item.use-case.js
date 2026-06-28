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
exports.CreateItemUseCase = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const cache_service_1 = require("../../../common/cache/cache.service");
const inventory_service_1 = require("../../inventory/services/inventory.service");
const pricing_service_1 = require("../../pricing/services/pricing.service");
const catalog_di_tokens_1 = require("./catalog.di-tokens");
const item_entity_1 = require("../domains/item.entity");
const utils_1 = require("./utils");
const generic_drug_cache_service_1 = require("../../../services/generic-drug-cache.service");
const code_validation_1 = require("../../../shared/utils/code-validation");
let CreateItemUseCase = class CreateItemUseCase {
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
    async execute(payload, organizationId, performedByUserId) {
        const lastItem = await this.productRepository.findLastCreated(organizationId);
        const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
            providedCode: payload.code,
            lastCode: lastItem?.code,
            override: payload.overrideCodeValidation,
        });
        if (!valid) {
            throw new common_1.BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
        }
        const existing = await this.productRepository.findByCode(payload.code, organizationId);
        if (existing) {
            throw new common_1.BadRequestException('Item code already exists');
        }
        if (payload.barcode) {
            const barcode = await this.productRepository.findByBarcode(payload.barcode, organizationId);
            if (barcode) {
                throw new common_1.BadRequestException('Item barcode already exists');
            }
        }
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
        const product = new item_entity_1.Item((0, node_crypto_1.randomUUID)(), organizationId, payload.code, payload.name, payload.genericProductCode ?? null, category.id, category, payload.baseUomId, payload.purchaseUomId ?? null, payload.saleUomId ?? null, baseUom ?? null, purchaseUom ?? null, saleUom ?? null, payload.barcode ?? null, payload.trackLot ?? true, payload.trackExpiry ?? true, payload.shelfLifeDays ?? null, payload.isActive ?? true);
        const created = await this.productRepository.save(product);
        await this.cacheService?.invalidateByPrefix(`catalog:list:${organizationId}:`);
        return created;
    }
};
exports.CreateItemUseCase = CreateItemUseCase;
exports.CreateItemUseCase = CreateItemUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_di_tokens_1.ITEM_REPOSITORY)),
    __param(2, (0, common_1.Optional)()),
    __param(3, (0, common_1.Optional)()),
    __param(4, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, generic_drug_cache_service_1.GenericDrugCacheService,
        pricing_service_1.PricingService,
        inventory_service_1.InventoryService,
        cache_service_1.AppCacheService])
], CreateItemUseCase);
//# sourceMappingURL=create-item.use-case.js.map