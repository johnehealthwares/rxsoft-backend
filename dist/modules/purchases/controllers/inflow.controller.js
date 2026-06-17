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
exports.InflowController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const goods_receipt_dto_1 = require("../dto/goods-receipt.dto");
const unpost_goods_dto_1 = require("../dto/unpost-goods.dto");
const receive_goods_use_case_1 = require("../services/receive-goods.use-case");
const purchases_di_tokens_1 = require("../services/purchases.di-tokens");
let InflowController = class InflowController {
    receiveGoodsUseCase;
    purchasesRepo;
    constructor(receiveGoodsUseCase, purchasesRepo) {
        this.receiveGoodsUseCase = receiveGoodsUseCase;
        this.purchasesRepo = purchasesRepo;
    }
    async receiveGoods(id, payload, currentUser) {
        payload.purchaseOrderId = id;
        const result = await this.receiveGoodsUseCase.execute(payload, currentUser.organizationId, currentUser.sub);
        return result;
    }
    async unpostGoods(_id, payload, currentUser) {
        if (payload.password !== 'password12') {
            throw new common_1.BadRequestException('Invalid password');
        }
        await this.purchasesRepo.unpostGoods({
            organizationId: currentUser.organizationId,
            receiptLineId: payload.receiptLineId,
            performedByUserId: currentUser.sub,
        });
        return { message: 'Goods receipt line unposted successfully' };
    }
    async listReceiptsByPo(id, page, limit, currentUser) {
        const result = await this.purchasesRepo.listReceipts({
            organizationId: currentUser.organizationId,
            purchaseOrderId: id,
            offset: ((page ?? 1) - 1) * (limit ?? 20),
            limit: limit ?? 20,
        });
        return { data: result.items, total: result.total, page: page ?? 1, limit: limit ?? 20 };
    }
    async listAllReceipts(page, limit, currentUser) {
        const result = await this.purchasesRepo.listReceipts({
            organizationId: currentUser.organizationId,
            offset: ((page ?? 1) - 1) * (limit ?? 20),
            limit: limit ?? 20,
        });
        return { data: result.items, total: result.total, page: page ?? 1, limit: limit ?? 20 };
    }
};
exports.InflowController = InflowController;
__decorate([
    (0, common_1.Post)('purchases/:id/receive'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager'),
    (0, audit_action_decorator_1.AuditAction)('purchase.receive'),
    (0, swagger_1.ApiOperation)({ summary: 'Receive goods for a purchase order' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, goods_receipt_dto_1.ReceiveGoodsDto, Object]),
    __metadata("design:returntype", Promise)
], InflowController.prototype, "receiveGoods", null);
__decorate([
    (0, common_1.Post)('purchases/:id/unpost'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager'),
    (0, audit_action_decorator_1.AuditAction)('purchase.receive.unpost'),
    (0, swagger_1.ApiOperation)({ summary: 'Unpost a goods receipt line' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, unpost_goods_dto_1.UnpostGoodsDto, Object]),
    __metadata("design:returntype", Promise)
], InflowController.prototype, "unpostGoods", null);
__decorate([
    (0, common_1.Get)('purchases/:id/receipts'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    (0, audit_action_decorator_1.AuditAction)('purchase.receipts.list'),
    (0, swagger_1.ApiOperation)({ summary: 'List receipts for a purchase order' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], InflowController.prototype, "listReceiptsByPo", null);
__decorate([
    (0, common_1.Get)('receipts'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    (0, audit_action_decorator_1.AuditAction)('purchase.receipts.list'),
    (0, swagger_1.ApiOperation)({ summary: 'List all goods receipts' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], InflowController.prototype, "listAllReceipts", null);
exports.InflowController = InflowController = __decorate([
    (0, swagger_1.ApiTags)('purchases-inflow'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)(purchases_di_tokens_1.PURCHASES_REPOSITORY)),
    __metadata("design:paramtypes", [receive_goods_use_case_1.ReceiveGoodsUseCase, Object])
], InflowController);
//# sourceMappingURL=inflow.controller.js.map