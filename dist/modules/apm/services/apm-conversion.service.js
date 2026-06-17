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
exports.ApmConversionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let ApmConversionService = class ApmConversionService {
    lgaRepo;
    wardRepo;
    puRepo;
    stakeholderRepo;
    scoreRepo;
    activityRepo;
    waGroupRepo;
    constructor(lgaRepo, wardRepo, puRepo, stakeholderRepo, scoreRepo, activityRepo, waGroupRepo) {
        this.lgaRepo = lgaRepo;
        this.wardRepo = wardRepo;
        this.puRepo = puRepo;
        this.stakeholderRepo = stakeholderRepo;
        this.scoreRepo = scoreRepo;
        this.activityRepo = activityRepo;
        this.waGroupRepo = waGroupRepo;
    }
    async listLgas() {
        return this.lgaRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
    }
    async getLga(id) {
        const lga = await this.lgaRepo.findOne({ where: { id, isActive: true } });
        if (!lga)
            throw new common_1.NotFoundException('LGA not found');
        return lga;
    }
    async listWards(lgaId) {
        return this.wardRepo.find({
            where: { lgaId, isActive: true },
            order: { displayOrder: 'ASC' },
        });
    }
    async getWard(id) {
        const ward = await this.wardRepo.findOne({ where: { id, isActive: true } });
        if (!ward)
            throw new common_1.NotFoundException('Ward not found');
        return ward;
    }
    async listPollingUnits(wardId) {
        return this.puRepo.find({
            where: { wardId, isActive: true },
            order: { name: 'ASC' },
        });
    }
    async getPollingUnit(id) {
        const pu = await this.puRepo.findOne({ where: { id, isActive: true } });
        if (!pu)
            throw new common_1.NotFoundException('Polling unit not found');
        return pu;
    }
    async updatePollingUnit(id, dto) {
        const pu = await this.puRepo.findOne({ where: { id } });
        if (!pu)
            throw new common_1.NotFoundException('Polling unit not found');
        Object.assign(pu, dto);
        return this.puRepo.save(pu);
    }
    async searchPollingUnits(query) {
        return this.puRepo.find({
            where: [
                { code: (0, typeorm_2.ILike)(`%${query}%`) },
                { name: (0, typeorm_2.ILike)(`%${query}%`) },
            ],
            take: 20,
        });
    }
    async getDashboard() {
        const [lgas, wards, pus, stakeholders] = await Promise.all([
            this.lgaRepo.find({ where: { isActive: true } }),
            this.wardRepo.find({ where: { isActive: true } }),
            this.puRepo.find({ where: { isActive: true } }),
            this.stakeholderRepo.find(),
        ]);
        const scores = await this.scoreRepo.find();
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
        const totalGreenWards = wardScores.filter((s) => s.status === 'green').length;
        const totalRedWards = wardScores.filter((s) => s.status === 'red').length;
        return {
            summary: {
                totalLgas: lgas.length,
                totalWards: wards.length,
                totalPollingUnits: activePus,
                totalStakeholders: stakeholders.length,
            },
            conversion: {
                apmFriendlyPollingUnits: apmFriendlyPus,
                contestedPollingUnits: contestedPus,
                untouchedPollingUnits: untouchedPus,
                greenLgas,
                redLgas,
                greenWards,
                redWards,
            },
            lgas,
            scores,
        };
    }
    async getLgaConversionDashboard() {
        const lgas = await this.lgaRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
        const scores = await this.scoreRepo.find({ where: { entityType: 'lga' } });
        const wards = await this.wardRepo.find({ where: { isActive: true } });
        const pus = await this.puRepo.find({ where: { isActive: true } });
        return lgas.map((lga) => {
            const score = scores.find((s) => s.entityId === lga.id);
            const lgaWards = wards.filter((w) => w.lgaId === lga.id);
            const lgaPus = pus.filter((p) => p.lgaId === lga.id);
            const wonPus = lgaPus.filter((p) => p.conversionStatus === 'won').length;
            const constituency = lga.name.includes('Central') || lga.name.includes('West') || lga.name.includes('East') || lga.name.includes('North') || lga.name.includes('South')
                ? null
                : lga.name;
            return {
                id: lga.id,
                name: lga.name,
                code: lga.code,
                score: score?.score ?? 0,
                status: score?.status ?? 'grey',
                wardCount: lgaWards.length,
                pollingUnitCount: lgaPus.length,
                wonPollingUnits: wonPus,
                lastAssessed: score?.lastAssessedAt ?? null,
            };
        });
    }
    async getWardConversionDashboard(lgaId) {
        const wards = await this.wardRepo.find({ where: { lgaId, isActive: true }, order: { displayOrder: 'ASC' } });
        const scores = await this.scoreRepo.find({ where: { entityType: 'ward' } });
        const pus = await this.puRepo.find({ where: { isActive: true } });
        return wards.map((ward) => {
            const score = scores.find((s) => s.entityId === ward.id);
            const wardPus = pus.filter((p) => p.wardId === ward.id);
            const wonPus = wardPus.filter((p) => p.conversionStatus === 'won').length;
            return {
                id: ward.id,
                name: ward.name,
                code: ward.code,
                score: score?.score ?? 0,
                status: score?.status ?? 'grey',
                pollingUnitCount: wardPus.length,
                wonPollingUnits: wonPus,
                lastAssessed: score?.lastAssessedAt ?? null,
            };
        });
    }
    async getPollingUnitDashboard(wardId) {
        return this.puRepo.find({
            where: { wardId, isActive: true },
            order: { name: 'ASC' },
        });
    }
    async updateScore(entityType, entityId, dto) {
        let score = await this.scoreRepo.findOne({ where: { entityType, entityId } });
        if (score) {
            Object.assign(score, dto, { lastAssessedAt: new Date() });
        }
        else {
            score = this.scoreRepo.create({
                entityType,
                entityId,
                ...dto,
                lastAssessedAt: new Date(),
            });
        }
        return this.scoreRepo.save(score);
    }
    async listStakeholders(query) {
        const where = {};
        if (query.search)
            where.name = (0, typeorm_2.ILike)(`%${query.search}%`);
        if (query.category)
            where.role = query.category;
        const [items, total] = await this.stakeholderRepo.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async listStakeholdersByLga(lgaId, query) {
        const where = { lgaId };
        if (query.search)
            where.name = (0, typeorm_2.ILike)(`%${query.search}%`);
        const [items, total] = await this.stakeholderRepo.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async getStakeholder(id) {
        const stakeholder = await this.stakeholderRepo.findOne({
            where: { id },
            relations: ['activities'],
        });
        if (!stakeholder)
            throw new common_1.NotFoundException('Stakeholder not found');
        return stakeholder;
    }
    async createStakeholder(dto) {
        return this.stakeholderRepo.save(dto);
    }
    async updateStakeholder(id, dto) {
        const stakeholder = await this.stakeholderRepo.findOne({ where: { id } });
        if (!stakeholder)
            throw new common_1.NotFoundException('Stakeholder not found');
        Object.assign(stakeholder, dto);
        return this.stakeholderRepo.save(stakeholder);
    }
    async createActivity(stakeholderId, dto) {
        const stakeholder = await this.stakeholderRepo.findOne({ where: { id: stakeholderId } });
        if (!stakeholder)
            throw new common_1.NotFoundException('Stakeholder not found');
        return this.activityRepo.save({
            stakeholderId,
            ...dto,
            conductedAt: dto.conductedAt ? new Date(dto.conductedAt) : new Date(),
            followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : null,
        });
    }
    async listActivities(stakeholderId) {
        return this.activityRepo.find({
            where: { stakeholderId },
            order: { conductedAt: 'DESC' },
        });
    }
    async listWhatsAppGroups(level) {
        const where = { isActive: true };
        if (level)
            where.level = level;
        return this.waGroupRepo.find({
            where,
            order: { level: 'ASC', name: 'ASC' },
        });
    }
    async createWhatsAppGroup(dto) {
        return this.waGroupRepo.save(dto);
    }
};
exports.ApmConversionService = ApmConversionService;
exports.ApmConversionService = ApmConversionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.LgaOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.WardOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.PollingUnitOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.StakeholderOrmEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.ConversionScoreOrmEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.ConversionActivityOrmEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.WhatsAppGroupOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ApmConversionService);
//# sourceMappingURL=apm-conversion.service.js.map