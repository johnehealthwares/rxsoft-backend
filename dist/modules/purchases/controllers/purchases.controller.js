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
exports.PurchasesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const list_query_dto_1 = require("../../../shared/dto/list-query.dto");
const purchases_dto_1 = require("../dto/purchases.dto");
const purchases_service_1 = require("../services/purchases.service");
let PurchasesController = class PurchasesController {
    purchasesService;
    constructor(purchasesService) {
        this.purchasesService = purchasesService;
    }
    async list(query, currentUser) {
        const result = await this.purchasesService.list(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    getById(purchaseId, currentUser) {
        return this.purchasesService.getById(purchaseId, currentUser.organizationId);
    }
    create(payload, currentUser) {
        return this.purchasesService.createPurchase(payload, currentUser);
    }
    replace(purchaseId, payload, currentUser) {
        return this.purchasesService.updatePurchase(purchaseId, payload, currentUser);
    }
    patch(purchaseId, payload, currentUser) {
        return this.purchasesService.updatePurchase(purchaseId, payload, currentUser);
    }
    async remove(purchaseId, currentUser) {
        await this.purchasesService.removePurchase(purchaseId, currentUser.organizationId);
    }
    async addLine(purchaseId, payload, currentUser) {
        return this.purchasesService.addLine(purchaseId, payload, currentUser);
    }
    async updateLine(purchaseId, lineId, payload, currentUser) {
        return this.purchasesService.updateLine(purchaseId, lineId, payload, currentUser);
    }
    async removeLine(purchaseId, lineId, currentUser) {
        return this.purchasesService.removeLine(purchaseId, lineId, currentUser);
    }
};
exports.PurchasesController = PurchasesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_query_dto_1.ListQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':purchaseId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    __param(0, (0, common_1.Param)('purchaseId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager'),
    (0, audit_action_decorator_1.AuditAction)('purchase.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purchases_dto_1.CreatePurchaseDto, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':purchaseId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager'),
    (0, audit_action_decorator_1.AuditAction)('purchase.update'),
    __param(0, (0, common_1.Param)('purchaseId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, purchases_dto_1.UpdatePurchaseDto, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':purchaseId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager'),
    (0, audit_action_decorator_1.AuditAction)('purchase.update'),
    __param(0, (0, common_1.Param)('purchaseId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, purchases_dto_1.UpdatePurchaseDto, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':purchaseId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager'),
    (0, audit_action_decorator_1.AuditAction)('purchase.delete'),
    __param(0, (0, common_1.Param)('purchaseId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':purchaseId/lines'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager'),
    (0, audit_action_decorator_1.AuditAction)('purchase.line.create'),
    __param(0, (0, common_1.Param)('purchaseId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, purchases_dto_1.CreatePurchaseLineDto, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "addLine", null);
__decorate([
    (0, common_1.Put)(':purchaseId/lines/:lineId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager'),
    (0, audit_action_decorator_1.AuditAction)('purchase.line.update'),
    __param(0, (0, common_1.Param)('purchaseId')),
    __param(1, (0, common_1.Param)('lineId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, purchases_dto_1.UpdatePurchaseLineDto, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "updateLine", null);
__decorate([
    (0, common_1.Delete)(':purchaseId/lines/:lineId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager'),
    (0, audit_action_decorator_1.AuditAction)('purchase.line.delete'),
    __param(0, (0, common_1.Param)('purchaseId')),
    __param(1, (0, common_1.Param)('lineId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "removeLine", null);
exports.PurchasesController = PurchasesController = __decorate([
    (0, swagger_1.ApiTags)('purchases'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('purchases'),
    __metadata("design:paramtypes", [purchases_service_1.PurchasesService])
], PurchasesController);
//# sourceMappingURL=purchases.controller.js.map