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
exports.BlogArticleOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let BlogArticleOrmEntity = class BlogArticleOrmEntity {
    id;
    title;
    slug;
    excerpt;
    content;
    category;
    authorName;
    imageUrl;
    readingTime;
    isPublished;
    publishedAt;
    metaTitle;
    metaDescription;
    ogImageUrl;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.BlogArticleOrmEntity = BlogArticleOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BlogArticleOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BlogArticleOrmEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], BlogArticleOrmEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "excerpt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BlogArticleOrmEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'author_name', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "authorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reading_time', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "readingTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_published', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], BlogArticleOrmEntity.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'published_at', nullable: true, type: 'text', transformer: column_transformer_1.DateOrNullTransformer }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_title', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "metaTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "metaDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'og_image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "ogImageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BlogArticleOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BlogArticleOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], BlogArticleOrmEntity.prototype, "deletedAt", void 0);
exports.BlogArticleOrmEntity = BlogArticleOrmEntity = __decorate([
    (0, typeorm_1.Entity)('blog_articles')
], BlogArticleOrmEntity);
//# sourceMappingURL=blog-article.orm-entity.js.map