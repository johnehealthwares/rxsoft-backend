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
exports.ApmConversionMongoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ApmConversionMongoService = class ApmConversionMongoService {
    lgaModel;
    wardModel;
    puModel;
    stakeholderModel;
    scoreModel;
    activityModel;
    waGroupModel;
    constructor(lgaModel, wardModel, puModel, stakeholderModel, scoreModel, activityModel, waGroupModel) {
        this.lgaModel = lgaModel;
        this.wardModel = wardModel;
        this.puModel = puModel;
        this.stakeholderModel = stakeholderModel;
        this.scoreModel = scoreModel;
        this.activityModel = activityModel;
        this.waGroupModel = waGroupModel;
    }
    async listLgas() {
        return this.lgaModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
    }
    async getLga(id) {
        const lga = await this.lgaModel.findById(id).exec();
        if (!lga)
            throw new common_1.NotFoundException('LGA not found');
        return lga;
    }
    async listWards(lgaId) {
        return this.wardModel.find({ lgaId, isActive: true }).sort({ displayOrder: 1 }).exec();
    }
    async getWard(id) {
        const ward = await this.wardModel.findById(id).exec();
        if (!ward)
            throw new common_1.NotFoundException('Ward not found');
        return ward;
    }
    async listPollingUnits(wardId) {
        return this.puModel.find({ wardId, isActive: true }).sort({ name: 1 }).exec();
    }
    async getPollingUnit(id) {
        const pu = await this.puModel.findById(id).exec();
        if (!pu)
            throw new common_1.NotFoundException('Polling unit not found');
        return pu;
    }
    async updatePollingUnit(id, dto) {
        const pu = await this.puModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
        if (!pu)
            throw new common_1.NotFoundException('Polling unit not found');
        return pu;
    }
    async searchPollingUnits(query) {
        return this.puModel.find({
            $or: [
                { code: { $regex: query, $options: 'i' } },
                { name: { $regex: query, $options: 'i' } },
            ],
        }).limit(20).exec();
    }
    async getDashboard() {
        const [lgas, wards, pus, stakeholders, scores] = await Promise.all([
            this.lgaModel.find({ isActive: true }).exec(),
            this.wardModel.find({ isActive: true }).exec(),
            this.puModel.find({ isActive: true }).exec(),
            this.stakeholderModel.find({}).exec(),
            this.scoreModel.find({}).exec(),
        ]);
        const lgaScores = scores.filter((s) => s.entityType === 'lga');
        const wardScores = scores.filter((s) => s.entityType === 'ward');
        const activePus = pus.length;
        const apmFriendlyPus = pus.filter((p) => p.conversionStatus === 'won').length;
        const contestedPus = pus.filter((p) => p.riskLevel === 'red' || p.riskLevel === 'yellow').length;
        const untouchedPus = pus.filter((p) => p.conversionStatus === 'untouched').length;
        const greenLgas = lgaScores.filter((s) => s.status === 'green').length;
        const redLgas = lgaScores.filter((s) => s.status === 'red').length;
        const greenWards = wardScores.filter((s) => s.status === 'green').length;
        const redWards = wardScores.filter((s) => s.status === 'red').length;
        return {
            summary: {
                totalLgas: lgas.length, totalWards: wards.length,
                totalPollingUnits: activePus, totalStakeholders: stakeholders.length,
            },
            conversion: {
                apmFriendlyPollingUnits: apmFriendlyPus, contestedPollingUnits: contestedPus,
                untouchedPollingUnits: untouchedPus, greenLgas, redLgas, greenWards, redWards,
            },
            lgas, scores,
        };
    }
    async getLgaConversionDashboard() {
        const [lgas, scores, wards, pus] = await Promise.all([
            this.lgaModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
            this.scoreModel.find({ entityType: 'lga' }).exec(),
            this.wardModel.find({ isActive: true }).exec(),
            this.puModel.find({ isActive: true }).exec(),
        ]);
        return lgas.map((lga) => {
            const score = scores.find((s) => s.entityId === lga._id.toString());
            const lgaWards = wards.filter((w) => w.lgaId === lga._id.toString());
            const lgaPus = pus.filter((p) => p.lgaId === lga._id.toString());
            const wonPus = lgaPus.filter((p) => p.conversionStatus === 'won').length;
            return {
                id: lga._id.toString(), name: lga.name, code: lga.code,
                score: score?.score ?? 0, status: score?.status ?? 'grey',
                wardCount: lgaWards.length, pollingUnitCount: lgaPus.length,
                wonPollingUnits: wonPus, lastAssessed: score?.lastAssessedAt ?? null,
            };
        });
    }
    async getWardConversionDashboard(lgaId) {
        const [wards, scores, pus] = await Promise.all([
            this.wardModel.find({ lgaId, isActive: true }).sort({ displayOrder: 1 }).exec(),
            this.scoreModel.find({ entityType: 'ward' }).exec(),
            this.puModel.find({ isActive: true }).exec(),
        ]);
        return wards.map((ward) => {
            const score = scores.find((s) => s.entityId === ward._id.toString());
            const wardPus = pus.filter((p) => p.wardId === ward._id.toString());
            const wonPus = wardPus.filter((p) => p.conversionStatus === 'won').length;
            return {
                id: ward._id.toString(), name: ward.name, code: ward.code,
                score: score?.score ?? 0, status: score?.status ?? 'grey',
                pollingUnitCount: wardPus.length, wonPollingUnits: wonPus,
                lastAssessed: score?.lastAssessedAt ?? null,
            };
        });
    }
    async getPollingUnitDashboard(wardId) {
        return this.puModel.find({ wardId, isActive: true }).sort({ name: 1 }).exec();
    }
    async updateScore(entityType, entityId, dto) {
        let score = await this.scoreModel.findOne({ entityType, entityId }).exec();
        if (score) {
            Object.assign(score, dto, { lastAssessedAt: new Date() });
            return score.save();
        }
        return new this.scoreModel({ entityType, entityId, ...dto, lastAssessedAt: new Date() }).save();
    }
    async listStakeholders(query) {
        const filter = {};
        if (query.search)
            filter.name = { $regex: query.search, $options: 'i' };
        if (query.category)
            filter.role = query.category;
        const [items, total] = await Promise.all([
            this.stakeholderModel.find(filter).sort({ createdAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.stakeholderModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async listStakeholdersByLga(lgaId, query) {
        const filter = { lgaId };
        if (query.search)
            filter.name = { $regex: query.search, $options: 'i' };
        const [items, total] = await Promise.all([
            this.stakeholderModel.find(filter).sort({ createdAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.stakeholderModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async getStakeholder(id) {
        const stakeholder = await this.stakeholderModel.findById(id).exec();
        if (!stakeholder)
            throw new common_1.NotFoundException('Stakeholder not found');
        const activities = await this.activityModel.find({ stakeholderId: id }).sort({ conductedAt: -1 }).exec();
        return { ...stakeholder.toObject(), activities };
    }
    async createStakeholder(dto) {
        return new this.stakeholderModel(dto).save();
    }
    async updateStakeholder(id, dto) {
        const stakeholder = await this.stakeholderModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
        if (!stakeholder)
            throw new common_1.NotFoundException('Stakeholder not found');
        return stakeholder;
    }
    async createActivity(stakeholderId, dto) {
        const stakeholder = await this.stakeholderModel.findById(stakeholderId).exec();
        if (!stakeholder)
            throw new common_1.NotFoundException('Stakeholder not found');
        return new this.activityModel({
            stakeholderId, ...dto,
            conductedAt: dto.conductedAt ? new Date(dto.conductedAt) : new Date(),
            followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : null,
        }).save();
    }
    async listActivities(stakeholderId) {
        return this.activityModel.find({ stakeholderId }).sort({ conductedAt: -1 }).exec();
    }
    async listWhatsAppGroups(level) {
        const filter = { isActive: true };
        if (level)
            filter.level = level;
        return this.waGroupModel.find(filter).sort({ level: 1, name: 1 }).exec();
    }
    async createWhatsAppGroup(dto) {
        return new this.waGroupModel(dto).save();
    }
};
exports.ApmConversionMongoService = ApmConversionMongoService;
exports.ApmConversionMongoService = ApmConversionMongoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Lga')),
    __param(1, (0, mongoose_1.InjectModel)('Ward')),
    __param(2, (0, mongoose_1.InjectModel)('PollingUnit')),
    __param(3, (0, mongoose_1.InjectModel)('Stakeholder')),
    __param(4, (0, mongoose_1.InjectModel)('ConversionScore')),
    __param(5, (0, mongoose_1.InjectModel)('ConversionActivity')),
    __param(6, (0, mongoose_1.InjectModel)('WhatsAppGroup')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ApmConversionMongoService);
//# sourceMappingURL=apm-conversion-mongo.service.js.map