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
exports.CitizenFeedbackOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let CitizenFeedbackOrmEntity = class CitizenFeedbackOrmEntity {
    id;
    name;
    phone;
    email;
    lga;
    message;
    sentiment;
    topic;
    createdAt;
};
exports.CitizenFeedbackOrmEntity = CitizenFeedbackOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CitizenFeedbackOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CitizenFeedbackOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CitizenFeedbackOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CitizenFeedbackOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CitizenFeedbackOrmEntity.prototype, "lga", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CitizenFeedbackOrmEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CitizenFeedbackOrmEntity.prototype, "sentiment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CitizenFeedbackOrmEntity.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CitizenFeedbackOrmEntity.prototype, "createdAt", void 0);
exports.CitizenFeedbackOrmEntity = CitizenFeedbackOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_citizen_feedback')
], CitizenFeedbackOrmEntity);
//# sourceMappingURL=citizen-feedback.orm-entity.js.map