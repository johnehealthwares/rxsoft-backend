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
exports.ManufacturersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const manufacturers_dto_1 = require("../dto/manufacturers.dto");
const manufacturers_service_1 = require("../services/manufacturers.service");
let ManufacturersController = class ManufacturersController {
    manufacturersService;
    constructor(manufacturersService) {
        this.manufacturersService = manufacturersService;
    }
    async list(query, currentUser) {
        const result = await this.manufacturersService.list(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async metrics(currentUser) {
        return this.manufacturersService.getLastCreated(currentUser.organizationId);
    }
    async get(manufacturerId, currentUser) {
        return this.manufacturersService.get(manufacturerId, currentUser.organizationId);
    }
    async create(payload, currentUser) {
        return this.manufacturersService.create(payload, currentUser.organizationId);
    }
    async replace(manufacturerId, payload, currentUser) {
        return this.manufacturersService.update(manufacturerId, payload, currentUser.organizationId);
    }
    async patch(manufacturerId, payload, currentUser) {
        return this.manufacturersService.update(manufacturerId, payload, currentUser.organizationId);
    }
    async remove(manufacturerId, currentUser) {
        await this.manufacturersService.remove(manufacturerId, currentUser.organizationId);
    }
};
exports.ManufacturersController = ManufacturersController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manufacturers_dto_1.ListManufacturersDto, Object]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "metrics", null);
__decorate([
    (0, common_1.Get)(':manufacturerId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    __param(0, (0, common_1.Param)('manufacturerId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.manufacturer.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manufacturers_dto_1.CreateManufacturerDto, Object]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':manufacturerId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.manufacturer.update'),
    __param(0, (0, common_1.Param)('manufacturerId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manufacturers_dto_1.UpdateManufacturerDto, Object]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':manufacturerId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.manufacturer.update'),
    __param(0, (0, common_1.Param)('manufacturerId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manufacturers_dto_1.UpdateManufacturerDto, Object]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':manufacturerId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.manufacturer.delete'),
    __param(0, (0, common_1.Param)('manufacturerId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "remove", null);
exports.ManufacturersController = ManufacturersController = __decorate([
    (0, swagger_1.ApiTags)('manufacturers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('manufacturers'),
    __metadata("design:paramtypes", [manufacturers_service_1.ManufacturersService])
], ManufacturersController);
//# sourceMappingURL=manufacturers.controller.js.map