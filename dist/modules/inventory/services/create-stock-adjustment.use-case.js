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
var CreateStockAdjustmentUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockAdjustmentUseCase = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const cache_service_1 = require("../../../common/cache/cache.service");
const accounting_integration_service_1 = require("../../accounting/services/accounting-integration.service");
const stock_adjustment_entity_1 = require("../domains/stock-adjustment.entity");
const inventory_di_tokens_1 = require("./inventory.di-tokens");
let CreateStockAdjustmentUseCase = CreateStockAdjustmentUseCase_1 = class CreateStockAdjustmentUseCase {
    inventoryRepository;
    cacheService;
    accountingIntegration;
    logger = new common_1.Logger(CreateStockAdjustmentUseCase_1.name);
    constructor(inventoryRepository, cacheService, accountingIntegration) {
        this.inventoryRepository = inventoryRepository;
        this.cacheService = cacheService;
        this.accountingIntegration = accountingIntegration;
    }
    async execute(payload, performedByUserId, organizationId) {
        if (payload.deltaQuantity === 0) {
            throw new common_1.BadRequestException('Adjustment quantity cannot be zero');
        }
        const existing = await this.inventoryRepository.findStockBalanceById(payload.stockBalanceId, organizationId);
        if (!existing) {
            throw new common_1.NotFoundException('Stock balance not found');
        }
        if (existing.quantityOnHand + payload.deltaQuantity < 0) {
            throw new common_1.BadRequestException('Adjustment would make stock negative');
        }
        const adjustment = new stock_adjustment_entity_1.StockAdjustment((0, node_crypto_1.randomUUID)(), payload.stockBalanceId, payload.reason, payload.deltaQuantity, performedByUserId, new Date());
        const result = await this.inventoryRepository.applyStockAdjustment(adjustment, organizationId);
        await this.cacheService?.invalidateByPrefix(`inventory:list:${organizationId}:`);
        if (this.accountingIntegration) {
            this.accountingIntegration
                .recordStockAdjustment(organizationId, {
                stockBalanceId: payload.stockBalanceId,
                deltaQuantity: payload.deltaQuantity,
                reason: payload.reason,
                averageCost: existing.averageCost,
            })
                .catch((err) => this.logger.error(`Accounting: failed to record stock adjustment: ${err.message}`, err.stack));
        }
        return result;
    }
};
exports.CreateStockAdjustmentUseCase = CreateStockAdjustmentUseCase;
exports.CreateStockAdjustmentUseCase = CreateStockAdjustmentUseCase = CreateStockAdjustmentUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(inventory_di_tokens_1.INVENTORY_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService,
        accounting_integration_service_1.AccountingIntegrationService])
], CreateStockAdjustmentUseCase);
//# sourceMappingURL=create-stock-adjustment.use-case.js.map