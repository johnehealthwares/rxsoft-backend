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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const create_stock_adjustment_dto_1 = require("../dto/create-stock-adjustment.dto");
const create_stock_transfer_dto_1 = require("../dto/create-stock-transfer.dto");
const list_stock_balances_dto_1 = require("../dto/list-stock-balances.dto");
const list_stock_movements_dto_1 = require("../dto/list-stock-movements.dto");
const stock_locations_dto_1 = require("../dto/stock-locations.dto");
const create_stock_adjustment_use_case_1 = require("../services/create-stock-adjustment.use-case");
const list_stock_balances_use_case_1 = require("../services/list-stock-balances.use-case");
const list_stock_movements_use_case_1 = require("../services/list-stock-movements.use-case");
const inventory_service_1 = require("../services/inventory.service");
function mapBalance(balance) {
    return {
        id: balance.id,
        item: balance.item,
        location: balance.location,
        lot: balance.lot,
        itemId: balance.item.id,
        locationId: balance.location.id,
        lotId: balance.lot?.id ?? null,
        quantityOnHand: balance.quantityOnHand,
        quantityReserved: balance.quantityReserved,
        averageCost: balance.averageCost,
        reorderMinQty: balance.reorderMinQty,
        reorderMaxQty: balance.reorderMaxQty,
    };
}
let InventoryController = class InventoryController {
    listStockBalancesUseCase;
    listStockMovementsUseCase;
    createStockAdjustmentUseCase;
    inventoryService;
    constructor(listStockBalancesUseCase, listStockMovementsUseCase, createStockAdjustmentUseCase, inventoryService) {
        this.listStockBalancesUseCase = listStockBalancesUseCase;
        this.listStockMovementsUseCase = listStockMovementsUseCase;
        this.createStockAdjustmentUseCase = createStockAdjustmentUseCase;
        this.inventoryService = inventoryService;
    }
    async listStockBalances(query, currentUser) {
        const result = await this.listStockBalancesUseCase.execute(query, currentUser.organizationId);
        return {
            data: result.items.map(mapBalance),
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    async listStockMovements(query, currentUser) {
        const result = await this.listStockMovementsUseCase.execute(query, currentUser.organizationId);
        return {
            data: result.items,
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    async createAdjustment(payload, currentUser) {
        const result = await this.createStockAdjustmentUseCase.execute(payload, currentUser.sub, currentUser.organizationId);
        return mapBalance(result);
    }
    async adjustQuantity(payload, currentUser) {
        const result = await this.inventoryService.adjustByReference(payload, currentUser.sub, currentUser.organizationId);
        return mapBalance(result);
    }
    async transferStock(payload, currentUser) {
        const result = await this.inventoryService.transfer(payload, currentUser.sub, currentUser.organizationId);
        return {
            message: 'Stock transferred successfully',
            fromBalance: mapBalance(result.fromBalance),
            toBalance: mapBalance(result.toBalance),
        };
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)('stock-balances'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'inventory_clerk', 'pharmacist'),
    (0, swagger_1.ApiOperation)({ summary: 'List stock balances with pagination and filters' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_stock_balances_dto_1.ListStockBalancesDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "listStockBalances", null);
__decorate([
    (0, common_1.Get)('stock-movements'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'inventory_clerk', 'pharmacist'),
    (0, swagger_1.ApiOperation)({ summary: 'List stock movements with pagination and optional movement type filter' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_stock_movements_dto_1.ListStockMovementsDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "listStockMovements", null);
__decorate([
    (0, common_1.Post)('adjustments'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'inventory_clerk'),
    (0, audit_action_decorator_1.AuditAction)('inventory.stock.adjust'),
    (0, swagger_1.ApiOperation)({ summary: 'Apply stock adjustment to an existing stock balance record' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_adjustment_dto_1.CreateStockAdjustmentDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createAdjustment", null);
__decorate([
    (0, common_1.Post)('adjust-quantity'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'inventory_clerk'),
    (0, audit_action_decorator_1.AuditAction)('inventory.stock.adjust_by_reference'),
    (0, swagger_1.ApiOperation)({ summary: 'Adjust stock quantity by product and location, creating balance if needed' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stock_locations_dto_1.AdjustStockByReferenceDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "adjustQuantity", null);
__decorate([
    (0, common_1.Post)('transfers'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'inventory_clerk'),
    (0, audit_action_decorator_1.AuditAction)('inventory.stock.transfer'),
    (0, swagger_1.ApiOperation)({ summary: 'Transfer stock between locations' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_transfer_dto_1.CreateStockTransferDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "transferStock", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('inventory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [list_stock_balances_use_case_1.ListStockBalancesUseCase,
        list_stock_movements_use_case_1.ListStockMovementsUseCase,
        create_stock_adjustment_use_case_1.CreateStockAdjustmentUseCase,
        inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map