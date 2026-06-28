"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryReceivablesRepository = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const account_receivable_entity_1 = require("../domains/account-receivable.entity");
const receivable_transaction_entity_1 = require("../domains/receivable-transaction.entity");
let InMemoryReceivablesRepository = class InMemoryReceivablesRepository {
    receivables = new Map([
        [
            'ar1',
            new account_receivable_entity_1.AccountReceivable('ar1', 'org1', 'cust1', null, 'sale1', 'AR-SALE-0001', 100, 100, 'open', new Date('2026-02-20T10:00:00.000Z'), null),
        ],
    ]);
    transactions = new Map();
    async list(query) {
        let items = [...this.receivables.values()].filter((item) => item.organizationId === query.organizationId);
        if (query.status) {
            items = items.filter((item) => item.status === query.status);
        }
        if (query.customerId) {
            items = items.filter((item) => item.customerId === query.customerId);
        }
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total: items.length,
        };
    }
    async collectPayment(payload) {
        const receivable = this.receivables.get(payload.receivableId);
        if (!receivable || receivable.organizationId !== payload.organizationId) {
            throw new common_1.NotFoundException('Receivable not found');
        }
        if (receivable.status === 'written_off') {
            throw new common_1.BadRequestException('Cannot collect payment for a written-off receivable');
        }
        if (receivable.status === 'closed' || receivable.outstandingAmount <= 0) {
            throw new common_1.BadRequestException('Cannot collect payment for a closed receivable');
        }
        if (payload.amount > receivable.outstandingAmount) {
            throw new common_1.BadRequestException('Payment amount cannot exceed outstanding amount');
        }
        receivable.outstandingAmount = Number((receivable.outstandingAmount - payload.amount).toFixed(2));
        if (receivable.outstandingAmount <= 0) {
            receivable.outstandingAmount = 0;
            receivable.status = 'closed';
            receivable.closedAt = payload.transactionDate;
        }
        else {
            receivable.status = 'partially_paid';
        }
        this.receivables.set(receivable.id, receivable);
        const transactionId = (0, node_crypto_1.randomUUID)();
        const existing = this.transactions.get(receivable.id) ?? [];
        this.transactions.set(receivable.id, [
            new receivable_transaction_entity_1.ReceivableTransaction(transactionId, receivable.id, 'payment', payload.amount, payload.transactionDate, payload.paymentMethodId, payload.referenceNumber, payload.receivedByUserId, payload.note),
            ...existing,
        ]);
        return {
            receivable,
            transactionId,
        };
    }
    async applyAdjustment(payload) {
        const receivable = this.receivables.get(payload.receivableId);
        if (!receivable || receivable.organizationId !== payload.organizationId) {
            throw new common_1.NotFoundException('Receivable not found');
        }
        if (receivable.status === 'written_off') {
            throw new common_1.BadRequestException('Cannot adjust a written-off receivable');
        }
        receivable.outstandingAmount = Number((receivable.outstandingAmount + payload.amount).toFixed(2));
        if (receivable.outstandingAmount <= 0) {
            receivable.outstandingAmount = 0;
            receivable.status = 'closed';
            receivable.closedAt = payload.transactionDate;
        }
        else if (receivable.outstandingAmount < receivable.originalAmount) {
            receivable.status = 'partially_paid';
            receivable.closedAt = null;
        }
        else {
            receivable.status = 'open';
            receivable.closedAt = null;
        }
        this.receivables.set(receivable.id, receivable);
        const transactionId = (0, node_crypto_1.randomUUID)();
        const existing = this.transactions.get(receivable.id) ?? [];
        this.transactions.set(receivable.id, [
            new receivable_transaction_entity_1.ReceivableTransaction(transactionId, receivable.id, 'adjustment', payload.amount, payload.transactionDate, null, payload.referenceNumber, payload.adjustedByUserId, payload.note),
            ...existing,
        ]);
        return {
            receivable,
            transactionId,
        };
    }
    async writeOff(payload) {
        const receivable = this.receivables.get(payload.receivableId);
        if (!receivable || receivable.organizationId !== payload.organizationId) {
            throw new common_1.NotFoundException('Receivable not found');
        }
        if (receivable.status === 'written_off') {
            throw new common_1.BadRequestException('Receivable is already written off');
        }
        if (receivable.outstandingAmount <= 0) {
            throw new common_1.BadRequestException('Only receivables with outstanding balance can be written off');
        }
        const writtenOffAmount = receivable.outstandingAmount;
        receivable.outstandingAmount = 0;
        receivable.status = 'written_off';
        receivable.closedAt = payload.transactionDate;
        this.receivables.set(receivable.id, receivable);
        const transactionId = (0, node_crypto_1.randomUUID)();
        const existing = this.transactions.get(receivable.id) ?? [];
        this.transactions.set(receivable.id, [
            new receivable_transaction_entity_1.ReceivableTransaction(transactionId, receivable.id, 'write_off', writtenOffAmount, payload.transactionDate, null, null, payload.writtenOffByUserId, payload.note),
            ...existing,
        ]);
        return {
            receivable,
            transactionId,
        };
    }
    async listTransactions(query) {
        const receivable = this.receivables.get(query.receivableId);
        if (!receivable || receivable.organizationId !== query.organizationId) {
            return { items: [], total: 0 };
        }
        let items = this.transactions.get(query.receivableId) ?? [];
        if (query.transactionType) {
            items = items.filter((item) => item.transactionType === query.transactionType);
        }
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total: items.length,
        };
    }
};
exports.InMemoryReceivablesRepository = InMemoryReceivablesRepository;
exports.InMemoryReceivablesRepository = InMemoryReceivablesRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryReceivablesRepository);
//# sourceMappingURL=in-memory-receivables.repository.js.map