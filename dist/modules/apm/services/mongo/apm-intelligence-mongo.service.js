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
exports.ApmIntelligenceMongoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ApmIntelligenceMongoService = class ApmIntelligenceMongoService {
    tourModel;
    contentModel;
    mentionModel;
    responseModel;
    constructor(tourModel, contentModel, mentionModel, responseModel) {
        this.tourModel = tourModel;
        this.contentModel = contentModel;
        this.mentionModel = mentionModel;
        this.responseModel = responseModel;
    }
    async listTours(query) {
        const filter = {};
        if (query.search)
            filter.title = { $regex: query.search, $options: 'i' };
        const [items, total] = await Promise.all([
            this.tourModel.find(filter).sort({ tourDate: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.tourModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async getTour(id) {
        const tour = await this.tourModel.findById(id).exec();
        if (!tour)
            throw new common_1.NotFoundException('Tour not found');
        return tour;
    }
    async createTour(dto) {
        return new this.tourModel({ ...dto, tourDate: dto.tourDate ? new Date(dto.tourDate) : undefined }).save();
    }
    async updateTour(id, dto) {
        const tour = await this.tourModel.findByIdAndUpdate(id, { $set: { ...dto, tourDate: dto.tourDate ? new Date(dto.tourDate) : undefined } }, { new: true }).exec();
        if (!tour)
            throw new common_1.NotFoundException('Tour not found');
        return tour;
    }
    async getTourStats() {
        const [total, completed, planned, cancelled] = await Promise.all([
            this.tourModel.countDocuments().exec(),
            this.tourModel.countDocuments({ status: 'completed' }).exec(),
            this.tourModel.countDocuments({ status: 'planned' }).exec(),
            this.tourModel.countDocuments({ status: 'cancelled' }).exec(),
        ]);
        const tours = await this.tourModel.find({}).exec();
        const totalAttendees = tours.reduce((sum, t) => sum + t.actualAttendees, 0);
        const totalSignups = tours.reduce((sum, t) => sum + t.volunteerSignups, 0);
        return { total, completed, planned, cancelled, totalAttendees, totalSignups };
    }
    async listContent(query) {
        const filter = {};
        if (query.search)
            filter.title = { $regex: query.search, $options: 'i' };
        if (query.category)
            filter.type = query.category;
        const [items, total] = await Promise.all([
            this.contentModel.find(filter).sort({ createdAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.contentModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async createContent(dto) {
        return new this.contentModel(dto).save();
    }
    async listMentions(query) {
        const filter = {};
        if (query.search)
            filter.title = { $regex: query.search, $options: 'i' };
        if (query.category)
            filter.platform = query.category;
        const [items, total] = await Promise.all([
            this.mentionModel.find(filter).sort({ mentionedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.mentionModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async getMention(id) {
        const mention = await this.mentionModel.findById(id).exec();
        if (!mention)
            throw new common_1.NotFoundException('Mention not found');
        return mention;
    }
    async createMention(dto) {
        return new this.mentionModel({
            ...dto, mentionedAt: dto.mentionedAt ? new Date(dto.mentionedAt) : new Date(), isUrgent: dto.isUrgent ?? false,
        }).save();
    }
    async updateMentionStatus(id, status) {
        const mention = await this.mentionModel.findByIdAndUpdate(id, { $set: { status } }, { new: true }).exec();
        if (!mention)
            throw new common_1.NotFoundException('Mention not found');
        return mention;
    }
    async getListeningStats() {
        const [total, urgent, facebook, whatsapp, twitter, tiktok, instagram] = await Promise.all([
            this.mentionModel.countDocuments().exec(),
            this.mentionModel.countDocuments({ isUrgent: true }).exec(),
            this.mentionModel.countDocuments({ platform: 'facebook' }).exec(),
            this.mentionModel.countDocuments({ platform: 'whatsapp' }).exec(),
            this.mentionModel.countDocuments({ platform: 'twitter' }).exec(),
            this.mentionModel.countDocuments({ platform: 'tiktok' }).exec(),
            this.mentionModel.countDocuments({ platform: 'instagram' }).exec(),
        ]);
        return { total, urgent, facebook, whatsapp, twitter, tiktok, instagram };
    }
    async listResponses(mentionId) {
        return this.responseModel.find({ mentionId }).sort({ publishedAt: -1 }).exec();
    }
    async createResponse(dto) {
        return new this.responseModel({ ...dto, publishedAt: new Date() }).save();
    }
};
exports.ApmIntelligenceMongoService = ApmIntelligenceMongoService;
exports.ApmIntelligenceMongoService = ApmIntelligenceMongoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CandidateTour')),
    __param(1, (0, mongoose_1.InjectModel)('ContentAsset')),
    __param(2, (0, mongoose_1.InjectModel)('ListeningMention')),
    __param(3, (0, mongoose_1.InjectModel)('RapidResponse')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ApmIntelligenceMongoService);
//# sourceMappingURL=apm-intelligence-mongo.service.js.map