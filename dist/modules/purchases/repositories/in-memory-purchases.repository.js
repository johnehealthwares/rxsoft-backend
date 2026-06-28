"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPurchasesRepository = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const purchase_order_orm_entity_1 = require("../entities/purchase-order.orm-entity");
const purchase_order_line_orm_entity_1 = require("../entities/purchase-order-line.orm-entity");
let InMemoryPurchasesRepository = class InMemoryPurchasesRepository {
    purchaseOrders = [];
    purchaseOrderLines = [];
    async list(query) {
        let items = this.purchaseOrders.filter((po) => po.organizationId === query.organizationId);
        if (query.status) {
            items = items.filter((po) => po.status === query.status);
        }
        const total = items.length;
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total,
        };
    }
    async getById(id, organizationId) {
        const po = this.purchaseOrders.find((p) => p.id === id && p.organizationId === organizationId);
        if (!po)
            return null;
        po.lines = this.purchaseOrderLines.filter((l) => l.purchaseOrder?.id === po.id);
        return po;
    }
    async create(payload) {
        const id = (0, node_crypto_1.randomUUID)();
        const po = new purchase_order_orm_entity_1.PurchaseOrderOrmEntity();
        Object.assign(po, {
            id,
            organizationId: payload.organizationId,
            purchaseOrderNumber: payload.purchaseOrderNumber,
            supplierId: payload.supplierId,
            warehouseId: payload.warehouseId,
            currencyCode: payload.currencyCode,
            orderDate: payload.orderDate,
            expectedDate: payload.expectedDate,
            status: payload.status,
            subtotalAmount: payload.subtotalAmount,
            taxAmount: payload.taxAmount,
            totalAmount: payload.totalAmount,
            createdByUserId: payload.createdByUserId,
            approvedByUserId: payload.approvedByUserId,
            approvedAt: payload.approvedAt,
            note: payload.note,
            createdAt: new Date(),
            updatedAt: new Date(),
            lines: [],
        });
        this.purchaseOrders.push(po);
        const lines = payload.lines.map((line) => {
            const lineEntity = new purchase_order_line_orm_entity_1.PurchaseOrderLineOrmEntity();
            Object.assign(lineEntity, {
                id: (0, node_crypto_1.randomUUID)(),
                purchaseOrder: po,
                itemId: line.itemId,
                orderedQty: line.orderedQty,
                receivedQty: line.receivedQty,
                uomId: line.uomId,
                unitCost: line.unitCost,
                discountPercent: line.discountPercent,
                taxPercent: line.taxPercent,
                lineSubtotal: line.lineSubtotal,
                lineTotal: line.lineTotal,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            this.purchaseOrderLines.push(lineEntity);
            return lineEntity;
        });
        po.lines = lines;
        return po;
    }
    async update(id, organizationId, payload) {
        const po = this.purchaseOrders.find((p) => p.id === id && p.organizationId === organizationId);
        if (!po)
            throw new common_1.NotFoundException('Purchase order not found');
        if (payload.supplierId !== undefined)
            po.supplierId = payload.supplierId;
        if (payload.warehouseId !== undefined)
            po.warehouseId = payload.warehouseId;
        if (payload.purchaseOrderNumber !== undefined)
            po.purchaseOrderNumber = payload.purchaseOrderNumber;
        if (payload.currencyCode !== undefined)
            po.currencyCode = payload.currencyCode;
        if (payload.orderDate !== undefined)
            po.orderDate = payload.orderDate;
        if (payload.expectedDate !== undefined)
            po.expectedDate = payload.expectedDate;
        if (payload.status !== undefined)
            po.status = payload.status;
        if (payload.subtotalAmount !== undefined)
            po.subtotalAmount = payload.subtotalAmount;
        if (payload.taxAmount !== undefined)
            po.taxAmount = payload.taxAmount;
        if (payload.totalAmount !== undefined)
            po.totalAmount = payload.totalAmount;
        if (payload.createdByUserId !== undefined)
            po.createdByUserId = payload.createdByUserId;
        if (payload.approvedByUserId !== undefined)
            po.approvedByUserId = payload.approvedByUserId;
        if (payload.approvedAt !== undefined)
            po.approvedAt = payload.approvedAt;
        if (payload.note !== undefined)
            po.note = payload.note;
        po.updatedAt = new Date();
        if (payload.lines) {
            const oldLineIds = this.purchaseOrderLines
                .filter((l) => l.purchaseOrder?.id === po.id)
                .map((l) => l.id);
            for (const oldId of oldLineIds) {
                const idx = this.purchaseOrderLines.findIndex((l) => l.id === oldId);
                if (idx >= 0)
                    this.purchaseOrderLines.splice(idx, 1);
            }
            po.lines = payload.lines.map((line) => {
                const lineEntity = new purchase_order_line_orm_entity_1.PurchaseOrderLineOrmEntity();
                Object.assign(lineEntity, {
                    id: (0, node_crypto_1.randomUUID)(),
                    purchaseOrder: po,
                    itemId: line.itemId,
                    orderedQty: line.orderedQty,
                    receivedQty: line.receivedQty,
                    uomId: line.uomId,
                    unitCost: line.unitCost,
                    discountPercent: line.discountPercent,
                    taxPercent: line.taxPercent,
                    lineSubtotal: line.lineSubtotal,
                    lineTotal: line.lineTotal,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                this.purchaseOrderLines.push(lineEntity);
                return lineEntity;
            });
        }
        return po;
    }
    async delete(id, organizationId) {
        const idx = this.purchaseOrders.findIndex((p) => p.id === id && p.organizationId === organizationId);
        if (idx < 0)
            throw new common_1.NotFoundException('Purchase order not found');
        this.purchaseOrders.splice(idx, 1);
        const lineIds = this.purchaseOrderLines
            .filter((l) => l.purchaseOrder?.id === id)
            .map((l) => l.id);
        for (const lineId of lineIds) {
            const li = this.purchaseOrderLines.findIndex((l) => l.id === lineId);
            if (li >= 0)
                this.purchaseOrderLines.splice(li, 1);
        }
    }
    async receiveGoods(_payload) {
        return {
            receiptId: '',
            receiptNumber: '',
            lines: [],
        };
    }
    async unpostGoods(_payload) {
    }
    async listReceipts(query) {
        return { items: [], total: 0 };
    }
    async findLastReceipt(_organizationId) {
        return null;
    }
};
exports.InMemoryPurchasesRepository = InMemoryPurchasesRepository;
exports.InMemoryPurchasesRepository = InMemoryPurchasesRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryPurchasesRepository);
//# sourceMappingURL=in-memory-purchases.repository.js.map