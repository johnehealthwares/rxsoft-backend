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
exports.PaymentMethodsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const payment_methods_dto_1 = require("../dto/payment-methods.dto");
const payment_methods_service_1 = require("../services/payment-methods.service");
let PaymentMethodsController = class PaymentMethodsController {
    paymentMethodsService;
    constructor(paymentMethodsService) {
        this.paymentMethodsService = paymentMethodsService;
    }
    async list(query, currentUser) {
        const result = await this.paymentMethodsService.list(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async get(paymentMethodId, currentUser) {
        return this.paymentMethodsService.get(paymentMethodId, currentUser.organizationId);
    }
    async create(payload, currentUser) {
        return this.paymentMethodsService.create(payload, currentUser.organizationId);
    }
    async replace(paymentMethodId, payload, currentUser) {
        return this.paymentMethodsService.update(paymentMethodId, payload, currentUser.organizationId);
    }
    async patch(paymentMethodId, payload, currentUser) {
        return this.paymentMethodsService.update(paymentMethodId, payload, currentUser.organizationId);
    }
    async remove(paymentMethodId, currentUser) {
        await this.paymentMethodsService.remove(paymentMethodId, currentUser.organizationId);
    }
};
exports.PaymentMethodsController = PaymentMethodsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_methods_dto_1.ListPaymentMethodsDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':paymentMethodId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier'),
    __param(0, (0, common_1.Param)('paymentMethodId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('sales.payment_method.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_methods_dto_1.CreatePaymentMethodDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':paymentMethodId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('sales.payment_method.update'),
    __param(0, (0, common_1.Param)('paymentMethodId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payment_methods_dto_1.UpdatePaymentMethodDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':paymentMethodId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('sales.payment_method.update'),
    __param(0, (0, common_1.Param)('paymentMethodId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payment_methods_dto_1.UpdatePaymentMethodDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':paymentMethodId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('sales.payment_method.delete'),
    __param(0, (0, common_1.Param)('paymentMethodId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "remove", null);
exports.PaymentMethodsController = PaymentMethodsController = __decorate([
    (0, swagger_1.ApiTags)('payment-methods'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('payment-methods'),
    __metadata("design:paramtypes", [payment_methods_service_1.PaymentMethodsService])
], PaymentMethodsController);
//# sourceMappingURL=payment-methods.controller.js.map