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
var ReceiveGoodsUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveGoodsUseCase = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../common/cache/cache.service");
const accounting_integration_service_1 = require("../../accounting/services/accounting-integration.service");
const purchases_di_tokens_1 = require("./purchases.di-tokens");
const code_validation_1 = require("../../../shared/utils/code-validation");
let ReceiveGoodsUseCase = ReceiveGoodsUseCase_1 = class ReceiveGoodsUseCase {
    purchasesRepository;
    cacheService;
    accountingIntegration;
    logger = new common_1.Logger(ReceiveGoodsUseCase_1.name);
    constructor(purchasesRepository, cacheService, accountingIntegration) {
        this.purchasesRepository = purchasesRepository;
        this.cacheService = cacheService;
        this.accountingIntegration = accountingIntegration;
    }
    async execute(payload, organizationId, userId) {
        const po = await this.purchasesRepository.getById(payload.purchaseOrderId, organizationId);
        if (!po) {
            throw new common_1.NotFoundException('Purchase order not found');
        }
        if (po.status !== 'approved' && po.status !== 'partially_received') {
            throw new common_1.BadRequestException('Purchase order must be in approved or partially_received status to receive goods');
        }
        for (const incomingLine of payload.lines) {
            const poLine = po.lines.find((l) => l.itemId === incomingLine.itemId);
            if (!poLine) {
                throw new common_1.BadRequestException(`Item ${incomingLine.itemId} not found on purchase order`);
            }
            const newReceivedQty = Number(poLine.receivedQty) + Number(incomingLine.receivedQty);
            if (newReceivedQty > Number(poLine.orderedQty)) {
                throw new common_1.BadRequestException(`Received quantity for item ${incomingLine.itemId} exceeds ordered quantity`);
            }
        }
        const receiptNumber = payload.receiptNumber;
        if (receiptNumber) {
            const last = await this.purchasesRepository.findLastReceipt(organizationId);
            const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
                providedCode: receiptNumber,
                lastCode: last?.receiptNumber,
                override: payload.overrideCodeValidation,
            });
            if (!valid) {
                throw new common_1.BadRequestException(`Invalid code '${receiptNumber}'. Expected '${expectedCode}'.`);
            }
        }
        const result = await this.purchasesRepository.receiveGoods({
            organizationId,
            receiptNumber: receiptNumber ?? `GR-${Date.now()}`,
            purchaseOrderId: payload.purchaseOrderId,
            receivedDate: new Date(payload.receivedDate),
            createdByUserId: userId,
            note: payload.note ?? null,
            lines: payload.lines.map((line) => ({
                itemId: line.itemId,
                orderedQty: po.lines.find((l) => l.itemId === line.itemId).orderedQty,
                receivedQty: line.receivedQty,
                uomId: line.uomId,
                unitCost: line.unitCost,
            })),
        });
        await this.cacheService?.invalidateByPrefix(`purchases:list:${organizationId}:`);
        if (this.accountingIntegration) {
            this.accountingIntegration
                .recordGoodsReceipt(organizationId, {
                receiptNumber: result.receiptNumber,
                purchaseOrderId: payload.purchaseOrderId,
                lines: payload.lines.map((l) => ({
                    itemId: l.itemId,
                    receivedQty: l.receivedQty,
                    unitCost: l.unitCost,
                })),
            })
                .catch((err) => this.logger.error(`Accounting: failed to record goods receipt: ${err.message}`, err.stack));
        }
        return result;
    }
};
exports.ReceiveGoodsUseCase = ReceiveGoodsUseCase;
exports.ReceiveGoodsUseCase = ReceiveGoodsUseCase = ReceiveGoodsUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(purchases_di_tokens_1.PURCHASES_REPOSITORY)),
    __param(1, (0, common_1.Optional)()),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, cache_service_1.AppCacheService,
        accounting_integration_service_1.AccountingIntegrationService])
], ReceiveGoodsUseCase);
//# sourceMappingURL=receive-goods.use-case.js.map