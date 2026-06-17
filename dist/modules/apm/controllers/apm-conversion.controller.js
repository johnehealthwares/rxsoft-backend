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
exports.ApmWhatsAppController = exports.ApmStakeholderController = exports.ApmConversionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const apm_conversion_service_1 = require("../services/apm-conversion.service");
const apm_dto_1 = require("../dto/apm.dto");
const conversion_dto_1 = require("../dto/conversion.dto");
let ApmConversionController = class ApmConversionController {
    conversionService;
    constructor(conversionService) {
        this.conversionService = conversionService;
    }
    getDashboard() {
        return this.conversionService.getDashboard();
    }
    getLgaConversionDashboard() {
        return this.conversionService.getLgaConversionDashboard();
    }
    getWardConversionDashboard(lgaId) {
        return this.conversionService.getWardConversionDashboard(lgaId);
    }
    getPollingUnitDashboard(wardId) {
        return this.conversionService.getPollingUnitDashboard(wardId);
    }
    updateScore(entityType, entityId, dto) {
        return this.conversionService.updateScore(entityType, entityId, dto);
    }
    updatePollingUnit(id, dto) {
        return this.conversionService.updatePollingUnit(id, dto);
    }
};
exports.ApmConversionController = ApmConversionController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get conversion dashboard summary' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmConversionController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('lgas'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get LGA conversion dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmConversionController.prototype, "getLgaConversionDashboard", null);
__decorate([
    (0, common_1.Get)('wards/:lgaId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ward conversion dashboard for LGA' }),
    __param(0, (0, common_1.Param)('lgaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmConversionController.prototype, "getWardConversionDashboard", null);
__decorate([
    (0, common_1.Get)('polling-units/:wardId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get polling units for ward' }),
    __param(0, (0, common_1.Param)('wardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmConversionController.prototype, "getPollingUnitDashboard", null);
__decorate([
    (0, common_1.Put)('score/:entityType/:entityId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update conversion score for LGA or ward' }),
    __param(0, (0, common_1.Param)('entityType')),
    __param(1, (0, common_1.Param)('entityId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, conversion_dto_1.UpdateConversionScoreDto]),
    __metadata("design:returntype", void 0)
], ApmConversionController.prototype, "updateScore", null);
__decorate([
    (0, common_1.Put)('polling-units/:id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update polling unit details' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, conversion_dto_1.UpdatePollingUnitDto]),
    __metadata("design:returntype", void 0)
], ApmConversionController.prototype, "updatePollingUnit", null);
exports.ApmConversionController = ApmConversionController = __decorate([
    (0, swagger_1.ApiTags)('apm-conversion'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/conversion'),
    __metadata("design:paramtypes", [apm_conversion_service_1.ApmConversionService])
], ApmConversionController);
let ApmStakeholderController = class ApmStakeholderController {
    conversionService;
    constructor(conversionService) {
        this.conversionService = conversionService;
    }
    listStakeholders(query) {
        return this.conversionService.listStakeholders(query);
    }
    listStakeholdersByLga(lgaId, query) {
        return this.conversionService.listStakeholdersByLga(lgaId, query);
    }
    getStakeholder(id) {
        return this.conversionService.getStakeholder(id);
    }
    createStakeholder(dto) {
        return this.conversionService.createStakeholder(dto);
    }
    updateStakeholder(id, dto) {
        return this.conversionService.updateStakeholder(id, dto);
    }
    createActivity(id, dto) {
        return this.conversionService.createActivity(id, dto);
    }
    listActivities(id) {
        return this.conversionService.listActivities(id);
    }
};
exports.ApmStakeholderController = ApmStakeholderController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List all stakeholders' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmStakeholderController.prototype, "listStakeholders", null);
__decorate([
    (0, common_1.Get)('lga/:lgaId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List stakeholders by LGA' }),
    __param(0, (0, common_1.Param)('lgaId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmStakeholderController.prototype, "listStakeholdersByLga", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get stakeholder details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmStakeholderController.prototype, "getStakeholder", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a stakeholder' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conversion_dto_1.CreateStakeholderDto]),
    __metadata("design:returntype", void 0)
], ApmStakeholderController.prototype, "createStakeholder", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a stakeholder' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, conversion_dto_1.UpdateStakeholderDto]),
    __metadata("design:returntype", void 0)
], ApmStakeholderController.prototype, "updateStakeholder", null);
__decorate([
    (0, common_1.Post)(':id/activities'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Add activity to stakeholder' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, conversion_dto_1.CreateConversionActivityDto]),
    __metadata("design:returntype", void 0)
], ApmStakeholderController.prototype, "createActivity", null);
__decorate([
    (0, common_1.Get)(':id/activities'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List stakeholder activities' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmStakeholderController.prototype, "listActivities", null);
exports.ApmStakeholderController = ApmStakeholderController = __decorate([
    (0, swagger_1.ApiTags)('apm-stakeholders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/stakeholders'),
    __metadata("design:paramtypes", [apm_conversion_service_1.ApmConversionService])
], ApmStakeholderController);
let ApmWhatsAppController = class ApmWhatsAppController {
    conversionService;
    constructor(conversionService) {
        this.conversionService = conversionService;
    }
    listGroups(level) {
        return this.conversionService.listWhatsAppGroups(level);
    }
    createGroup(dto) {
        return this.conversionService.createWhatsAppGroup(dto);
    }
};
exports.ApmWhatsAppController = ApmWhatsAppController;
__decorate([
    (0, common_1.Get)('groups'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List WhatsApp groups' }),
    __param(0, (0, common_1.Query)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmWhatsAppController.prototype, "listGroups", null);
__decorate([
    (0, common_1.Post)('groups'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create WhatsApp group' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conversion_dto_1.CreateWhatsAppGroupDto]),
    __metadata("design:returntype", void 0)
], ApmWhatsAppController.prototype, "createGroup", null);
exports.ApmWhatsAppController = ApmWhatsAppController = __decorate([
    (0, swagger_1.ApiTags)('apm-whatsapp'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/whatsapp'),
    __metadata("design:paramtypes", [apm_conversion_service_1.ApmConversionService])
], ApmWhatsAppController);
//# sourceMappingURL=apm-conversion.controller.js.map