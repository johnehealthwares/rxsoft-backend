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
exports.ApmAdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const apm_service_1 = require("../services/apm.service");
const apm_dto_1 = require("../dto/apm.dto");
let ApmAdminController = class ApmAdminController {
    apmService;
    constructor(apmService) {
        this.apmService = apmService;
    }
    listVolunteers(query) {
        return this.apmService.listVolunteers(query);
    }
    listSupporters(query) {
        return this.apmService.listSupporters(query);
    }
    listContacts(query) {
        return this.apmService.listContacts(query);
    }
    listEventRegistrations(query) {
        return this.apmService.listEventRegistrations(query);
    }
    listFeedback(query) {
        return this.apmService.listFeedback(query);
    }
    listIssues(query) {
        return this.apmService.listIssues(query);
    }
    listDonations(query) {
        return this.apmService.listDonations(query);
    }
    getStats() {
        return this.apmService.getStats();
    }
};
exports.ApmAdminController = ApmAdminController;
__decorate([
    (0, common_1.Get)('volunteers'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List all volunteers' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmAdminController.prototype, "listVolunteers", null);
__decorate([
    (0, common_1.Get)('supporters'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List all supporters' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmAdminController.prototype, "listSupporters", null);
__decorate([
    (0, common_1.Get)('contacts'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List contact submissions' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmAdminController.prototype, "listContacts", null);
__decorate([
    (0, common_1.Get)('event-registrations'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List event registrations' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmAdminController.prototype, "listEventRegistrations", null);
__decorate([
    (0, common_1.Get)('feedback'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List citizen feedback' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmAdminController.prototype, "listFeedback", null);
__decorate([
    (0, common_1.Get)('issues'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List issue reports' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmAdminController.prototype, "listIssues", null);
__decorate([
    (0, common_1.Get)('donations'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List donations' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmAdminController.prototype, "listDonations", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaign stats dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmAdminController.prototype, "getStats", null);
exports.ApmAdminController = ApmAdminController = __decorate([
    (0, swagger_1.ApiTags)('apm-admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm-admin'),
    __metadata("design:paramtypes", [apm_service_1.ApmService])
], ApmAdminController);
//# sourceMappingURL=apm-admin.controller.js.map