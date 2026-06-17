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
exports.ConsultationOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let ConsultationOrmEntity = class ConsultationOrmEntity {
    id;
    userId;
    name;
    phone;
    email;
    symptoms;
    questions;
    channel;
    status;
    pharmacistNotes;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.ConsultationOrmEntity = ConsultationOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ConsultationOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], ConsultationOrmEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ConsultationOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ConsultationOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConsultationOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConsultationOrmEntity.prototype, "symptoms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConsultationOrmEntity.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'WhatsApp' }),
    __metadata("design:type", String)
], ConsultationOrmEntity.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'Pending' }),
    __metadata("design:type", String)
], ConsultationOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pharmacist_notes', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConsultationOrmEntity.prototype, "pharmacistNotes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ConsultationOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ConsultationOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], ConsultationOrmEntity.prototype, "deletedAt", void 0);
exports.ConsultationOrmEntity = ConsultationOrmEntity = __decorate([
    (0, typeorm_1.Entity)('consultations')
], ConsultationOrmEntity);
//# sourceMappingURL=consultation.orm-entity.js.map