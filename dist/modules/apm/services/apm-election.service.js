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
exports.ApmElectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let ApmElectionService = class ApmElectionService {
    agentRepo;
    resultRepo;
    incidentRepo;
    gotvRepo;
    constructor(agentRepo, resultRepo, incidentRepo, gotvRepo) {
        this.agentRepo = agentRepo;
        this.resultRepo = resultRepo;
        this.incidentRepo = incidentRepo;
        this.gotvRepo = gotvRepo;
    }
    async listAgents(query) {
        const where = {};
        if (query.search)
            where.name = (0, typeorm_2.ILike)(`%${query.search}%`);
        if (query.category)
            where.role = query.category;
        if (query.trainingStatus)
            where.trainingStatus = query.trainingStatus;
        if (query.status) {
            where.isActive = query.status === 'active';
        }
        const [items, total] = await this.agentRepo.findAndCount({
            where: Object.keys(where).length ? where : {},
            order: { assignedAt: 'DESC' },
            skip: (query.page - 1) * query.limit, take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async getAgent(id) {
        const agent = await this.agentRepo.findOne({ where: { id } });
        if (!agent)
            throw new common_1.NotFoundException('Agent not found');
        return agent;
    }
    async createAgent(dto) {
        return this.agentRepo.save({ ...dto, assignedAt: new Date() });
    }
    async updateAgent(id, dto) {
        const agent = await this.agentRepo.findOne({ where: { id } });
        if (!agent)
            throw new common_1.NotFoundException('Agent not found');
        Object.assign(agent, dto);
        return this.agentRepo.save(agent);
    }
    async getAgentStats() {
        const [total, trained, assigned, agent, backup, supervisor] = await Promise.all([
            this.agentRepo.count(),
            this.agentRepo.count({ where: { trainingStatus: 'trained' } }),
            this.agentRepo.count({ where: { isActive: true } }),
            this.agentRepo.count({ where: { role: 'agent' } }),
            this.agentRepo.count({ where: { role: 'backup-agent' } }),
            this.agentRepo.count({ where: { role: 'ward-supervisor' } }),
        ]);
        return { total, trained, assigned, agent, backup, supervisor };
    }
    async listResults(query) {
        const where = {};
        if (query.search)
            where.pollingUnitId = (0, typeorm_2.ILike)(`%${query.search}%`);
        if (query.status)
            where.status = query.status;
        if (query.lgaId)
            where.lgaId = query.lgaId;
        const [items, total] = await this.resultRepo.findAndCount({
            where: Object.keys(where).length ? where : {},
            order: { createdAt: 'DESC' },
            skip: (query.page - 1) * query.limit, take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async listResultsByLga(lgaId) {
        return this.resultRepo.find({ where: { lgaId }, order: { createdAt: 'DESC' } });
    }
    async getResult(id) {
        const result = await this.resultRepo.findOne({ where: { id } });
        if (!result)
            throw new common_1.NotFoundException('Result not found');
        return result;
    }
    async createResult(dto) {
        const totalVotes = dto.apmVotes + dto.pdpVotes + dto.apcVotes + (dto.otherVotes ?? 0);
        return this.resultRepo.save({ ...dto, totalVotes });
    }
    async verifyResult(id) {
        const result = await this.resultRepo.findOne({ where: { id } });
        if (!result)
            throw new common_1.NotFoundException('Result not found');
        result.status = 'verified';
        return this.resultRepo.save(result);
    }
    async getResultDashboard() {
        const results = await this.resultRepo.find();
        const total = results.length;
        const submitted = results.filter((r) => r.status !== 'draft').length;
        const verified = results.filter((r) => r.status === 'verified').length;
        const totalApmVotes = results.reduce((sum, r) => sum + r.apmVotes, 0);
        const totalPdpVotes = results.reduce((sum, r) => sum + r.pdpVotes, 0);
        const totalApcVotes = results.reduce((sum, r) => sum + r.apcVotes, 0);
        return { total, submitted, verified, totalApmVotes, totalPdpVotes, totalApcVotes };
    }
    async listIncidents(query) {
        const where = {};
        if (query.category)
            where.type = query.category;
        if (query.severity)
            where.severity = query.severity;
        if (query.status)
            where.status = query.status;
        const [items, total] = await this.incidentRepo.findAndCount({
            where: Object.keys(where).length ? where : {},
            order: { reportedAt: 'DESC' },
            skip: (query.page - 1) * query.limit, take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async createIncident(dto) {
        return this.incidentRepo.save({ ...dto, reportedAt: new Date() });
    }
    async updateIncident(id, dto) {
        const incident = await this.incidentRepo.findOne({ where: { id } });
        if (!incident)
            throw new common_1.NotFoundException('Incident not found');
        Object.assign(incident, dto);
        return this.incidentRepo.save(incident);
    }
    async getIncidentStats() {
        const [total, open, critical, escalated] = await Promise.all([
            this.incidentRepo.count(),
            this.incidentRepo.count({ where: { status: 'open' } }),
            this.incidentRepo.count({ where: { severity: 'critical' } }),
            this.incidentRepo.count({ where: { legalEscalation: true } }),
        ]);
        return { total, open, critical, escalated };
    }
    async listGotvRecords(query) {
        const where = {};
        if (query.search)
            where.supporterName = (0, typeorm_2.ILike)(`%${query.search}%`);
        if (query.contacted) {
            where.contacted = query.contacted === 'true';
        }
        if (query.turnedOut) {
            where.turnedOut = query.turnedOut === 'true';
        }
        if (query.contactedVia)
            where.contactedVia = query.contactedVia;
        const [items, total] = await this.gotvRepo.findAndCount({
            where: Object.keys(where).length ? where : {},
            order: { contactedAt: 'DESC' },
            skip: (query.page - 1) * query.limit, take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async listGotvByPu(pollingUnitId) {
        return this.gotvRepo.find({ where: { pollingUnitId }, order: { createdAt: 'DESC' } });
    }
    async createGotvRecord(dto) {
        return this.gotvRepo.save({ ...dto, contacted: true, contactedAt: new Date() });
    }
    async updateGotvRecord(id, dto) {
        const record = await this.gotvRepo.findOne({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('GOTV record not found');
        Object.assign(record, dto);
        return this.gotvRepo.save(record);
    }
    async getGotvStats() {
        const [total, contacted, turnedOut] = await Promise.all([
            this.gotvRepo.count(),
            this.gotvRepo.count({ where: { contacted: true } }),
            this.gotvRepo.count({ where: { turnedOut: true } }),
        ]);
        return { total, contacted, turnedOut, turnoutRate: total ? Math.round(turnedOut / total * 100) : 0 };
    }
};
exports.ApmElectionService = ApmElectionService;
exports.ApmElectionService = ApmElectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.PollingAgentOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.ResultEntryOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.IncidentReportOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.GotvRecordOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ApmElectionService);
//# sourceMappingURL=apm-election.service.js.map