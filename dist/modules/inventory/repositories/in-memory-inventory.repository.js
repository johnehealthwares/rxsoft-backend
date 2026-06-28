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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryInventoryRepository = void 0;
const common_1 = require("@nestjs/common");
const stock_balance_entity_1 = require("../domains/stock-balance.entity");
let InMemoryInventoryRepository = class InMemoryInventoryRepository {
    stockBalances = new Map();
    storeStockLocations = new Map();
    stockMovements = new Map();
    constructor() {
        const seed = new stock_balance_entity_1.StockBalance('b1', 'org1', {
            id: 'p1',
            code: 'PARA-500',
            name: 'Paracetamol 500mg',
        }, {
            id: 'l1',
            name: 'Main Store',
        }, null, 100, 5, 1.25, null, null);
        this.stockBalances.set(seed.id, seed);
    }
    async listStockBalances(query) {
        let items = [...this.stockBalances.values()].filter((item) => item.organizationId === query.organizationId);
        if (query.itemId) {
            items = items.filter((item) => item.item.id === query.itemId);
        }
        if (query.locationId) {
            items = items.filter((item) => item.location.id === query.locationId);
        }
        const total = items.length;
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total,
        };
    }
    async findStockBalanceById(id, organizationId) {
        const item = this.stockBalances.get(id) ?? null;
        if (!item) {
            return null;
        }
        if (item.organizationId !== organizationId) {
            return null;
        }
        return item;
    }
    async listStockMovements(query) {
        let items = [...this.stockMovements.values()].filter((item) => item.organizationId === query.organizationId);
        if (query.movementType) {
            items = items.filter((item) => item.movementType === query.movementType);
        }
        items.sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime());
        const total = items.length;
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total,
        };
    }
    async applyStockAdjustment(adjustment, organizationId) {
        const stockBalance = await this.findStockBalanceById(adjustment.stockBalanceId, organizationId);
        if (!stockBalance) {
            throw new Error('Stock balance not found');
        }
        stockBalance.quantityOnHand += adjustment.deltaQuantity;
        this.stockBalances.set(stockBalance.id, stockBalance);
        const movement = {
            id: `sm-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
            organizationId,
            itemId: stockBalance.item.id,
            lotId: stockBalance.lot?.id ?? null,
            fromLocationId: adjustment.deltaQuantity < 0 ? stockBalance.location.id : null,
            toLocationId: adjustment.deltaQuantity > 0 ? stockBalance.location.id : null,
            movementType: 'adjustment',
            quantity: Math.abs(adjustment.deltaQuantity),
            unitCost: stockBalance.averageCost,
            occurredAt: adjustment.performedAt,
            createdAt: adjustment.performedAt,
            createdByUserId: adjustment.performedByUserId,
        };
        this.stockMovements.set(movement.id, movement);
        return stockBalance;
    }
    async listStoreStockLocations(query) {
        let items = [...this.storeStockLocations.values()].filter((item) => item.organizationId === query.organizationId);
        if (query.storeId) {
            items = items.filter((item) => item.storeId === query.storeId);
        }
        if (query.purpose) {
            items = items.filter((item) => item.purpose === query.purpose);
        }
        if (typeof query.isActive === 'boolean') {
            items = items.filter((item) => item.isActive === query.isActive);
        }
        const total = items.length;
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total,
        };
    }
    async createStoreStockLocation(payload) {
        const now = new Date();
        const item = {
            id: `ssl-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
            organizationId: payload.organizationId,
            storeId: payload.storeId,
            stockLocationId: payload.stockLocationId,
            purpose: payload.purpose,
            isActive: payload.isActive,
            createdAt: now,
            updatedAt: now,
        };
        this.storeStockLocations.set(item.id, item);
        return item;
    }
    async setStoreStockLocationActivation(id, organizationId, isActive) {
        const item = this.storeStockLocations.get(id);
        if (!item || item.organizationId !== organizationId) {
            throw new Error('Store stock location not found');
        }
        const next = {
            ...item,
            isActive,
            updatedAt: new Date(),
        };
        this.storeStockLocations.set(id, next);
        return next;
    }
    async adjustStockByReference(payload) {
        const existing = [...this.stockBalances.values()].find((item) => item.organizationId === payload.organizationId &&
            item.item.id === payload.itemId &&
            item.location.id === payload.locationId &&
            (item.lot?.id ?? null) === (payload.lotId ?? null));
        const balance = existing ??
            new stock_balance_entity_1.StockBalance(`b-${Date.now()}`, payload.organizationId, {
                id: payload.itemId,
                code: 'UNKNOWN',
                name: 'Unknown Product',
            }, {
                id: payload.locationId,
                name: 'Unknown Location',
            }, payload.lotId ? { id: payload.lotId, code: payload.lotId } : null, 0, 0, 0, payload.reorderMinQty ?? null, payload.reorderMaxQty ?? null);
        if (balance.quantityOnHand + payload.deltaQuantity < 0) {
            throw new Error('Adjustment would make stock negative');
        }
        balance.quantityOnHand += payload.deltaQuantity;
        this.stockBalances.set(balance.id, balance);
        return balance;
    }
    async transferStock(payload) {
        const fromBal = [...this.stockBalances.values()].find((b) => b.organizationId === payload.organizationId &&
            b.item.id === payload.itemId &&
            b.location.id === payload.fromLocationId);
        if (!fromBal || fromBal.quantityOnHand < payload.quantity) {
            throw new Error('Insufficient stock at source');
        }
        let toBal = [...this.stockBalances.values()].find((b) => b.organizationId === payload.organizationId &&
            b.item.id === payload.itemId &&
            b.location.id === payload.toLocationId);
        if (!toBal) {
            toBal = new stock_balance_entity_1.StockBalance(`b-${Date.now()}`, payload.organizationId, fromBal.item, { id: payload.toLocationId, name: 'Unknown' }, null, 0, 0, fromBal.averageCost, null, null);
            this.stockBalances.set(toBal.id, toBal);
        }
        fromBal.quantityOnHand -= payload.quantity;
        toBal.quantityOnHand += payload.quantity;
        return { fromBalance: fromBal, toBalance: toBal };
    }
};
exports.InMemoryInventoryRepository = InMemoryInventoryRepository;
exports.InMemoryInventoryRepository = InMemoryInventoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InMemoryInventoryRepository);
//# sourceMappingURL=in-memory-inventory.repository.js.map