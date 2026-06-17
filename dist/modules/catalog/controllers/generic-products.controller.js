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
exports.GenericProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const generic_products_dto_1 = require("../dto/generic-products.dto");
const generic_products_service_1 = require("../services/generic-products.service");
let GenericProductsController = class GenericProductsController {
    genericProductsService;
    constructor(genericProductsService) {
        this.genericProductsService = genericProductsService;
    }
    async list(query, currentUser) {
        const result = await this.genericProductsService.list(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async search(query, currentUser) {
        const result = await this.genericProductsService.list(query, currentUser.organizationId);
        return {
            data: result.data.map((item) => ({ id: item.id, code: item.code, name: item.name })),
            meta: { page: query.page, limit: query.limit, total: result.total },
        };
    }
    async get(genericProductId, currentUser) {
        return this.genericProductsService.get(genericProductId, currentUser.organizationId);
    }
    async create(payload, currentUser) {
        return this.genericProductsService.create(payload, currentUser.organizationId);
    }
    async replace(genericProductId, payload, currentUser) {
        return this.genericProductsService.update(genericProductId, payload, currentUser.organizationId);
    }
    async patch(genericProductId, payload, currentUser) {
        return this.genericProductsService.update(genericProductId, payload, currentUser.organizationId);
    }
};
exports.GenericProductsController = GenericProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'List generic products' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generic_products_dto_1.ListGenericProductsDto, Object]),
    __metadata("design:returntype", Promise)
], GenericProductsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generic_products_dto_1.ListGenericProductsDto, Object]),
    __metadata("design:returntype", Promise)
], GenericProductsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':genericProductId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    __param(0, (0, common_1.Param)('genericProductId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GenericProductsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.generic_product.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generic_products_dto_1.CreateGenericProductDto, Object]),
    __metadata("design:returntype", Promise)
], GenericProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':genericProductId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.generic_product.update'),
    __param(0, (0, common_1.Param)('genericProductId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, generic_products_dto_1.UpdateGenericProductDto, Object]),
    __metadata("design:returntype", Promise)
], GenericProductsController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':genericProductId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.generic_product.update'),
    __param(0, (0, common_1.Param)('genericProductId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, generic_products_dto_1.UpdateGenericProductDto, Object]),
    __metadata("design:returntype", Promise)
], GenericProductsController.prototype, "patch", null);
exports.GenericProductsController = GenericProductsController = __decorate([
    (0, swagger_1.ApiTags)('generic-products'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('generic-products'),
    __metadata("design:paramtypes", [generic_products_service_1.GenericProductsService])
], GenericProductsController);
//# sourceMappingURL=generic-products.controller.js.map