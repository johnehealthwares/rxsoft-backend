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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsArticleSchemaFactory = exports.NewsArticleSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let NewsArticleSchema = class NewsArticleSchema {
    id;
    title;
    slug;
    excerpt;
    content;
    category;
    authorName;
    imageUrl;
    videoUrl;
    isFeatured;
    isPublished;
    publishedAt;
    deletedAt;
};
exports.NewsArticleSchema = NewsArticleSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], NewsArticleSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], NewsArticleSchema.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], NewsArticleSchema.prototype, "excerpt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], NewsArticleSchema.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], NewsArticleSchema.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], NewsArticleSchema.prototype, "authorName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], NewsArticleSchema.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], NewsArticleSchema.prototype, "videoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NewsArticleSchema.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], NewsArticleSchema.prototype, "isPublished", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], NewsArticleSchema.prototype, "publishedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], NewsArticleSchema.prototype, "deletedAt", void 0);
exports.NewsArticleSchema = NewsArticleSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_news_articles', timestamps: true })
], NewsArticleSchema);
exports.NewsArticleSchemaFactory = mongoose_1.SchemaFactory.createForClass(NewsArticleSchema);
//# sourceMappingURL=news-article.schema.js.map