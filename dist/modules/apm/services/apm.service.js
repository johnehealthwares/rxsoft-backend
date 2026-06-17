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
exports.ApmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let ApmService = class ApmService {
    campaignInfoRepo;
    agendaRepo;
    achievementRepo;
    newsRepo;
    eventRepo;
    eventRegRepo;
    volunteerRepo;
    supporterRepo;
    testimonialRepo;
    mediaRepo;
    contactRepo;
    newsletterRepo;
    feedbackRepo;
    issueRepo;
    donationRepo;
    constructor(campaignInfoRepo, agendaRepo, achievementRepo, newsRepo, eventRepo, eventRegRepo, volunteerRepo, supporterRepo, testimonialRepo, mediaRepo, contactRepo, newsletterRepo, feedbackRepo, issueRepo, donationRepo) {
        this.campaignInfoRepo = campaignInfoRepo;
        this.agendaRepo = agendaRepo;
        this.achievementRepo = achievementRepo;
        this.newsRepo = newsRepo;
        this.eventRepo = eventRepo;
        this.eventRegRepo = eventRegRepo;
        this.volunteerRepo = volunteerRepo;
        this.supporterRepo = supporterRepo;
        this.testimonialRepo = testimonialRepo;
        this.mediaRepo = mediaRepo;
        this.contactRepo = contactRepo;
        this.newsletterRepo = newsletterRepo;
        this.feedbackRepo = feedbackRepo;
        this.issueRepo = issueRepo;
        this.donationRepo = donationRepo;
    }
    async getHomepage() {
        const [infos, achievements, featuredNews, upcomingEvents, testimonials] = await Promise.all([
            this.campaignInfoRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } }),
            this.achievementRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } }),
            this.newsRepo.find({ where: { isPublished: true, isFeatured: true }, order: { publishedAt: 'DESC' }, take: 4 }),
            this.eventRepo.find({ where: { isPublished: true }, order: { eventDate: 'ASC' }, take: 3 }),
            this.testimonialRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' }, take: 6 }),
        ]);
        return { infos, achievements, featuredNews, upcomingEvents, testimonials };
    }
    async listAgenda() {
        return this.agendaRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
    }
    async listAchievements() {
        return this.achievementRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
    }
    async listNews(query) {
        const where = { isPublished: true };
        if (query.search)
            where.title = (0, typeorm_2.ILike)(`%${query.search}%`);
        if (query.category)
            where.category = query.category;
        const [items, total] = await this.newsRepo.findAndCount({
            where,
            order: { publishedAt: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
    async getNewsBySlug(slug) {
        const article = await this.newsRepo.findOne({ where: { slug, isPublished: true } });
        if (!article)
            throw new common_1.NotFoundException('Article not found');
        return article;
    }
    async listEvents() {
        return this.eventRepo.find({ where: { isPublished: true }, order: { eventDate: 'ASC' } });
    }
    async getEvent(id) {
        const event = await this.eventRepo.findOne({ where: { id, isPublished: true } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        return event;
    }
    async registerForEvent(eventId, dto) {
        const event = await this.eventRepo.findOne({ where: { id: eventId, isPublished: true } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        return this.eventRegRepo.save({ eventId, ...dto });
    }
    async registerVolunteer(dto) {
        return this.volunteerRepo.save(dto);
    }
    async joinMovement(dto) {
        return this.supporterRepo.save(dto);
    }
    async submitContact(dto) {
        return this.contactRepo.save(dto);
    }
    async subscribeNewsletter(dto) {
        const existing = await this.newsletterRepo.findOne({ where: { email: dto.email } });
        if (existing) {
            if (!existing.subscribed) {
                existing.subscribed = true;
                await this.newsletterRepo.save(existing);
            }
            return existing;
        }
        return this.newsletterRepo.save(dto);
    }
    async submitFeedback(dto) {
        return this.feedbackRepo.save(dto);
    }
    async reportIssue(dto) {
        return this.issueRepo.save({ ...dto, status: 'open' });
    }
    async listMedia() {
        return this.mediaRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
    }
    async listTestimonials() {
        return this.testimonialRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
    }
    async donate(dto) {
        return this.donationRepo.save(dto);
    }
    async listVolunteers(query) {
        return this.paginate(this.volunteerRepo, query);
    }
    async listSupporters(query) {
        return this.paginate(this.supporterRepo, query);
    }
    async listContacts(query) {
        return this.paginate(this.contactRepo, query, 'createdAt');
    }
    async listEventRegistrations(query) {
        return this.paginate(this.eventRegRepo, query);
    }
    async listFeedback(query) {
        return this.paginate(this.feedbackRepo, query);
    }
    async listIssues(query) {
        return this.paginate(this.issueRepo, query);
    }
    async listDonations(query) {
        return this.paginate(this.donationRepo, query);
    }
    async getStats() {
        const [volunteers, supporters, events, feedback] = await Promise.all([
            this.volunteerRepo.count(),
            this.supporterRepo.count(),
            this.eventRepo.count({ where: { isPublished: true } }),
            this.feedbackRepo.count(),
        ]);
        return { volunteers, supporters, events, feedback };
    }
    async paginate(repo, query, orderField = 'createdAt') {
        const [items, total] = await repo.findAndCount({
            order: { [orderField]: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }
};
exports.ApmService = ApmService;
exports.ApmService = ApmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CampaignInfoOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.AgendaItemOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.AchievementOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.NewsArticleOrmEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.EventOrmEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.EventRegistrationOrmEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.VolunteerOrmEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(entities_1.SupporterOrmEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(entities_1.TestimonialOrmEntity)),
    __param(9, (0, typeorm_1.InjectRepository)(entities_1.MediaAssetOrmEntity)),
    __param(10, (0, typeorm_1.InjectRepository)(entities_1.ContactSubmissionOrmEntity)),
    __param(11, (0, typeorm_1.InjectRepository)(entities_1.NewsletterSubscriberOrmEntity)),
    __param(12, (0, typeorm_1.InjectRepository)(entities_1.CitizenFeedbackOrmEntity)),
    __param(13, (0, typeorm_1.InjectRepository)(entities_1.IssueReportOrmEntity)),
    __param(14, (0, typeorm_1.InjectRepository)(entities_1.DonationOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ApmService);
//# sourceMappingURL=apm.service.js.map