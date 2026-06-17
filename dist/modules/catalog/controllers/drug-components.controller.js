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
exports.DrugComponentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const drug_components_dto_1 = require("../dto/drug-components.dto");
const drug_components_service_1 = require("../services/drug-components.service");
let DrugComponentsController = class DrugComponentsController {
    drugComponentsService;
    constructor(drugComponentsService) {
        this.drugComponentsService = drugComponentsService;
    }
    async list(query, currentUser) {
        const result = await this.drugComponentsService.list(query, currentUser.organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async get(drugComponentId, currentUser) {
        return this.drugComponentsService.get(drugComponentId, currentUser.organizationId);
    }
    async create(payload, currentUser) {
        return this.drugComponentsService.create(payload, currentUser.organizationId);
    }
    async replace(drugComponentId, payload, currentUser) {
        return this.drugComponentsService.update(drugComponentId, payload, currentUser.organizationId);
    }
    async patch(drugComponentId, payload, currentUser) {
        return this.drugComponentsService.update(drugComponentId, payload, currentUser.organizationId);
    }
    async remove(drugComponentId, currentUser) {
        await this.drugComponentsService.remove(drugComponentId, currentUser.organizationId);
    }
};
exports.DrugComponentsController = DrugComponentsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [drug_components_dto_1.ListDrugComponentsDto, Object]),
    __metadata("design:returntype", Promise)
], DrugComponentsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':drugComponentId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    __param(0, (0, common_1.Param)('drugComponentId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DrugComponentsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.drug_component.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [drug_components_dto_1.CreateDrugComponentDto, Object]),
    __metadata("design:returntype", Promise)
], DrugComponentsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':drugComponentId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.drug_component.update'),
    __param(0, (0, common_1.Param)('drugComponentId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, drug_components_dto_1.UpdateDrugComponentDto, Object]),
    __metadata("design:returntype", Promise)
], DrugComponentsController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':drugComponentId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.drug_component.update'),
    __param(0, (0, common_1.Param)('drugComponentId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, drug_components_dto_1.UpdateDrugComponentDto, Object]),
    __metadata("design:returntype", Promise)
], DrugComponentsController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':drugComponentId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.drug_component.delete'),
    __param(0, (0, common_1.Param)('drugComponentId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DrugComponentsController.prototype, "remove", null);
exports.DrugComponentsController = DrugComponentsController = __decorate([
    (0, swagger_1.ApiTags)('drug-components'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('drug-components'),
    __metadata("design:paramtypes", [drug_components_service_1.DrugComponentsService])
], DrugComponentsController);
//# sourceMappingURL=drug-components.controller.js.map