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
exports.ApmController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const apm_service_1 = require("../services/apm.service");
const apm_dto_1 = require("../dto/apm.dto");
let ApmController = class ApmController {
    apmService;
    constructor(apmService) {
        this.apmService = apmService;
    }
    getHomepage() {
        return this.apmService.getHomepage();
    }
    listAgenda() {
        return this.apmService.listAgenda();
    }
    listAchievements() {
        return this.apmService.listAchievements();
    }
    listNews(query) {
        return this.apmService.listNews(query);
    }
    getNewsBySlug(slug) {
        return this.apmService.getNewsBySlug(slug);
    }
    listEvents() {
        return this.apmService.listEvents();
    }
    getEvent(id) {
        return this.apmService.getEvent(id);
    }
    registerForEvent(id, dto) {
        return this.apmService.registerForEvent(id, dto);
    }
    registerVolunteer(dto) {
        return this.apmService.registerVolunteer(dto);
    }
    joinMovement(dto) {
        return this.apmService.joinMovement(dto);
    }
    submitContact(dto) {
        return this.apmService.submitContact(dto);
    }
    subscribeNewsletter(dto) {
        return this.apmService.subscribeNewsletter(dto);
    }
    submitFeedback(dto) {
        return this.apmService.submitFeedback(dto);
    }
    reportIssue(dto) {
        return this.apmService.reportIssue(dto);
    }
    listMedia() {
        return this.apmService.listMedia();
    }
    listTestimonials() {
        return this.apmService.listTestimonials();
    }
    donate(dto) {
        return this.apmService.donate(dto);
    }
};
exports.ApmController = ApmController;
__decorate([
    (0, common_1.Get)('homepage'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaign homepage data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "getHomepage", null);
__decorate([
    (0, common_1.Get)('agenda'),
    (0, swagger_1.ApiOperation)({ summary: 'List Oyo Next agenda items' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "listAgenda", null);
__decorate([
    (0, common_1.Get)('achievements'),
    (0, swagger_1.ApiOperation)({ summary: 'List campaign achievements' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "listAchievements", null);
__decorate([
    (0, common_1.Get)('news'),
    (0, swagger_1.ApiOperation)({ summary: 'List news articles' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "listNews", null);
__decorate([
    (0, common_1.Get)('news/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get news article by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "getNewsBySlug", null);
__decorate([
    (0, common_1.Get)('events'),
    (0, swagger_1.ApiOperation)({ summary: 'List campaign events' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "listEvents", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get event detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "getEvent", null);
__decorate([
    (0, common_1.Post)('events/:id/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register for an event' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apm_dto_1.EventRegistrationDto]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "registerForEvent", null);
__decorate([
    (0, common_1.Post)('volunteer'),
    (0, swagger_1.ApiOperation)({ summary: 'Register as a volunteer' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.RegisterVolunteerDto]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "registerVolunteer", null);
__decorate([
    (0, common_1.Post)('join'),
    (0, swagger_1.ApiOperation)({ summary: 'Join the movement' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.JoinMovementDto]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "joinMovement", null);
__decorate([
    (0, common_1.Post)('contact'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit contact form' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.CreateContactDto]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "submitContact", null);
__decorate([
    (0, common_1.Post)('newsletter'),
    (0, swagger_1.ApiOperation)({ summary: 'Subscribe to newsletter' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.NewsletterSubscribeDto]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "subscribeNewsletter", null);
__decorate([
    (0, common_1.Post)('citizens-speak'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit citizen feedback' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.CitizenFeedbackDto]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "submitFeedback", null);
__decorate([
    (0, common_1.Post)('report'),
    (0, swagger_1.ApiOperation)({ summary: 'Report an issue' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.IssueReportDto]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "reportIssue", null);
__decorate([
    (0, common_1.Get)('media'),
    (0, swagger_1.ApiOperation)({ summary: 'List media assets' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "listMedia", null);
__decorate([
    (0, common_1.Get)('testimonials'),
    (0, swagger_1.ApiOperation)({ summary: 'List testimonials' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "listTestimonials", null);
__decorate([
    (0, common_1.Post)('donate'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a donation' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apm_dto_1.DonationDto]),
    __metadata("design:returntype", void 0)
], ApmController.prototype, "donate", null);
exports.ApmController = ApmController = __decorate([
    (0, swagger_1.ApiTags)('apm'),
    (0, common_1.Controller)('apm'),
    __metadata("design:paramtypes", [apm_service_1.ApmService])
], ApmController);
//# sourceMappingURL=apm.controller.js.map