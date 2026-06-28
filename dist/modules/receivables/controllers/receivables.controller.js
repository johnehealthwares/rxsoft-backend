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
exports.ReceivablesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const apply_receivable_adjustment_dto_1 = require("../dto/apply-receivable-adjustment.dto");
const collect_receivable_payment_dto_1 = require("../dto/collect-receivable-payment.dto");
const list_receivable_transactions_dto_1 = require("../dto/list-receivable-transactions.dto");
const list_receivables_dto_1 = require("../dto/list-receivables.dto");
const write_off_receivable_dto_1 = require("../dto/write-off-receivable.dto");
const apply_receivable_adjustment_use_case_1 = require("../services/apply-receivable-adjustment.use-case");
const collect_receivable_payment_use_case_1 = require("../services/collect-receivable-payment.use-case");
const list_receivable_transactions_use_case_1 = require("../services/list-receivable-transactions.use-case");
const list_receivables_use_case_1 = require("../services/list-receivables.use-case");
const write_off_receivable_use_case_1 = require("../services/write-off-receivable.use-case");
function toReceivableResponse(item) {
    return {
        id: item.id,
        customerId: item.customerId,
        customer: item.customerName ? { id: item.customerId, name: item.customerName } : null,
        saleId: item.saleId,
        receivableNumber: item.receivableNumber,
        originalAmount: item.originalAmount,
        outstandingAmount: item.outstandingAmount,
        status: item.status,
        openedAt: item.openedAt.toISOString(),
        closedAt: item.closedAt ? item.closedAt.toISOString() : null,
    };
}
function toTransactionResponse(item) {
    return {
        id: item.id,
        receivableId: item.receivableId,
        transactionType: item.transactionType,
        amount: item.amount,
        transactionDate: item.transactionDate.toISOString(),
        paymentMethodId: item.paymentMethodId,
        referenceNumber: item.referenceNumber,
        receivedByUserId: item.receivedByUserId,
        note: item.note,
    };
}
let ReceivablesController = class ReceivablesController {
    listReceivablesUseCase;
    collectReceivablePaymentUseCase;
    applyReceivableAdjustmentUseCase;
    writeOffReceivableUseCase;
    listReceivableTransactionsUseCase;
    constructor(listReceivablesUseCase, collectReceivablePaymentUseCase, applyReceivableAdjustmentUseCase, writeOffReceivableUseCase, listReceivableTransactionsUseCase) {
        this.listReceivablesUseCase = listReceivablesUseCase;
        this.collectReceivablePaymentUseCase = collectReceivablePaymentUseCase;
        this.applyReceivableAdjustmentUseCase = applyReceivableAdjustmentUseCase;
        this.writeOffReceivableUseCase = writeOffReceivableUseCase;
        this.listReceivableTransactionsUseCase = listReceivableTransactionsUseCase;
    }
    async list(query, currentUser) {
        const result = await this.listReceivablesUseCase.execute(query, currentUser.organizationId);
        return {
            data: result.items.map(toReceivableResponse),
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    async listTransactions(receivableId, query, currentUser) {
        const result = await this.listReceivableTransactionsUseCase.execute(receivableId, query, currentUser.organizationId);
        return {
            data: result.items.map(toTransactionResponse),
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    async collectPayment(receivableId, payload, currentUser) {
        const result = await this.collectReceivablePaymentUseCase.execute(receivableId, payload, currentUser.organizationId, currentUser.sub);
        return {
            receivable: toReceivableResponse(result.receivable),
            transactionId: result.transactionId,
        };
    }
    async applyAdjustment(receivableId, payload, currentUser) {
        const result = await this.applyReceivableAdjustmentUseCase.execute(receivableId, payload, currentUser.organizationId, currentUser.sub);
        return {
            receivable: toReceivableResponse(result.receivable),
            transactionId: result.transactionId,
        };
    }
    async writeOff(receivableId, payload, currentUser) {
        const result = await this.writeOffReceivableUseCase.execute(receivableId, payload, currentUser.organizationId, currentUser.sub);
        return {
            receivable: toReceivableResponse(result.receivable),
            transactionId: result.transactionId,
        };
    }
};
exports.ReceivablesController = ReceivablesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'cashier', 'auditor'),
    (0, swagger_1.ApiOperation)({ summary: 'List receivables with pagination and filters' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_receivables_dto_1.ListReceivablesDto, Object]),
    __metadata("design:returntype", Promise)
], ReceivablesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':receivableId/transactions'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'cashier', 'auditor'),
    (0, swagger_1.ApiOperation)({ summary: 'List receivable transactions with pagination and optional type filter' }),
    __param(0, (0, common_1.Param)('receivableId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, list_receivable_transactions_dto_1.ListReceivableTransactionsDto, Object]),
    __metadata("design:returntype", Promise)
], ReceivablesController.prototype, "listTransactions", null);
__decorate([
    (0, common_1.Post)(':receivableId/payments'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'cashier'),
    (0, audit_action_decorator_1.AuditAction)('receivables.payment.collect'),
    (0, swagger_1.ApiOperation)({ summary: 'Collect payment against an open receivable' }),
    __param(0, (0, common_1.Param)('receivableId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, collect_receivable_payment_dto_1.CollectReceivablePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], ReceivablesController.prototype, "collectPayment", null);
__decorate([
    (0, common_1.Post)(':receivableId/adjustments'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'cashier'),
    (0, audit_action_decorator_1.AuditAction)('receivables.adjustment.apply'),
    (0, swagger_1.ApiOperation)({ summary: 'Apply signed adjustment to a receivable and record ledger entry' }),
    __param(0, (0, common_1.Param)('receivableId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apply_receivable_adjustment_dto_1.ApplyReceivableAdjustmentDto, Object]),
    __metadata("design:returntype", Promise)
], ReceivablesController.prototype, "applyAdjustment", null);
__decorate([
    (0, common_1.Post)(':receivableId/write-off'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('receivables.writeoff.apply'),
    (0, swagger_1.ApiOperation)({ summary: 'Write off receivable outstanding amount and close it' }),
    __param(0, (0, common_1.Param)('receivableId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, write_off_receivable_dto_1.WriteOffReceivableDto, Object]),
    __metadata("design:returntype", Promise)
], ReceivablesController.prototype, "writeOff", null);
exports.ReceivablesController = ReceivablesController = __decorate([
    (0, swagger_1.ApiTags)('receivables'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('receivables'),
    __metadata("design:paramtypes", [list_receivables_use_case_1.ListReceivablesUseCase,
        collect_receivable_payment_use_case_1.CollectReceivablePaymentUseCase,
        apply_receivable_adjustment_use_case_1.ApplyReceivableAdjustmentUseCase,
        write_off_receivable_use_case_1.WriteOffReceivableUseCase,
        list_receivable_transactions_use_case_1.ListReceivableTransactionsUseCase])
], ReceivablesController);
//# sourceMappingURL=receivables.controller.js.map