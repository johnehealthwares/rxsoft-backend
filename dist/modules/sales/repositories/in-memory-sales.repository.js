"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySalesRepository = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const sale_entity_1 = require("../domains/sale.entity");
let InMemorySalesRepository = class InMemorySalesRepository {
    sales = [
        new sale_entity_1.Sale('s1', 'org1', 'SALE-0001', 'pos', 'posted', 125.5, 130, 4.5, new Date('2026-02-20T10:00:00.000Z')),
    ];
    receivables = new Map();
    async list(query) {
        let items = this.sales.filter((sale) => sale.organizationId === query.organizationId);
        if (query.status) {
            items = items.filter((sale) => sale.status === query.status);
        }
        const total = items.length;
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total,
        };
    }
    async createWithSettlement(payload) {
        const sale = new sale_entity_1.Sale((0, node_crypto_1.randomUUID)(), payload.organizationId, payload.saleNumber, payload.saleChannel, payload.status ?? 'posted', payload.totalAmount, payload.paidAmount, payload.changeAmount, payload.saleDate);
        this.sales.unshift(sale);
        if (payload.receivable) {
            const id = (0, node_crypto_1.randomUUID)();
            this.receivables.set(id, {
                id,
                saleId: sale.id,
                outstandingAmount: payload.receivable.outstandingAmount,
                status: 'open',
            });
            return {
                sale,
                receivableCreated: true,
                receivableId: id,
                outstandingAmount: payload.receivable.outstandingAmount,
            };
        }
        return {
            sale,
            receivableCreated: false,
            receivableId: null,
            outstandingAmount: 0,
        };
    }
    async createRefund(payload) {
        const totalAmount = Number(payload.lines.reduce((sum, line) => sum + line.quantity * 10, 0).toFixed(2));
        const receivable = [...this.receivables.values()].find((item) => item.saleId === payload.saleId && item.status !== 'written_off');
        if (receivable) {
            const creditAmount = Math.min(totalAmount, receivable.outstandingAmount);
            receivable.outstandingAmount = Number((receivable.outstandingAmount - creditAmount).toFixed(2));
            receivable.status = receivable.outstandingAmount <= 0 ? 'closed' : 'partially_paid';
        }
        return {
            id: (0, node_crypto_1.randomUUID)(),
            saleId: payload.saleId,
            refundNumber: payload.refundNumber,
            status: 'posted',
            totalAmount,
            refundDate: payload.refundDate,
        };
    }
};
exports.InMemorySalesRepository = InMemorySalesRepository;
exports.InMemorySalesRepository = InMemorySalesRepository = __decorate([
    (0, common_1.Injectable)()
], InMemorySalesRepository);
//# sourceMappingURL=in-memory-sales.repository.js.map