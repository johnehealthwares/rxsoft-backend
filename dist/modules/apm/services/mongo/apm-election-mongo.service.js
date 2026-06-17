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
exports.ApmElectionMongoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ApmElectionMongoService = class ApmElectionMongoService {
    agentModel;
    resultModel;
    incidentModel;
    gotvModel;
    constructor(agentModel, resultModel, incidentModel, gotvModel) {
        this.agentModel = agentModel;
        this.resultModel = resultModel;
        this.incidentModel = incidentModel;
        this.gotvModel = gotvModel;
    }
    async listAgents(query) {
        const filter = {};
        if (query.search)
            filter.name = { $regex: query.search, $options: 'i' };
        if (query.category)
            filter.role = query.category;
        if (query.trainingStatus)
            filter.trainingStatus = query.trainingStatus;
        if (query.status)
            filter.isActive = query.status === 'active';
        const [items, total] = await Promise.all([
            this.agentModel.find(filter).sort({ assignedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.agentModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async getAgent(id) {
        const agent = await this.agentModel.findById(id).exec();
        if (!agent)
            throw new common_1.NotFoundException('Agent not found');
        return agent;
    }
    async createAgent(dto) {
        return new this.agentModel({ ...dto, assignedAt: new Date() }).save();
    }
    async updateAgent(id, dto) {
        const agent = await this.agentModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
        if (!agent)
            throw new common_1.NotFoundException('Agent not found');
        return agent;
    }
    async getAgentStats() {
        const [total, trained, assigned, agent, backup, supervisor] = await Promise.all([
            this.agentModel.countDocuments().exec(),
            this.agentModel.countDocuments({ trainingStatus: 'trained' }).exec(),
            this.agentModel.countDocuments({ isActive: true }).exec(),
            this.agentModel.countDocuments({ role: 'agent' }).exec(),
            this.agentModel.countDocuments({ role: 'backup-agent' }).exec(),
            this.agentModel.countDocuments({ role: 'ward-supervisor' }).exec(),
        ]);
        return { total, trained, assigned, agent, backup, supervisor };
    }
    async listResults(query) {
        const filter = {};
        if (query.search)
            filter.pollingUnitId = { $regex: query.search, $options: 'i' };
        if (query.status)
            filter.status = query.status;
        if (query.lgaId)
            filter.lgaId = query.lgaId;
        const [items, total] = await Promise.all([
            this.resultModel.find(filter).sort({ createdAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.resultModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async listResultsByLga(lgaId) {
        return this.resultModel.find({ lgaId }).sort({ createdAt: -1 }).exec();
    }
    async getResult(id) {
        const result = await this.resultModel.findById(id).exec();
        if (!result)
            throw new common_1.NotFoundException('Result not found');
        return result;
    }
    async createResult(dto) {
        const totalVotes = dto.apmVotes + dto.pdpVotes + dto.apcVotes + (dto.otherVotes ?? 0);
        return new this.resultModel({ ...dto, totalVotes }).save();
    }
    async verifyResult(id) {
        const result = await this.resultModel.findByIdAndUpdate(id, { $set: { status: 'verified' } }, { new: true }).exec();
        if (!result)
            throw new common_1.NotFoundException('Result not found');
        return result;
    }
    async getResultDashboard() {
        const results = await this.resultModel.find({}).exec();
        const total = results.length;
        const submitted = results.filter((r) => r.status !== 'draft').length;
        const verified = results.filter((r) => r.status === 'verified').length;
        const totalApmVotes = results.reduce((sum, r) => sum + r.apmVotes, 0);
        const totalPdpVotes = results.reduce((sum, r) => sum + r.pdpVotes, 0);
        const totalApcVotes = results.reduce((sum, r) => sum + r.apcVotes, 0);
        return { total, submitted, verified, totalApmVotes, totalPdpVotes, totalApcVotes };
    }
    async listIncidents(query) {
        const filter = {};
        if (query.category)
            filter.type = query.category;
        if (query.severity)
            filter.severity = query.severity;
        if (query.status)
            filter.status = query.status;
        const [items, total] = await Promise.all([
            this.incidentModel.find(filter).sort({ reportedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.incidentModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async createIncident(dto) {
        return new this.incidentModel({ ...dto, reportedAt: new Date() }).save();
    }
    async updateIncident(id, dto) {
        const incident = await this.incidentModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
        if (!incident)
            throw new common_1.NotFoundException('Incident not found');
        return incident;
    }
    async getIncidentStats() {
        const [total, open, critical, escalated] = await Promise.all([
            this.incidentModel.countDocuments().exec(),
            this.incidentModel.countDocuments({ status: 'open' }).exec(),
            this.incidentModel.countDocuments({ severity: 'critical' }).exec(),
            this.incidentModel.countDocuments({ legalEscalation: true }).exec(),
        ]);
        return { total, open, critical, escalated };
    }
    async listGotvRecords(query) {
        const filter = {};
        if (query.search)
            filter.supporterName = { $regex: query.search, $options: 'i' };
        if (query.contacted)
            filter.contacted = query.contacted === 'true';
        if (query.turnedOut)
            filter.turnedOut = query.turnedOut === 'true';
        if (query.contactedVia)
            filter.contactedVia = query.contactedVia;
        const [items, total] = await Promise.all([
            this.gotvModel.find(filter).sort({ contactedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.gotvModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async listGotvByPu(pollingUnitId) {
        return this.gotvModel.find({ pollingUnitId }).sort({ createdAt: -1 }).exec();
    }
    async createGotvRecord(dto) {
        return new this.gotvModel({ ...dto, contacted: true, contactedAt: new Date() }).save();
    }
    async updateGotvRecord(id, dto) {
        const record = await this.gotvModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
        if (!record)
            throw new common_1.NotFoundException('GOTV record not found');
        return record;
    }
    async getGotvStats() {
        const [total, contacted, turnedOut] = await Promise.all([
            this.gotvModel.countDocuments().exec(),
            this.gotvModel.countDocuments({ contacted: true }).exec(),
            this.gotvModel.countDocuments({ turnedOut: true }).exec(),
        ]);
        return { total, contacted, turnedOut, turnoutRate: total ? Math.round(turnedOut / total * 100) : 0 };
    }
};
exports.ApmElectionMongoService = ApmElectionMongoService;
exports.ApmElectionMongoService = ApmElectionMongoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('PollingAgent')),
    __param(1, (0, mongoose_1.InjectModel)('ResultEntry')),
    __param(2, (0, mongoose_1.InjectModel)('IncidentReport')),
    __param(3, (0, mongoose_1.InjectModel)('GotvRecord')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ApmElectionMongoService);
//# sourceMappingURL=apm-election-mongo.service.js.map