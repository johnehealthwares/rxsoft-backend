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
exports.NewsArticleOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let NewsArticleOrmEntity = class NewsArticleOrmEntity {
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
    createdAt;
    updatedAt;
    deletedAt;
};
exports.NewsArticleOrmEntity = NewsArticleOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NewsArticleOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], NewsArticleOrmEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], NewsArticleOrmEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], NewsArticleOrmEntity.prototype, "excerpt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], NewsArticleOrmEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], NewsArticleOrmEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'author_name', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], NewsArticleOrmEntity.prototype, "authorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], NewsArticleOrmEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'video_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], NewsArticleOrmEntity.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_featured', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], NewsArticleOrmEntity.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_published', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], NewsArticleOrmEntity.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'published_at', nullable: true, type: 'text', transformer: column_transformer_1.DateOrNullTransformer }),
    __metadata("design:type", Object)
], NewsArticleOrmEntity.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], NewsArticleOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], NewsArticleOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], NewsArticleOrmEntity.prototype, "deletedAt", void 0);
exports.NewsArticleOrmEntity = NewsArticleOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_news_articles')
], NewsArticleOrmEntity);
//# sourceMappingURL=news-article.orm-entity.js.map