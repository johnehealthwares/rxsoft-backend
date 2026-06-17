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
exports.PricingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const pricing_dto_1 = require("../dto/pricing.dto");
const pricing_service_1 = require("../services/pricing.service");
let PricingController = class PricingController {
    pricingService;
    constructor(pricingService) {
        this.pricingService = pricingService;
    }
    async list(query, currentUser) {
        const result = await this.pricingService.listPriceLists(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async search(query, currentUser) {
        const result = await this.pricingService.listPriceLists(query, currentUser.organizationId);
        return { data: result.data.map((item) => ({ id: item.id, code: item.code, name: item.name })) };
    }
    async createItem(payload, currentUser) {
        return this.pricingService.createPriceListItem(payload, currentUser.organizationId);
    }
    async listAllItems(query, currentUser) {
        const result = await this.pricingService.listPriceListItems(null, query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async get(priceListId, currentUser) {
        return this.pricingService.getPriceList(priceListId, currentUser.organizationId);
    }
    async create(payload, currentUser) {
        return this.pricingService.createPriceList(payload, currentUser.organizationId);
    }
    async update(priceListId, payload, currentUser) {
        return this.pricingService.updatePriceList(priceListId, payload, currentUser.organizationId);
    }
    async listPriceListItems(priceListId, query, currentUser) {
        const result = await this.pricingService.listPriceListItems(priceListId, query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async updateItem(priceListId, itemId, payload, currentUser) {
        return this.pricingService.updatePriceListItem(priceListId, itemId, payload, currentUser.organizationId);
    }
    async adjustPrice(payload, currentUser) {
        return this.pricingService.adjustItemPrice(payload, currentUser.organizationId);
    }
    async remove(priceListId, currentUser) {
        await this.pricingService.deletePriceList(priceListId, currentUser.organizationId);
    }
    async removeItem(priceListId, itemId, currentUser) {
        await this.pricingService.deletePriceListItem(priceListId, itemId, currentUser.organizationId);
    }
};
exports.PricingController = PricingController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'List price lists' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pricing_dto_1.ListPriceListsDto, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pricing_dto_1.ListPriceListsDto, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('/items'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('pricing.price_list_item.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pricing_dto_1.CreatePriceListItemDto, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "createItem", null);
__decorate([
    (0, common_1.Get)('/items'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pricing_dto_1.ListPriceListItemsDto, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "listAllItems", null);
__decorate([
    (0, common_1.Get)(':priceListId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    __param(0, (0, common_1.Param)('priceListId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('pricing.price_list.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pricing_dto_1.CreatePriceListDto, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':priceListId'),
    (0, common_1.Patch)(':priceListId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('pricing.price_list.update'),
    __param(0, (0, common_1.Param)('priceListId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pricing_dto_1.UpdatePriceListDto, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':priceListId/items'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    __param(0, (0, common_1.Param)('priceListId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pricing_dto_1.ListPriceListItemsDto, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "listPriceListItems", null);
__decorate([
    (0, common_1.Patch)(':priceListId/items/:priceListItemId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('pricing.price_list_item.update'),
    __param(0, (0, common_1.Param)('priceListId')),
    __param(1, (0, common_1.Param)('priceListItemId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, pricing_dto_1.UpdatePriceListItemDto, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Post)('adjust-price'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('pricing.item_price.adjust'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pricing_dto_1.AdjustItemPriceDto, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "adjustPrice", null);
__decorate([
    (0, common_1.Delete)(':priceListId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('pricing.price_list.delete'),
    __param(0, (0, common_1.Param)('priceListId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':priceListId/items/:itemId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('pricing.price_list_item.delete'),
    __param(0, (0, common_1.Param)('priceListId')),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "removeItem", null);
exports.PricingController = PricingController = __decorate([
    (0, swagger_1.ApiTags)('price-lists'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('price-lists'),
    __metadata("design:paramtypes", [pricing_service_1.PricingService])
], PricingController);
//# sourceMappingURL=pricing.controller.js.map