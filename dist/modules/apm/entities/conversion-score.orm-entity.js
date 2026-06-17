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
exports.ConversionScoreOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let ConversionScoreOrmEntity = class ConversionScoreOrmEntity {
    id;
    entityType;
    entityId;
    score;
    status;
    lastAssessedAt;
    assessedBy;
    notes;
    createdAt;
    updatedAt;
};
exports.ConversionScoreOrmEntity = ConversionScoreOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ConversionScoreOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entity_type', type: 'text' }),
    __metadata("design:type", String)
], ConversionScoreOrmEntity.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entity_id', type: 'text' }),
    __metadata("design:type", String)
], ConversionScoreOrmEntity.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ConversionScoreOrmEntity.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'grey' }),
    __metadata("design:type", String)
], ConversionScoreOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_assessed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], ConversionScoreOrmEntity.prototype, "lastAssessedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assessed_by', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConversionScoreOrmEntity.prototype, "assessedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConversionScoreOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ConversionScoreOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ConversionScoreOrmEntity.prototype, "updatedAt", void 0);
exports.ConversionScoreOrmEntity = ConversionScoreOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_conversion_scores')
], ConversionScoreOrmEntity);
//# sourceMappingURL=conversion-score.orm-entity.js.map