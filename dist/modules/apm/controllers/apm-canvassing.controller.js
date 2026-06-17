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
exports.ApmSentimentController = exports.ApmVolunteerAssignmentController = exports.ApmCanvassingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const apm_canvassing_service_1 = require("../services/apm-canvassing.service");
const apm_dto_1 = require("../dto/apm.dto");
const canvassing_dto_1 = require("../dto/canvassing.dto");
let ApmCanvassingController = class ApmCanvassingController {
    canvassingService;
    constructor(canvassingService) {
        this.canvassingService = canvassingService;
    }
    getStats() {
        return this.canvassingService.getSessionStats();
    }
    listSessions(query) {
        return this.canvassingService.listSessions(query);
    }
    getSession(id) {
        return this.canvassingService.getSession(id);
    }
    createSession(dto) {
        return this.canvassingService.createSession(dto);
    }
    updateSession(id, dto) {
        return this.canvassingService.updateSession(id, dto);
    }
    listVisits(id) {
        return this.canvassingService.listVisits(id);
    }
    getVisitStats(id) {
        return this.canvassingService.getVisitStats(id);
    }
    addVisit(id, dto) {
        return this.canvassingService.addVisit(id, dto);
    }
    getAllVisitStats() {
        return this.canvassingService.getAllVisitStats();
    }
};
exports.ApmCanvassingController = ApmCanvassingController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get canvassing stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmCanvassingController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('sessions'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List canvassing sessions' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmCanvassingController.prototype, "listSessions", null);
__decorate([
    (0, common_1.Get)('sessions/:id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get session detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmCanvassingController.prototype, "getSession", null);
__decorate([
    (0, common_1.Post)('sessions'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create canvassing session' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [canvassing_dto_1.CreateCanvassingSessionDto]),
    __metadata("design:returntype", void 0)
], ApmCanvassingController.prototype, "createSession", null);
__decorate([
    (0, common_1.Put)('sessions/:id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update canvassing session' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, canvassing_dto_1.UpdateCanvassingSessionDto]),
    __metadata("design:returntype", void 0)
], ApmCanvassingController.prototype, "updateSession", null);
__decorate([
    (0, common_1.Get)('sessions/:id/visits'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List visits in a session' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmCanvassingController.prototype, "listVisits", null);
__decorate([
    (0, common_1.Get)('sessions/:id/visit-stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get visit stats for a session' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmCanvassingController.prototype, "getVisitStats", null);
__decorate([
    (0, common_1.Post)('sessions/:id/visits'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a visit to a session' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, canvassing_dto_1.CreateCanvassingVisitDto]),
    __metadata("design:returntype", void 0)
], ApmCanvassingController.prototype, "addVisit", null);
__decorate([
    (0, common_1.Get)('visits/stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get overall visit stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmCanvassingController.prototype, "getAllVisitStats", null);
exports.ApmCanvassingController = ApmCanvassingController = __decorate([
    (0, swagger_1.ApiTags)('apm-canvassing'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/canvassing'),
    __metadata("design:paramtypes", [apm_canvassing_service_1.ApmCanvassingService])
], ApmCanvassingController);
let ApmVolunteerAssignmentController = class ApmVolunteerAssignmentController {
    canvassingService;
    constructor(canvassingService) {
        this.canvassingService = canvassingService;
    }
    listAssignments(query) {
        return this.canvassingService.listAssignments(query);
    }
    listByWard(wardId) {
        return this.canvassingService.listAssignmentsByWard(wardId);
    }
    createAssignment(dto) {
        return this.canvassingService.createAssignment(dto);
    }
    updateAssignment(id, dto) {
        return this.canvassingService.updateAssignment(id, dto);
    }
    getStats() {
        return this.canvassingService.getVolunteerStats();
    }
};
exports.ApmVolunteerAssignmentController = ApmVolunteerAssignmentController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List volunteer assignments' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmVolunteerAssignmentController.prototype, "listAssignments", null);
__decorate([
    (0, common_1.Get)('ward/:wardId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List assignments by ward' }),
    __param(0, (0, common_1.Param)('wardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmVolunteerAssignmentController.prototype, "listByWard", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create volunteer assignment' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [canvassing_dto_1.CreateVolunteerAssignmentDto]),
    __metadata("design:returntype", void 0)
], ApmVolunteerAssignmentController.prototype, "createAssignment", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update volunteer assignment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, canvassing_dto_1.UpdateVolunteerAssignmentDto]),
    __metadata("design:returntype", void 0)
], ApmVolunteerAssignmentController.prototype, "updateAssignment", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get volunteer stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmVolunteerAssignmentController.prototype, "getStats", null);
exports.ApmVolunteerAssignmentController = ApmVolunteerAssignmentController = __decorate([
    (0, swagger_1.ApiTags)('apm-volunteer-assignments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/volunteer-assignments'),
    __metadata("design:paramtypes", [apm_canvassing_service_1.ApmCanvassingService])
], ApmVolunteerAssignmentController);
let ApmSentimentController = class ApmSentimentController {
    canvassingService;
    constructor(canvassingService) {
        this.canvassingService = canvassingService;
    }
    getSentiment() {
        return this.canvassingService.getSentimentDashboard();
    }
};
exports.ApmSentimentController = ApmSentimentController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get sentiment analysis dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmSentimentController.prototype, "getSentiment", null);
exports.ApmSentimentController = ApmSentimentController = __decorate([
    (0, swagger_1.ApiTags)('apm-sentiment'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/sentiment'),
    __metadata("design:paramtypes", [apm_canvassing_service_1.ApmCanvassingService])
], ApmSentimentController);
//# sourceMappingURL=apm-canvassing.controller.js.map