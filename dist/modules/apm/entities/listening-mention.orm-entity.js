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
exports.ListeningMentionOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let ListeningMentionOrmEntity = class ListeningMentionOrmEntity {
    id;
    platform;
    mentionUrl;
    title;
    content;
    sentiment;
    reach;
    mentionedAt;
    source;
    category;
    isUrgent;
    status;
    createdAt;
    updatedAt;
};
exports.ListeningMentionOrmEntity = ListeningMentionOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ListeningMentionOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ListeningMentionOrmEntity.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mention_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ListeningMentionOrmEntity.prototype, "mentionUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ListeningMentionOrmEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ListeningMentionOrmEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ListeningMentionOrmEntity.prototype, "sentiment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ListeningMentionOrmEntity.prototype, "reach", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mentioned_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], ListeningMentionOrmEntity.prototype, "mentionedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ListeningMentionOrmEntity.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ListeningMentionOrmEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_urgent', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ListeningMentionOrmEntity.prototype, "isUrgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'new' }),
    __metadata("design:type", String)
], ListeningMentionOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ListeningMentionOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ListeningMentionOrmEntity.prototype, "updatedAt", void 0);
exports.ListeningMentionOrmEntity = ListeningMentionOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_listening_mentions')
], ListeningMentionOrmEntity);
//# sourceMappingURL=listening-mention.orm-entity.js.map