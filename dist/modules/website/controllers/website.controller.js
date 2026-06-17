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
exports.WebsiteController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const optional_auth_guard_1 = require("../guards/optional-auth.guard");
const website_service_1 = require("../services/website.service");
const website_dto_1 = require("../dto/website.dto");
let WebsiteController = class WebsiteController {
    websiteService;
    constructor(websiteService) {
        this.websiteService = websiteService;
    }
    getHomepage() {
        return this.websiteService.getHomepage();
    }
    listProducts(query) {
        return this.websiteService.listProducts(query);
    }
    getProduct(id) {
        return this.websiteService.getProduct(id);
    }
    listCategories() {
        return this.websiteService.listCategories();
    }
    getCategoryBySlug(slug) {
        return this.websiteService.getCategoryBySlug(slug);
    }
    listHealthConcerns() {
        return this.websiteService.listHealthConcerns();
    }
    getHealthConcernBySlug(slug) {
        return this.websiteService.getHealthConcernBySlug(slug);
    }
    createPrescription(files, payload) {
        return this.websiteService.createPrescription(files || [], payload);
    }
    listPrescriptions(req) {
        return this.websiteService.listPrescriptions(req.user?.sub);
    }
    createConsultation(payload) {
        return this.websiteService.createConsultation(payload);
    }
    listConsultations(req) {
        return this.websiteService.listConsultations(req.user?.sub);
    }
    addToCart(payload) {
        const ids = payload.map((p) => p.productId);
        return this.websiteService.getCart(ids);
    }
    getCart(ids) {
        const productIds = ids ? ids.split(',').filter(Boolean) : [];
        return this.websiteService.getCart(productIds);
    }
    removeFromCart() {
        return { ok: true };
    }
    createOrder(payload, req) {
        return this.websiteService.createOrder(payload, req.user?.sub);
    }
    listOrders(req) {
        return this.websiteService.listOrders(req.user?.sub);
    }
    trackOrder(trackingCode) {
        return this.websiteService.trackOrder(trackingCode);
    }
    getOrder(id) {
        return this.websiteService.getOrder(id);
    }
    listArticles(query) {
        return this.websiteService.listArticles(query);
    }
    getArticleBySlug(slug) {
        return this.websiteService.getArticleBySlug(slug);
    }
    listDeliveryAreas() {
        return this.websiteService.listDeliveryAreas();
    }
    listBranches() {
        return this.websiteService.listBranches();
    }
    getBranch(id) {
        return this.websiteService.getBranch(id);
    }
    submitContact(payload) {
        return this.websiteService.submitContact(payload);
    }
    subscribe(payload) {
        return this.websiteService.subscribe(payload);
    }
    createReview(payload, req) {
        return this.websiteService.createReview(payload, req.user?.sub);
    }
    getProductReviews(productId) {
        return this.websiteService.getProductReviews(productId);
    }
    getRewards(req) {
        return this.websiteService.getRewards(req.user?.sub);
    }
    search(query) {
        return this.websiteService.search(query);
    }
};
exports.WebsiteController = WebsiteController;
__decorate([
    (0, common_1.Get)('homepage'),
    (0, swagger_1.ApiOperation)({ summary: 'Get homepage data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getHomepage", null);
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({ summary: 'List products with search/filter/pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "listProducts", null);
__decorate([
    (0, common_1.Get)('products/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'List all categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "listCategories", null);
__decorate([
    (0, common_1.Get)('categories/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get category by slug with products' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getCategoryBySlug", null);
__decorate([
    (0, common_1.Get)('health-concerns'),
    (0, swagger_1.ApiOperation)({ summary: 'List health concerns' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "listHealthConcerns", null);
__decorate([
    (0, common_1.Get)('health-concerns/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get health concern by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getHealthConcernBySlug", null);
__decorate([
    (0, common_1.Post)('prescriptions'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: website_dto_1.CreatePrescriptionDto }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload prescription with files' }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, website_dto_1.CreatePrescriptionDto]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "createPrescription", null);
__decorate([
    (0, common_1.UseGuards)(optional_auth_guard_1.OptionalAuthGuard),
    (0, common_1.Get)('prescriptions'),
    (0, swagger_1.ApiOperation)({ summary: 'List prescriptions' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "listPrescriptions", null);
__decorate([
    (0, common_1.Post)('consultations'),
    (0, swagger_1.ApiOperation)({ summary: 'Book a consultation' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.CreateConsultationDto]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "createConsultation", null);
__decorate([
    (0, common_1.UseGuards)(optional_auth_guard_1.OptionalAuthGuard),
    (0, common_1.Get)('consultations'),
    (0, swagger_1.ApiOperation)({ summary: 'List consultations' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "listConsultations", null);
__decorate([
    (0, common_1.Post)('cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Add to cart (returns product details for given ids)' }),
    (0, swagger_1.ApiBody)({ type: [website_dto_1.AddToCartDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)('cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cart product details' }),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getCart", null);
__decorate([
    (0, common_1.Delete)('cart/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove from cart (no-op on server, client-managed)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.UseGuards)(optional_auth_guard_1.OptionalAuthGuard),
    (0, common_1.Post)('orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Create order' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "createOrder", null);
__decorate([
    (0, common_1.UseGuards)(optional_auth_guard_1.OptionalAuthGuard),
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiOperation)({ summary: 'List orders' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "listOrders", null);
__decorate([
    (0, common_1.Get)('orders/track/:trackingCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Track order by code' }),
    __param(0, (0, common_1.Param)('trackingCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "trackOrder", null);
__decorate([
    (0, common_1.UseGuards)(optional_auth_guard_1.OptionalAuthGuard),
    (0, common_1.Get)('orders/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)('articles'),
    (0, swagger_1.ApiOperation)({ summary: 'List published articles' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.ListQueryDto]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "listArticles", null);
__decorate([
    (0, common_1.Get)('articles/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get article by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getArticleBySlug", null);
__decorate([
    (0, common_1.Get)('delivery-areas'),
    (0, swagger_1.ApiOperation)({ summary: 'List delivery areas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "listDeliveryAreas", null);
__decorate([
    (0, common_1.Get)('branches'),
    (0, swagger_1.ApiOperation)({ summary: 'List branches' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "listBranches", null);
__decorate([
    (0, common_1.Get)('branches/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get branch detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getBranch", null);
__decorate([
    (0, common_1.Post)('contact'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit contact form' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.CreateContactDto]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "submitContact", null);
__decorate([
    (0, common_1.Post)('newsletter/subscribe'),
    (0, swagger_1.ApiOperation)({ summary: 'Subscribe to newsletter' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.NewsletterSubscribeDto]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "subscribe", null);
__decorate([
    (0, common_1.UseGuards)(optional_auth_guard_1.OptionalAuthGuard),
    (0, common_1.Post)('reviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit product review' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.CreateReviewDto, Object]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "createReview", null);
__decorate([
    (0, common_1.Get)('reviews/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product reviews' }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getProductReviews", null);
__decorate([
    (0, common_1.UseGuards)(optional_auth_guard_1.OptionalAuthGuard),
    (0, common_1.Get)('rewards'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get rewards data' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "getRewards", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Global search' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.SearchQueryDto]),
    __metadata("design:returntype", void 0)
], WebsiteController.prototype, "search", null);
exports.WebsiteController = WebsiteController = __decorate([
    (0, swagger_1.ApiTags)('website'),
    (0, common_1.Controller)('website'),
    __metadata("design:paramtypes", [website_service_1.WebsiteService])
], WebsiteController);
//# sourceMappingURL=website.controller.js.map