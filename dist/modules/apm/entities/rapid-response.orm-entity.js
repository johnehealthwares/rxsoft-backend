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
exports.RapidResponseOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let RapidResponseOrmEntity = class RapidResponseOrmEntity {
    id;
    mentionId;
    responseType;
    content;
    publishedAt;
    publishedBy;
    platform;
    effectiveness;
    createdAt;
    updatedAt;
};
exports.RapidResponseOrmEntity = RapidResponseOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RapidResponseOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mention_id', type: 'text' }),
    __metadata("design:type", String)
], RapidResponseOrmEntity.prototype, "mentionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'response_type', type: 'text', default: 'rebuttal' }),
    __metadata("design:type", String)
], RapidResponseOrmEntity.prototype, "responseType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], RapidResponseOrmEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'published_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], RapidResponseOrmEntity.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'published_by', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RapidResponseOrmEntity.prototype, "publishedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RapidResponseOrmEntity.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RapidResponseOrmEntity.prototype, "effectiveness", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RapidResponseOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], RapidResponseOrmEntity.prototype, "updatedAt", void 0);
exports.RapidResponseOrmEntity = RapidResponseOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_rapid_responses')
], RapidResponseOrmEntity);
//# sourceMappingURL=rapid-response.orm-entity.js.map