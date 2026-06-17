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
exports.ApmGotvController = exports.ApmIncidentController = exports.ApmResultController = exports.ApmAgentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const apm_election_service_1 = require("../services/apm-election.service");
const apm_dto_1 = require("../dto/apm.dto");
const election_dto_1 = require("../dto/election.dto");
let ApmAgentController = class ApmAgentController {
    electionService;
    constructor(electionService) {
        this.electionService = electionService;
    }
    listAgents(query) { return this.electionService.listAgents(query); }
    getStats() { return this.electionService.getAgentStats(); }
    getAgent(id) { return this.electionService.getAgent(id); }
    createAgent(dto) { return this.electionService.createAgent(dto); }
    updateAgent(id, dto) { return this.electionService.updateAgent(id, dto); }
};
exports.ApmAgentController = ApmAgentController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List polling agents' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmAgentController.prototype, "listAgents", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Agent stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmAgentController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get agent detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmAgentController.prototype, "getAgent", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create polling agent' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [election_dto_1.CreatePollingAgentDto]),
    __metadata("design:returntype", void 0)
], ApmAgentController.prototype, "createAgent", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update polling agent' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, election_dto_1.UpdatePollingAgentDto]),
    __metadata("design:returntype", void 0)
], ApmAgentController.prototype, "updateAgent", null);
exports.ApmAgentController = ApmAgentController = __decorate([
    (0, swagger_1.ApiTags)('apm-agents'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/agents'),
    __metadata("design:paramtypes", [apm_election_service_1.ApmElectionService])
], ApmAgentController);
let ApmResultController = class ApmResultController {
    electionService;
    constructor(electionService) {
        this.electionService = electionService;
    }
    listResults(query) { return this.electionService.listResults(query); }
    getDashboard() { return this.electionService.getResultDashboard(); }
    listByLga(lgaId) { return this.electionService.listResultsByLga(lgaId); }
    getResult(id) { return this.electionService.getResult(id); }
    createResult(dto) { return this.electionService.createResult(dto); }
    verifyResult(id) { return this.electionService.verifyResult(id); }
};
exports.ApmResultController = ApmResultController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List result entries' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmResultController.prototype, "listResults", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Result collation dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmResultController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('lga/:lgaId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Results by LGA' }),
    __param(0, (0, common_1.Param)('lgaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmResultController.prototype, "listByLga", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get result detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmResultController.prototype, "getResult", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit result entry' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [election_dto_1.CreateResultEntryDto]),
    __metadata("design:returntype", void 0)
], ApmResultController.prototype, "createResult", null);
__decorate([
    (0, common_1.Put)(':id/verify'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify result entry' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmResultController.prototype, "verifyResult", null);
exports.ApmResultController = ApmResultController = __decorate([
    (0, swagger_1.ApiTags)('apm-results'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/results'),
    __metadata("design:paramtypes", [apm_election_service_1.ApmElectionService])
], ApmResultController);
let ApmIncidentController = class ApmIncidentController {
    electionService;
    constructor(electionService) {
        this.electionService = electionService;
    }
    listIncidents(query) { return this.electionService.listIncidents(query); }
    getStats() { return this.electionService.getIncidentStats(); }
    createIncident(dto) { return this.electionService.createIncident(dto); }
    updateIncident(id, dto) { return this.electionService.updateIncident(id, dto); }
};
exports.ApmIncidentController = ApmIncidentController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List incident reports' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmIncidentController.prototype, "listIncidents", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Incident stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmIncidentController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Report an incident' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [election_dto_1.CreateIncidentReportDto]),
    __metadata("design:returntype", void 0)
], ApmIncidentController.prototype, "createIncident", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update incident' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, election_dto_1.UpdateIncidentReportDto]),
    __metadata("design:returntype", void 0)
], ApmIncidentController.prototype, "updateIncident", null);
exports.ApmIncidentController = ApmIncidentController = __decorate([
    (0, swagger_1.ApiTags)('apm-incidents'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/incidents'),
    __metadata("design:paramtypes", [apm_election_service_1.ApmElectionService])
], ApmIncidentController);
let ApmGotvController = class ApmGotvController {
    electionService;
    constructor(electionService) {
        this.electionService = electionService;
    }
    listGotv(query) { return this.electionService.listGotvRecords(query); }
    getStats() { return this.electionService.getGotvStats(); }
    listByPu(pollingUnitId) { return this.electionService.listGotvByPu(pollingUnitId); }
    createGotv(dto) { return this.electionService.createGotvRecord(dto); }
    updateGotv(id, dto) { return this.electionService.updateGotvRecord(id, dto); }
};
exports.ApmGotvController = ApmGotvController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'List GOTV records' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmGotvController.prototype, "listGotv", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'GOTV stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmGotvController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('pu/:pollingUnitId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'GOTV records by PU' }),
    __param(0, (0, common_1.Param)('pollingUnitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmGotvController.prototype, "listByPu", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create GOTV record' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [election_dto_1.CreateGotvRecordDto]),
    __metadata("design:returntype", void 0)
], ApmGotvController.prototype, "createGotv", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update GOTV record' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, election_dto_1.UpdateGotvRecordDto]),
    __metadata("design:returntype", void 0)
], ApmGotvController.prototype, "updateGotv", null);
exports.ApmGotvController = ApmGotvController = __decorate([
    (0, swagger_1.ApiTags)('apm-gotv'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('apm/gotv'),
    __metadata("design:paramtypes", [apm_election_service_1.ApmElectionService])
], ApmGotvController);
//# sourceMappingURL=apm-election.controller.js.map