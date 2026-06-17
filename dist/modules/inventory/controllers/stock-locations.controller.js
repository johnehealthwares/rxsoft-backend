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
exports.StockLocationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const stock_locations_dto_1 = require("../dto/stock-locations.dto");
const stock_locations_service_1 = require("../services/stock-locations.service");
let StockLocationsController = class StockLocationsController {
    stockLocationsService;
    constructor(stockLocationsService) {
        this.stockLocationsService = stockLocationsService;
    }
    async list(query, currentUser) {
        const result = await this.stockLocationsService.list(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async search(query, currentUser) {
        const result = await this.stockLocationsService.list(query, currentUser.organizationId);
        return {
            data: result.data.map((item) => ({ id: item.id, code: item.code, name: item.name })),
            meta: { page: query.page, limit: query.limit, total: result.total },
        };
    }
    async get(stockLocationId, currentUser) {
        return this.stockLocationsService.get(stockLocationId, currentUser.organizationId);
    }
    async create(payload, currentUser) {
        return this.stockLocationsService.create(payload, currentUser.organizationId);
    }
    async replace(stockLocationId, payload, currentUser) {
        return this.stockLocationsService.update(stockLocationId, payload, currentUser.organizationId);
    }
    async patch(stockLocationId, payload, currentUser) {
        return this.stockLocationsService.update(stockLocationId, payload, currentUser.organizationId);
    }
};
exports.StockLocationsController = StockLocationsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'List stock locations' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stock_locations_dto_1.ListStockLocationsDto, Object]),
    __metadata("design:returntype", Promise)
], StockLocationsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stock_locations_dto_1.ListStockLocationsDto, Object]),
    __metadata("design:returntype", Promise)
], StockLocationsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':stockLocationId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    __param(0, (0, common_1.Param)('stockLocationId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StockLocationsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    (0, audit_action_decorator_1.AuditAction)('inventory.stock_location.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stock_locations_dto_1.CreateStockLocationDto, Object]),
    __metadata("design:returntype", Promise)
], StockLocationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':stockLocationId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    (0, audit_action_decorator_1.AuditAction)('inventory.stock_location.update'),
    __param(0, (0, common_1.Param)('stockLocationId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, stock_locations_dto_1.UpdateStockLocationDto, Object]),
    __metadata("design:returntype", Promise)
], StockLocationsController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':stockLocationId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    (0, audit_action_decorator_1.AuditAction)('inventory.stock_location.update'),
    __param(0, (0, common_1.Param)('stockLocationId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, stock_locations_dto_1.UpdateStockLocationDto, Object]),
    __metadata("design:returntype", Promise)
], StockLocationsController.prototype, "patch", null);
exports.StockLocationsController = StockLocationsController = __decorate([
    (0, swagger_1.ApiTags)('stock-locations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('stock-locations'),
    __metadata("design:paramtypes", [stock_locations_service_1.StockLocationsService])
], StockLocationsController);
//# sourceMappingURL=stock-locations.controller.js.map