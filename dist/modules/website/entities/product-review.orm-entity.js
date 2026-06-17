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
exports.ProductReviewOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let ProductReviewOrmEntity = class ProductReviewOrmEntity {
    id;
    productId;
    userId;
    name;
    rating;
    comment;
    imageUrls;
    isVerifiedPurchase;
    isApproved;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.ProductReviewOrmEntity = ProductReviewOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductReviewOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'uuid' }),
    __metadata("design:type", String)
], ProductReviewOrmEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], ProductReviewOrmEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ProductReviewOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ProductReviewOrmEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ProductReviewOrmEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_urls', type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], ProductReviewOrmEntity.prototype, "imageUrls", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_verified_purchase', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProductReviewOrmEntity.prototype, "isVerifiedPurchase", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_approved', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ProductReviewOrmEntity.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProductReviewOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProductReviewOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], ProductReviewOrmEntity.prototype, "deletedAt", void 0);
exports.ProductReviewOrmEntity = ProductReviewOrmEntity = __decorate([
    (0, typeorm_1.Entity)('product_reviews')
], ProductReviewOrmEntity);
//# sourceMappingURL=product-review.orm-entity.js.map