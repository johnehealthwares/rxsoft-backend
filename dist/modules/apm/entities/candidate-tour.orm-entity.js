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
exports.CandidateTourOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let CandidateTourOrmEntity = class CandidateTourOrmEntity {
    id;
    title;
    lgaId;
    wardId;
    visitType;
    tourDate;
    description;
    expectedAttendees;
    actualAttendees;
    stakeholdersMet;
    commitments;
    complaints;
    volunteerSignups;
    mediaCoverage;
    notes;
    status;
    createdAt;
    updatedAt;
};
exports.CandidateTourOrmEntity = CandidateTourOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CandidateTourOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CandidateTourOrmEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lga_id', type: 'text' }),
    __metadata("design:type", String)
], CandidateTourOrmEntity.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ward_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CandidateTourOrmEntity.prototype, "wardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'visit_type', type: 'text', default: 'rally' }),
    __metadata("design:type", String)
], CandidateTourOrmEntity.prototype, "visitType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tour_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], CandidateTourOrmEntity.prototype, "tourDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CandidateTourOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_attendees', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], CandidateTourOrmEntity.prototype, "expectedAttendees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actual_attendees', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], CandidateTourOrmEntity.prototype, "actualAttendees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stakeholders_met', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CandidateTourOrmEntity.prototype, "stakeholdersMet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CandidateTourOrmEntity.prototype, "commitments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CandidateTourOrmEntity.prototype, "complaints", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'volunteer_signups', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], CandidateTourOrmEntity.prototype, "volunteerSignups", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'media_coverage', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CandidateTourOrmEntity.prototype, "mediaCoverage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CandidateTourOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'planned' }),
    __metadata("design:type", String)
], CandidateTourOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CandidateTourOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CandidateTourOrmEntity.prototype, "updatedAt", void 0);
exports.CandidateTourOrmEntity = CandidateTourOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_candidate_tours')
], CandidateTourOrmEntity);
//# sourceMappingURL=candidate-tour.orm-entity.js.map