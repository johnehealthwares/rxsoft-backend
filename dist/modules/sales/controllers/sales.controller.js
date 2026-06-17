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
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const create_sale_dto_1 = require("../dto/create-sale.dto");
const create_sale_refund_dto_1 = require("../dto/create-sale-refund.dto");
const create_sale_response_dto_1 = require("../dto/create-sale-response.dto");
const create_sale_refund_response_dto_1 = require("../dto/create-sale-refund-response.dto");
const list_sales_dto_1 = require("../dto/list-sales.dto");
const create_sale_refund_use_case_1 = require("../services/create-sale-refund.use-case");
const create_sale_use_case_1 = require("../services/create-sale.use-case");
const list_sales_use_case_1 = require("../services/list-sales.use-case");
let SalesController = class SalesController {
    listSalesUseCase;
    createSaleUseCase;
    createSaleRefundUseCase;
    constructor(listSalesUseCase, createSaleUseCase, createSaleRefundUseCase) {
        this.listSalesUseCase = listSalesUseCase;
        this.createSaleUseCase = createSaleUseCase;
        this.createSaleRefundUseCase = createSaleRefundUseCase;
    }
    async listSales(query, currentUser) {
        const result = await this.listSalesUseCase.execute(query, currentUser.organizationId);
        return {
            data: result.items.map((sale) => ({
                id: sale.id,
                saleNumber: sale.saleNumber,
                saleChannel: sale.saleChannel,
                status: sale.status,
                totalAmount: sale.totalAmount,
                paidAmount: sale.paidAmount,
                changeAmount: sale.changeAmount,
                saleDate: sale.saleDate.toISOString(),
            })),
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    async createSale(payload, currentUser) {
        const result = await this.createSaleUseCase.execute(payload, currentUser.organizationId, currentUser.sub);
        return {
            id: result.sale.id,
            saleNumber: result.sale.saleNumber,
            saleChannel: result.sale.saleChannel,
            status: result.sale.status,
            totalAmount: result.sale.totalAmount,
            paidAmount: result.sale.paidAmount,
            changeAmount: result.sale.changeAmount,
            saleDate: result.sale.saleDate.toISOString(),
            receivableCreated: result.receivableCreated,
            receivableId: result.receivableId,
            outstandingAmount: result.outstandingAmount,
        };
    }
    async createRefund(saleId, payload, currentUser) {
        const result = await this.createSaleRefundUseCase.execute(saleId, payload, currentUser.organizationId, currentUser.sub);
        return {
            id: result.id,
            saleId: result.saleId,
            refundNumber: result.refundNumber,
            status: result.status,
            totalAmount: result.totalAmount,
            refundDate: result.refundDate.toISOString(),
        };
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'cashier', 'auditor'),
    (0, swagger_1.ApiOperation)({ summary: 'List sales with pagination and optional status filter' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_sales_dto_1.ListSalesDto, Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "listSales", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'cashier'),
    (0, audit_action_decorator_1.AuditAction)('sales.sale.create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create posted sale and receivable on underpayment' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_sale_response_dto_1.CreateSaleResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_dto_1.CreateSaleDto, Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "createSale", null);
__decorate([
    (0, common_1.Post)(':saleId/refunds'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'cashier'),
    (0, audit_action_decorator_1.AuditAction)('sales.sale.refund.create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create sale refund with quantity validation against original sale lines' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: create_sale_refund_response_dto_1.CreateSaleRefundResponseDto }),
    __param(0, (0, common_1.Param)('saleId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_sale_refund_dto_1.CreateSaleRefundDto, Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "createRefund", null);
exports.SalesController = SalesController = __decorate([
    (0, swagger_1.ApiTags)('sales'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [list_sales_use_case_1.ListSalesUseCase,
        create_sale_use_case_1.CreateSaleUseCase,
        create_sale_refund_use_case_1.CreateSaleRefundUseCase])
], SalesController);
//# sourceMappingURL=sales.controller.js.map