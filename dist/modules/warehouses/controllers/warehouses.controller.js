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
exports.WarehousesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const warehouses_dto_1 = require("../dto/warehouses.dto");
const warehouses_service_1 = require("../services/warehouses.service");
let WarehousesController = class WarehousesController {
    warehousesService;
    constructor(warehousesService) {
        this.warehousesService = warehousesService;
    }
    async list(query, currentUser) {
        const result = await this.warehousesService.list(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async get(warehouseId, currentUser) {
        return this.warehousesService.get(warehouseId, currentUser.organizationId);
    }
    async create(payload, currentUser) {
        return this.warehousesService.create(payload, currentUser.organizationId);
    }
    async update(warehouseId, payload, currentUser) {
        return this.warehousesService.update(warehouseId, payload, currentUser.organizationId);
    }
    async remove(warehouseId, currentUser) {
        await this.warehousesService.remove(warehouseId, currentUser.organizationId);
    }
};
exports.WarehousesController = WarehousesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'List warehouses with pagination' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouses_dto_1.ListWarehousesDto, Object]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':warehouseId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'Get warehouse by ID' }),
    __param(0, (0, common_1.Param)('warehouseId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('inventory.warehouse.create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a warehouse' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouses_dto_1.CreateWarehouseDto, Object]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':warehouseId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('inventory.warehouse.update'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a warehouse' }),
    __param(0, (0, common_1.Param)('warehouseId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, warehouses_dto_1.UpdateWarehouseDto, Object]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':warehouseId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('inventory.warehouse.delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a warehouse' }),
    __param(0, (0, common_1.Param)('warehouseId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "remove", null);
exports.WarehousesController = WarehousesController = __decorate([
    (0, swagger_1.ApiTags)('warehouses'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('warehouses'),
    __metadata("design:paramtypes", [warehouses_service_1.WarehousesService])
], WarehousesController);
//# sourceMappingURL=warehouses.controller.js.map