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
exports.ApmCanvassingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let ApmCanvassingService = class ApmCanvassingService {
    sessionRepo;
    visitRepo;
    assignmentRepo;
    volunteerRepo;
    feedbackRepo;
    constructor(sessionRepo, visitRepo, assignmentRepo, volunteerRepo, feedbackRepo) {
        this.sessionRepo = sessionRepo;
        this.visitRepo = visitRepo;
        this.assignmentRepo = assignmentRepo;
        this.volunteerRepo = volunteerRepo;
        this.feedbackRepo = feedbackRepo;
    }
    async listSessions(query) {
        const where = {};
        if (query.search)
            where.title = (0, typeorm_2.ILike)(`%${query.search}%`);
        const [items, total] = await this.sessionRepo.findAndCount({
            where,
            order: { scheduledDate: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async getSession(id) {
        const session = await this.sessionRepo.findOne({
            where: { id },
            relations: ['visits'],
        });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        return session;
    }
    async createSession(dto) {
        return this.sessionRepo.save({
            ...dto,
            scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : undefined,
        });
    }
    async updateSession(id, dto) {
        const session = await this.sessionRepo.findOne({ where: { id } });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        Object.assign(session, {
            ...dto,
            completedDate: dto.completedDate ? new Date(dto.completedDate) : undefined,
        });
        return this.sessionRepo.save(session);
    }
    async getSessionStats() {
        const [total, planned, inProgress, completed] = await Promise.all([
            this.sessionRepo.count(),
            this.sessionRepo.count({ where: { status: 'planned' } }),
            this.sessionRepo.count({ where: { status: 'in-progress' } }),
            this.sessionRepo.count({ where: { status: 'completed' } }),
        ]);
        const visits = await this.visitRepo.count();
        return { total, planned, inProgress, completed, totalVisits: visits };
    }
    async addVisit(sessionId, dto) {
        const session = await this.sessionRepo.findOne({ where: { id: sessionId } });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        return this.visitRepo.save({
            sessionId,
            ...dto,
            contactedAt: dto.contactedAt ? new Date(dto.contactedAt) : new Date(),
        });
    }
    async listVisits(sessionId) {
        return this.visitRepo.find({
            where: { sessionId },
            order: { contactedAt: 'DESC' },
        });
    }
    async getVisitStats(sessionId) {
        const visits = await this.visitRepo.find({ where: { sessionId } });
        const total = visits.length;
        const strong = visits.filter((v) => v.supportLevel === 'strong').length;
        const leaning = visits.filter((v) => v.supportLevel === 'leaning').length;
        const undecided = visits.filter((v) => v.supportLevel === 'undecided' || !v.supportLevel).length;
        const opposed = visits.filter((v) => v.supportLevel === 'opposed' || v.supportLevel === 'hostile').length;
        return { total, strong, leaning, undecided, opposed, supportRate: total ? Math.round((strong + leaning) / total * 100) : 0 };
    }
    async getAllVisitStats() {
        const visits = await this.visitRepo.find();
        const total = visits.length;
        const strong = visits.filter((v) => v.supportLevel === 'strong').length;
        const leaning = visits.filter((v) => v.supportLevel === 'leaning').length;
        const undecided = visits.filter((v) => v.supportLevel === 'undecided' || !v.supportLevel).length;
        const opposed = visits.filter((v) => v.supportLevel === 'opposed' || v.supportLevel === 'hostile').length;
        return { total, strong, leaning, undecided, opposed, supportRate: total ? Math.round((strong + leaning) / total * 100) : 0 };
    }
    async listAssignments(query) {
        const [items, total] = await this.assignmentRepo.findAndCount({
            order: { assignedAt: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async listAssignmentsByWard(wardId) {
        return this.assignmentRepo.find({
            where: { wardId, status: 'active' },
            order: { assignedAt: 'DESC' },
        });
    }
    async createAssignment(dto) {
        return this.assignmentRepo.save({
            ...dto,
            assignedAt: new Date(),
        });
    }
    async updateAssignment(id, dto) {
        const assignment = await this.assignmentRepo.findOne({ where: { id } });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        Object.assign(assignment, dto);
        return this.assignmentRepo.save(assignment);
    }
    async getVolunteerStats() {
        const [total, assigned, active] = await Promise.all([
            this.volunteerRepo.count(),
            this.assignmentRepo.count(),
            this.assignmentRepo.count({ where: { status: 'active' } }),
        ]);
        return { totalVolunteers: total, totalAssignments: assigned, activeAssignments: active };
    }
    async getSentimentDashboard() {
        const feedback = await this.feedbackRepo.find();
        const total = feedback.length;
        const positive = feedback.filter((f) => f.sentiment === 'positive').length;
        const negative = feedback.filter((f) => f.sentiment === 'negative').length;
        const neutral = feedback.filter((f) => f.sentiment === 'neutral' || !f.sentiment).length;
        const topics = new Map();
        for (const f of feedback) {
            if (f.topic)
                topics.set(f.topic, (topics.get(f.topic) || 0) + 1);
        }
        const topicBreakdown = Array.from(topics.entries()).map(([topic, count]) => ({ topic, count }));
        const lgaSentiment = new Map();
        for (const f of feedback) {
            if (!f.lga)
                continue;
            const existing = lgaSentiment.get(f.lga) || { positive: 0, negative: 0, neutral: 0, total: 0 };
            existing.total++;
            if (f.sentiment === 'positive')
                existing.positive++;
            else if (f.sentiment === 'negative')
                existing.negative++;
            else
                existing.neutral++;
            lgaSentiment.set(f.lga, existing);
        }
        const byLga = Array.from(lgaSentiment.entries()).map(([lga, data]) => ({ lga, ...data }));
        return {
            total,
            positive,
            negative,
            neutral,
            sentimentScore: total ? Math.round((positive - negative) / total * 100) : 0,
            topicBreakdown,
            byLga,
        };
    }
};
exports.ApmCanvassingService = ApmCanvassingService;
exports.ApmCanvassingService = ApmCanvassingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CanvassingSessionOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.CanvassingVisitOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.VolunteerAssignmentOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.VolunteerOrmEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.CitizenFeedbackOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ApmCanvassingService);
//# sourceMappingURL=apm-canvassing.service.js.map