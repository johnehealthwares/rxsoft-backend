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
var InventoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
const mappers_1 = require("../../../shared/domain/mappers");
const accounting_integration_service_1 = require("../../accounting/services/accounting-integration.service");
const inventory_di_tokens_1 = require("./inventory.di-tokens");
let InventoryService = InventoryService_1 = class InventoryService {
    inventoryRepository;
    accountingIntegration;
    logger = new common_1.Logger(InventoryService_1.name);
    constructor(inventoryRepository, accountingIntegration) {
        this.inventoryRepository = inventoryRepository;
        this.accountingIntegration = accountingIntegration;
    }
    async list(query) {
        const result = await this.inventoryRepository.listStockBalances({
            organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID,
            offset: query.offset,
            limit: query.limit,
        });
        return {
            data: result.items.map((item) => ({
                id: item.id,
                itemId: item.item.id,
                branchId: item.location.id,
                quantity: item.quantityOnHand,
                reorderLevel: 0,
                createdAt: null,
                updatedAt: null,
                archivedAt: null,
            })),
            total: result.total,
        };
    }
    async listAll() {
        const result = await this.inventoryRepository.listStockBalances({
            organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID,
            offset: 0,
            limit: 10000,
        });
        return result.items.map((item) => ({
            quantity: item.quantityOnHand,
        }));
    }
    async adjustByReference(payload, performedByUserId, organizationId) {
        const stockBalance = await this.inventoryRepository.adjustStockByReference({
            organizationId,
            itemId: payload.itemId,
            locationId: payload.locationId,
            lotId: payload.lotId ?? null,
            deltaQuantity: payload.deltaQuantity,
            reason: payload.reason,
            performedByUserId,
            uomId: payload.uomId ?? null,
            reorderMinQty: payload.reorderMinQty ?? null,
            reorderMaxQty: payload.reorderMaxQty ?? null,
        });
        if (this.accountingIntegration) {
            this.accountingIntegration
                .recordStockAdjustment(organizationId, {
                stockBalanceId: stockBalance.id,
                deltaQuantity: payload.deltaQuantity,
                reason: payload.reason,
                averageCost: stockBalance.averageCost,
            })
                .catch((err) => this.logger.error(`Accounting: failed to record adjust-by-ref: ${err.message}`, err.stack));
        }
        return (0, mappers_1.toStockBalanceType)(stockBalance);
    }
    async transfer(payload, performedByUserId, organizationId) {
        const result = await this.inventoryRepository.transferStock({
            organizationId,
            fromLocationId: payload.fromLocationId,
            toLocationId: payload.toLocationId,
            itemId: payload.itemId,
            lotId: payload.lotId ?? null,
            quantity: payload.quantity,
            reason: payload.reason ?? 'stock_transfer',
            performedByUserId,
        });
        if (this.accountingIntegration) {
            this.accountingIntegration
                .recordStockTransfer(organizationId, {
                itemId: payload.itemId,
                quantity: payload.quantity,
                fromLocationId: payload.fromLocationId,
                toLocationId: payload.toLocationId,
            })
                .catch((err) => this.logger.error(`Accounting: failed to record stock transfer: ${err.message}`, err.stack));
        }
        return {
            fromBalance: (0, mappers_1.toStockBalanceType)(result.fromBalance),
            toBalance: (0, mappers_1.toStockBalanceType)(result.toBalance),
        };
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = InventoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(inventory_di_tokens_1.INVENTORY_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, accounting_integration_service_1.AccountingIntegrationService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map