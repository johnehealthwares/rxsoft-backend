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
exports.ApmIntelligenceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let ApmIntelligenceService = class ApmIntelligenceService {
    tourRepo;
    contentRepo;
    mentionRepo;
    responseRepo;
    constructor(tourRepo, contentRepo, mentionRepo, responseRepo) {
        this.tourRepo = tourRepo;
        this.contentRepo = contentRepo;
        this.mentionRepo = mentionRepo;
        this.responseRepo = responseRepo;
    }
    async listTours(query) {
        const where = {};
        if (query.search)
            where.title = (0, typeorm_2.ILike)(`%${query.search}%`);
        const [items, total] = await this.tourRepo.findAndCount({
            where, order: { tourDate: 'DESC' },
            skip: (query.page - 1) * query.limit, take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async getTour(id) {
        const tour = await this.tourRepo.findOne({ where: { id } });
        if (!tour)
            throw new common_1.NotFoundException('Tour not found');
        return tour;
    }
    async createTour(dto) {
        return this.tourRepo.save({
            ...dto, tourDate: dto.tourDate ? new Date(dto.tourDate) : undefined,
        });
    }
    async updateTour(id, dto) {
        const tour = await this.tourRepo.findOne({ where: { id } });
        if (!tour)
            throw new common_1.NotFoundException('Tour not found');
        Object.assign(tour, { ...dto, tourDate: dto.tourDate ? new Date(dto.tourDate) : undefined });
        return this.tourRepo.save(tour);
    }
    async getTourStats() {
        const [total, completed, planned, cancelled] = await Promise.all([
            this.tourRepo.count(),
            this.tourRepo.count({ where: { status: 'completed' } }),
            this.tourRepo.count({ where: { status: 'planned' } }),
            this.tourRepo.count({ where: { status: 'cancelled' } }),
        ]);
        const tours = await this.tourRepo.find();
        const totalAttendees = tours.reduce((sum, t) => sum + t.actualAttendees, 0);
        const totalSignups = tours.reduce((sum, t) => sum + t.volunteerSignups, 0);
        return { total, completed, planned, cancelled, totalAttendees, totalSignups };
    }
    async listContent(query) {
        const where = {};
        if (query.search)
            where.title = (0, typeorm_2.ILike)(`%${query.search}%`);
        if (query.category)
            where.type = query.category;
        const [items, total] = await this.contentRepo.findAndCount({
            where: Object.keys(where).length ? where : {},
            order: { createdAt: 'DESC' },
            skip: (query.page - 1) * query.limit, take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async createContent(dto) {
        return this.contentRepo.save(dto);
    }
    async listMentions(query) {
        const where = {};
        if (query.search)
            where.title = (0, typeorm_2.ILike)(`%${query.search}%`);
        if (query.category)
            where.platform = query.category;
        const [items, total] = await this.mentionRepo.findAndCount({
            where: Object.keys(where).length ? where : {},
            order: { mentionedAt: 'DESC' },
            skip: (query.page - 1) * query.limit, take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async getMention(id) {
        const mention = await this.mentionRepo.findOne({ where: { id } });
        if (!mention)
            throw new common_1.NotFoundException('Mention not found');
        return mention;
    }
    async createMention(dto) {
        return this.mentionRepo.save({
            ...dto,
            mentionedAt: dto.mentionedAt ? new Date(dto.mentionedAt) : new Date(),
            isUrgent: dto.isUrgent ?? false,
        });
    }
    async updateMentionStatus(id, status) {
        const mention = await this.mentionRepo.findOne({ where: { id } });
        if (!mention)
            throw new common_1.NotFoundException('Mention not found');
        mention.status = status;
        return this.mentionRepo.save(mention);
    }
    async getListeningStats() {
        const [total, urgent, facebook, whatsapp, twitter, tiktok, instagram] = await Promise.all([
            this.mentionRepo.count(),
            this.mentionRepo.count({ where: { isUrgent: true } }),
            this.mentionRepo.count({ where: { platform: 'facebook' } }),
            this.mentionRepo.count({ where: { platform: 'whatsapp' } }),
            this.mentionRepo.count({ where: { platform: 'twitter' } }),
            this.mentionRepo.count({ where: { platform: 'tiktok' } }),
            this.mentionRepo.count({ where: { platform: 'instagram' } }),
        ]);
        return { total, urgent, facebook, whatsapp, twitter, tiktok, instagram };
    }
    async listResponses(mentionId) {
        return this.responseRepo.find({
            where: { mentionId },
            order: { publishedAt: 'DESC' },
        });
    }
    async createResponse(dto) {
        return this.responseRepo.save({ ...dto, publishedAt: new Date() });
    }
};
exports.ApmIntelligenceService = ApmIntelligenceService;
exports.ApmIntelligenceService = ApmIntelligenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CandidateTourOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.ContentAssetOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.ListeningMentionOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.RapidResponseOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ApmIntelligenceService);
//# sourceMappingURL=apm-intelligence.service.js.map