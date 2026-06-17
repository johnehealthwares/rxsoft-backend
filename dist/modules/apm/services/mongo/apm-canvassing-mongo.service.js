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
exports.ApmCanvassingMongoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ApmCanvassingMongoService = class ApmCanvassingMongoService {
    sessionModel;
    visitModel;
    assignmentModel;
    volunteerModel;
    feedbackModel;
    constructor(sessionModel, visitModel, assignmentModel, volunteerModel, feedbackModel) {
        this.sessionModel = sessionModel;
        this.visitModel = visitModel;
        this.assignmentModel = assignmentModel;
        this.volunteerModel = volunteerModel;
        this.feedbackModel = feedbackModel;
    }
    async listSessions(query) {
        const filter = {};
        if (query.search)
            filter.title = { $regex: query.search, $options: 'i' };
        const [items, total] = await Promise.all([
            this.sessionModel.find(filter).sort({ scheduledDate: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.sessionModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async getSession(id) {
        const session = await this.sessionModel.findById(id).exec();
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        const visits = await this.visitModel.find({ sessionId: id }).sort({ contactedAt: -1 }).exec();
        return { ...session.toObject(), visits };
    }
    async createSession(dto) {
        return new this.sessionModel({
            ...dto, scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : undefined,
        }).save();
    }
    async updateSession(id, dto) {
        const session = await this.sessionModel.findById(id).exec();
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        Object.assign(session, {
            ...dto, completedDate: dto.completedDate ? new Date(dto.completedDate) : undefined,
        });
        return session.save();
    }
    async getSessionStats() {
        const [total, planned, inProgress, completed] = await Promise.all([
            this.sessionModel.countDocuments().exec(),
            this.sessionModel.countDocuments({ status: 'planned' }).exec(),
            this.sessionModel.countDocuments({ status: 'in-progress' }).exec(),
            this.sessionModel.countDocuments({ status: 'completed' }).exec(),
        ]);
        const totalVisits = await this.visitModel.countDocuments().exec();
        return { total, planned, inProgress, completed, totalVisits };
    }
    async addVisit(sessionId, dto) {
        const session = await this.sessionModel.findById(sessionId).exec();
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        return new this.visitModel({
            sessionId, ...dto, contactedAt: dto.contactedAt ? new Date(dto.contactedAt) : new Date(),
        }).save();
    }
    async listVisits(sessionId) {
        return this.visitModel.find({ sessionId }).sort({ contactedAt: -1 }).exec();
    }
    calcVisitStats(visits) {
        const total = visits.length;
        const strong = visits.filter((v) => v.supportLevel === 'strong').length;
        const leaning = visits.filter((v) => v.supportLevel === 'leaning').length;
        const undecided = visits.filter((v) => v.supportLevel === 'undecided' || !v.supportLevel).length;
        const opposed = visits.filter((v) => v.supportLevel === 'opposed' || v.supportLevel === 'hostile').length;
        return { total, strong, leaning, undecided, opposed, supportRate: total ? Math.round((strong + leaning) / total * 100) : 0 };
    }
    async getVisitStats(sessionId) {
        const visits = await this.visitModel.find({ sessionId }).exec();
        return this.calcVisitStats(visits);
    }
    async getAllVisitStats() {
        const visits = await this.visitModel.find({}).exec();
        return this.calcVisitStats(visits);
    }
    async listAssignments(query) {
        const [items, total] = await Promise.all([
            this.assignmentModel.find({}).sort({ assignedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.assignmentModel.countDocuments({}).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async listAssignmentsByWard(wardId) {
        return this.assignmentModel.find({ wardId, status: 'active' }).sort({ assignedAt: -1 }).exec();
    }
    async createAssignment(dto) {
        return new this.assignmentModel({ ...dto, assignedAt: new Date() }).save();
    }
    async updateAssignment(id, dto) {
        const assignment = await this.assignmentModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        return assignment;
    }
    async getVolunteerStats() {
        const [total, assigned, active] = await Promise.all([
            this.volunteerModel.countDocuments().exec(),
            this.assignmentModel.countDocuments().exec(),
            this.assignmentModel.countDocuments({ status: 'active' }).exec(),
        ]);
        return { totalVolunteers: total, totalAssignments: assigned, activeAssignments: active };
    }
    async getSentimentDashboard() {
        const feedback = await this.feedbackModel.find({}).exec();
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
            total, positive, negative, neutral,
            sentimentScore: total ? Math.round((positive - negative) / total * 100) : 0,
            topicBreakdown, byLga,
        };
    }
};
exports.ApmCanvassingMongoService = ApmCanvassingMongoService;
exports.ApmCanvassingMongoService = ApmCanvassingMongoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CanvassingSession')),
    __param(1, (0, mongoose_1.InjectModel)('CanvassingVisit')),
    __param(2, (0, mongoose_1.InjectModel)('VolunteerAssignment')),
    __param(3, (0, mongoose_1.InjectModel)('Volunteer')),
    __param(4, (0, mongoose_1.InjectModel)('CitizenFeedback')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ApmCanvassingMongoService);
//# sourceMappingURL=apm-canvassing-mongo.service.js.map