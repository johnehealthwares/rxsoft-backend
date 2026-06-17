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
exports.ApmMongoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ApmMongoService = class ApmMongoService {
    campaignInfoModel;
    agendaModel;
    achievementModel;
    newsModel;
    eventModel;
    eventRegModel;
    volunteerModel;
    supporterModel;
    testimonialModel;
    mediaModel;
    contactModel;
    newsletterModel;
    feedbackModel;
    issueModel;
    donationModel;
    constructor(campaignInfoModel, agendaModel, achievementModel, newsModel, eventModel, eventRegModel, volunteerModel, supporterModel, testimonialModel, mediaModel, contactModel, newsletterModel, feedbackModel, issueModel, donationModel) {
        this.campaignInfoModel = campaignInfoModel;
        this.agendaModel = agendaModel;
        this.achievementModel = achievementModel;
        this.newsModel = newsModel;
        this.eventModel = eventModel;
        this.eventRegModel = eventRegModel;
        this.volunteerModel = volunteerModel;
        this.supporterModel = supporterModel;
        this.testimonialModel = testimonialModel;
        this.mediaModel = mediaModel;
        this.contactModel = contactModel;
        this.newsletterModel = newsletterModel;
        this.feedbackModel = feedbackModel;
        this.issueModel = issueModel;
        this.donationModel = donationModel;
    }
    async getHomepage() {
        const [infos, achievements, featuredNews, upcomingEvents, testimonials] = await Promise.all([
            this.campaignInfoModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
            this.achievementModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
            this.newsModel.find({ isPublished: true, isFeatured: true }).sort({ publishedAt: -1 }).limit(4).exec(),
            this.eventModel.find({ isPublished: true }).sort({ eventDate: 1 }).limit(3).exec(),
            this.testimonialModel.find({ isActive: true }).sort({ displayOrder: 1 }).limit(6).exec(),
        ]);
        return { infos, achievements, featuredNews, upcomingEvents, testimonials };
    }
    async listAgenda() {
        return this.agendaModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
    }
    async listAchievements() {
        return this.achievementModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
    }
    async listNews(query) {
        const filter = { isPublished: true };
        if (query.search)
            filter.title = { $regex: query.search, $options: 'i' };
        if (query.category)
            filter.category = query.category;
        const [items, total] = await Promise.all([
            this.newsModel.find(filter).sort({ publishedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            this.newsModel.countDocuments(filter).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
    async getNewsBySlug(slug) {
        const article = await this.newsModel.findOne({ slug, isPublished: true }).exec();
        if (!article)
            throw new common_1.NotFoundException('Article not found');
        return article;
    }
    async listEvents() {
        return this.eventModel.find({ isPublished: true }).sort({ eventDate: 1 }).exec();
    }
    async getEvent(id) {
        const event = await this.eventModel.findById(id).exec();
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        return event;
    }
    async registerForEvent(eventId, dto) {
        const event = await this.eventModel.findById(eventId).exec();
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        return new this.eventRegModel({ eventId, ...dto }).save();
    }
    async registerVolunteer(dto) {
        return new this.volunteerModel(dto).save();
    }
    async joinMovement(dto) {
        return new this.supporterModel(dto).save();
    }
    async submitContact(dto) {
        return new this.contactModel(dto).save();
    }
    async subscribeNewsletter(dto) {
        const existing = await this.newsletterModel.findOne({ email: dto.email }).exec();
        if (existing) {
            if (!existing.subscribed) {
                existing.subscribed = true;
                await existing.save();
            }
            return existing;
        }
        return new this.newsletterModel(dto).save();
    }
    async submitFeedback(dto) {
        return new this.feedbackModel(dto).save();
    }
    async reportIssue(dto) {
        return new this.issueModel({ ...dto, status: 'open' }).save();
    }
    async listMedia() {
        return this.mediaModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
    }
    async listTestimonials() {
        return this.testimonialModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
    }
    async donate(dto) {
        return new this.donationModel(dto).save();
    }
    async listVolunteers(query) {
        return this.paginate(this.volunteerModel, query);
    }
    async listSupporters(query) {
        return this.paginate(this.supporterModel, query);
    }
    async listContacts(query) {
        return this.paginate(this.contactModel, query);
    }
    async listEventRegistrations(query) {
        return this.paginate(this.eventRegModel, query);
    }
    async listFeedback(query) {
        return this.paginate(this.feedbackModel, query);
    }
    async listIssues(query) {
        return this.paginate(this.issueModel, query);
    }
    async listDonations(query) {
        return this.paginate(this.donationModel, query);
    }
    async getStats() {
        const [volunteers, supporters, events, feedback] = await Promise.all([
            this.volunteerModel.countDocuments().exec(),
            this.supporterModel.countDocuments().exec(),
            this.eventModel.countDocuments({ isPublished: true }).exec(),
            this.feedbackModel.countDocuments().exec(),
        ]);
        return { volunteers, supporters, events, feedback };
    }
    async paginate(model, query, orderField = 'createdAt') {
        const [items, total] = await Promise.all([
            model.find({}).sort({ [orderField]: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
            model.countDocuments({}).exec(),
        ]);
        return { items, total, page: query.page, limit: query.limit };
    }
};
exports.ApmMongoService = ApmMongoService;
exports.ApmMongoService = ApmMongoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CampaignInfo')),
    __param(1, (0, mongoose_1.InjectModel)('AgendaItem')),
    __param(2, (0, mongoose_1.InjectModel)('Achievement')),
    __param(3, (0, mongoose_1.InjectModel)('NewsArticle')),
    __param(4, (0, mongoose_1.InjectModel)('Event')),
    __param(5, (0, mongoose_1.InjectModel)('EventRegistration')),
    __param(6, (0, mongoose_1.InjectModel)('Volunteer')),
    __param(7, (0, mongoose_1.InjectModel)('Supporter')),
    __param(8, (0, mongoose_1.InjectModel)('Testimonial')),
    __param(9, (0, mongoose_1.InjectModel)('MediaAsset')),
    __param(10, (0, mongoose_1.InjectModel)('ContactSubmission')),
    __param(11, (0, mongoose_1.InjectModel)('NewsletterSubscriber')),
    __param(12, (0, mongoose_1.InjectModel)('CitizenFeedback')),
    __param(13, (0, mongoose_1.InjectModel)('IssueReport')),
    __param(14, (0, mongoose_1.InjectModel)('Donation')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ApmMongoService);
//# sourceMappingURL=apm-mongo.service.js.map