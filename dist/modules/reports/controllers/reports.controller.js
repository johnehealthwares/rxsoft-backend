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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const list_query_dto_1 = require("../../../shared/dto/list-query.dto");
const csv_1 = require("../../../shared/utils/csv");
const sales_service_1 = require("../../sales/services/sales.service");
const inventory_service_1 = require("../../inventory/services/inventory.service");
let ReportsController = class ReportsController {
    salesService;
    inventoryService;
    constructor(salesService, inventoryService) {
        this.salesService = salesService;
        this.inventoryService = inventoryService;
    }
    async dailySales() {
        const allSales = await this.salesService.listAll();
        const grouped = new Map();
        allSales.forEach((sale) => {
            const day = sale.saleDate.toISOString().slice(0, 10);
            const current = grouped.get(day) ?? { day, salesCount: 0, totalAmount: 0 };
            current.salesCount += 1;
            current.totalAmount += sale.totalAmount;
            grouped.set(day, current);
        });
        return [...grouped.values()].sort((a, b) => b.day.localeCompare(a.day));
    }
    async inventoryValuation() {
        const inventory = await this.inventoryService.listAll();
        return {
            itemsCount: inventory.length,
            totalQuantity: inventory.reduce((sum, item) => sum + item.quantity, 0),
        };
    }
    topSellingProducts() {
        return [
            { itemCode: 'PCM-500', quantitySold: 120, revenue: 144 },
            { itemCode: 'AMX-250', quantitySold: 82, revenue: 205 },
        ];
    }
    async exportSummary(query) {
        const sales = (await this.salesService.list(query)).data;
        return (0, csv_1.toCsv)(sales);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('daily-sales'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "dailySales", null);
__decorate([
    (0, common_1.Get)('inventory-valuation'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "inventoryValuation", null);
__decorate([
    (0, common_1.Get)('top-selling-items'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ReportsController.prototype, "topSellingProducts", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    (0, common_1.Header)('Content-Type', 'text/csv'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_query_dto_1.ListQueryDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportSummary", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [sales_service_1.SalesService,
        inventory_service_1.InventoryService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map