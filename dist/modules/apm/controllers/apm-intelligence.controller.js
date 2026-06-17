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
exports.ApmTruthDeskController = exports.ApmListeningController = exports.ApmContentController = exports.ApmTourController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const apm_intelligence_service_1 = require("../services/apm-intelligence.service");
const apm_dto_1 = require("../dto/apm.dto");
const intelligence_dto_1 = require("../dto/intelligence.dto");
let ApmTourController = class ApmTourController {
    intelligenceService;
    constructor(intelligenceService) {
        this.intelligenceService = intelligenceService;
    }
    listTours(query) {
        return this.intelligenceService.listTours(query);
    }
    getStats() {
        return this.intelligenceService.getTourStats();
    }
    getTour(id) {
        return this.intelligenceService.getTour(id);
    }
    createTour(dto) {
        return this.intelligenceService.createTour(dto);
    }
    updateTour(id, dto) {
        return this.intelligenceService.updateTour(id, dto);
    }
};
exports.ApmTourController = ApmTourController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List candidate tours' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmTourController.prototype, "listTours", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Tour stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmTourController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tour detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmTourController.prototype, "getTour", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create candidate tour' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [intelligence_dto_1.CreateCandidateTourDto]),
    __metadata("design:returntype", void 0)
], ApmTourController.prototype, "createTour", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update candidate tour' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, intelligence_dto_1.UpdateCandidateTourDto]),
    __metadata("design:returntype", void 0)
], ApmTourController.prototype, "updateTour", null);
exports.ApmTourController = ApmTourController = __decorate([
    (0, swagger_1.ApiTags)('apm-tours'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/tours'),
    __metadata("design:paramtypes", [apm_intelligence_service_1.ApmIntelligenceService])
], ApmTourController);
let ApmContentController = class ApmContentController {
    intelligenceService;
    constructor(intelligenceService) {
        this.intelligenceService = intelligenceService;
    }
    listContent(query) {
        return this.intelligenceService.listContent(query);
    }
    createContent(dto) {
        return this.intelligenceService.createContent(dto);
    }
};
exports.ApmContentController = ApmContentController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List content assets' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmContentController.prototype, "listContent", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create content asset' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [intelligence_dto_1.CreateContentAssetDto]),
    __metadata("design:returntype", void 0)
], ApmContentController.prototype, "createContent", null);
exports.ApmContentController = ApmContentController = __decorate([
    (0, swagger_1.ApiTags)('apm-content'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/content'),
    __metadata("design:paramtypes", [apm_intelligence_service_1.ApmIntelligenceService])
], ApmContentController);
let ApmListeningController = class ApmListeningController {
    intelligenceService;
    constructor(intelligenceService) {
        this.intelligenceService = intelligenceService;
    }
    listMentions(query) {
        return this.intelligenceService.listMentions(query);
    }
    getStats() {
        return this.intelligenceService.getListeningStats();
    }
    getMention(id) {
        return this.intelligenceService.getMention(id);
    }
    createMention(dto) {
        return this.intelligenceService.createMention(dto);
    }
    updateMentionStatus(id, status) {
        return this.intelligenceService.updateMentionStatus(id, status);
    }
};
exports.ApmListeningController = ApmListeningController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List mentions' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmListeningController.prototype, "listMentions", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Listening stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmListeningController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get mention detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmListeningController.prototype, "getMention", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create mention' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [intelligence_dto_1.CreateListeningMentionDto]),
    __metadata("design:returntype", void 0)
], ApmListeningController.prototype, "createMention", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update mention status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ApmListeningController.prototype, "updateMentionStatus", null);
exports.ApmListeningController = ApmListeningController = __decorate([
    (0, swagger_1.ApiTags)('apm-listening'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/listening'),
    __metadata("design:paramtypes", [apm_intelligence_service_1.ApmIntelligenceService])
], ApmListeningController);
let ApmTruthDeskController = class ApmTruthDeskController {
    intelligenceService;
    constructor(intelligenceService) {
        this.intelligenceService = intelligenceService;
    }
    listResponses(mentionId) {
        return this.intelligenceService.listResponses(mentionId);
    }
    createResponse(dto) {
        return this.intelligenceService.createResponse(dto);
    }
};
exports.ApmTruthDeskController = ApmTruthDeskController;
__decorate([
    (0, common_1.Get)(':mentionId/responses'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List responses for a mention' }),
    __param(0, (0, common_1.Param)('mentionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmTruthDeskController.prototype, "listResponses", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create rapid response' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [intelligence_dto_1.CreateRapidResponseDto]),
    __metadata("design:returntype", void 0)
], ApmTruthDeskController.prototype, "createResponse", null);
exports.ApmTruthDeskController = ApmTruthDeskController = __decorate([
    (0, swagger_1.ApiTags)('apm-truth-desk'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/truth-desk'),
    __metadata("design:paramtypes", [apm_intelligence_service_1.ApmIntelligenceService])
], ApmTruthDeskController);
//# sourceMappingURL=apm-intelligence.controller.js.map