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
var CreateSaleUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSaleUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cache_service_1 = require("../../../common/cache/cache.service");
const accounting_integration_service_1 = require("../../accounting/services/accounting-integration.service");
const sales_di_tokens_1 = require("./sales.di-tokens");
const entities_1 = require("../entities");
let CreateSaleUseCase = CreateSaleUseCase_1 = class CreateSaleUseCase {
    salesRepository;
    uomRepository;
    cacheService;
    accountingIntegration;
    logger = new common_1.Logger(CreateSaleUseCase_1.name);
    constructor(salesRepository, uomRepository, cacheService, accountingIntegration) {
        this.salesRepository = salesRepository;
        this.uomRepository = uomRepository;
        this.cacheService = cacheService;
        this.accountingIntegration = accountingIntegration;
    }
    async execute(payload, organizationId, userId) {
        if (!payload.lines.length) {
            throw new common_1.BadRequestException('At least one sale line is required');
        }
        const uomIds = [...new Set(payload.lines.map((l) => l.uomId))];
        const uoms = await this.uomRepository.find({
            where: { id: (0, typeorm_2.In)(uomIds), organizationId },
            select: ['id', 'factor', 'uomType'],
        });
        const uomFactorMap = new Map(uoms.map((u) => [u.id, u.uomType === 'smaller' ? 1 / u.factor : u.factor]));
        const lines = payload.lines.map((line, index) => {
            const factor = line.uomFactor ?? uomFactorMap.get(line.uomId) ?? 1;
            const lineSubtotal = Number((line.quantity * line.unitPrice * factor).toFixed(2));
            return {
                lineNumber: index + 1,
                itemId: line.itemId,
                uomId: line.uomId,
                lotId: line.lotId ?? null,
                quantity: line.quantity,
                unitPrice: line.unitPrice,
                lineSubtotal,
                lineTotal: lineSubtotal,
            };
        });
        const subtotalAmount = Number(lines.reduce((sum, line) => sum + line.lineTotal, 0).toFixed(2));
        const totalAmount = subtotalAmount;
        const payments = payload.payments.map((payment) => ({
            paymentMethodId: payment.paymentMethodId,
            amount: payment.amount,
            paymentReference: payment.paymentReference ?? null,
            paidAt: new Date(),
            receivedByUserId: userId,
        }));
        const paidAmount = Number(payments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2));
        const changeAmount = paidAmount > totalAmount ? Number((paidAmount - totalAmount).toFixed(2)) : 0;
        const outstandingAmount = paidAmount < totalAmount ? Number((totalAmount - paidAmount).toFixed(2)) : 0;
        if (outstandingAmount > 0 && !payload.customerId) {
            throw new common_1.BadRequestException('Customer is required when sale is underpaid');
        }
        const isHold = payload.hold === true;
        const result = await this.salesRepository.createWithSettlement({
            organizationId,
            saleNumber: payload.saleNumber,
            saleChannel: payload.saleChannel,
            storeId: payload.storeId,
            customerId: payload.customerId ?? null,
            stockLocationId: payload.stockLocationId ?? null,
            soldByUserId: userId,
            saleDate: new Date(),
            subtotalAmount,
            totalAmount,
            paidAmount,
            changeAmount,
            lines,
            payments: isHold ? [] : payments,
            status: isHold ? 'draft' : 'posted',
            receivable: !isHold && outstandingAmount > 0
                ? {
                    customerId: payload.customerId,
                    receivableNumber: `AR-${payload.saleNumber}`,
                    originalAmount: outstandingAmount,
                    outstandingAmount,
                }
                : null,
        });
        await this.cacheService?.invalidateByPrefix(`sales:list:${organizationId}:`);
        await this.cacheService?.invalidateByPrefix(`receivables:list:${organizationId}:`);
        if (!isHold && this.accountingIntegration) {
            this.accountingIntegration
                .recordSale(organizationId, { id: result.sale.id, saleNumber: payload.saleNumber, totalAmount, paidAmount }, lines)
                .catch((err) => this.logger.error(`Accounting: failed to record sale ${payload.saleNumber}: ${err.message}`, err.stack));
        }
        return result;
    }
};
exports.CreateSaleUseCase = CreateSaleUseCase;
exports.CreateSaleUseCase = CreateSaleUseCase = CreateSaleUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_di_tokens_1.SALES_REPOSITORY)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.UomOrmEntity)),
    __param(2, (0, common_1.Optional)()),
    __param(3, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        cache_service_1.AppCacheService,
        accounting_integration_service_1.AccountingIntegrationService])
], CreateSaleUseCase);
//# sourceMappingURL=create-sale.use-case.js.map