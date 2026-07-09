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
exports.ConversionActivityOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let ConversionActivityOrmEntity = class ConversionActivityOrmEntity {
    id;
    stakeholderId;
    stakeholder;
    type;
    notes;
    outcome;
    conductedBy;
    conductedAt;
    followUpDate;
    createdAt;
};
exports.ConversionActivityOrmEntity = ConversionActivityOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ConversionActivityOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stakeholder_id', type: 'text' }),
    __metadata("design:type", String)
], ConversionActivityOrmEntity.prototype, "stakeholderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('StakeholderOrmEntity', 'activities'),
    (0, typeorm_1.JoinColumn)({ name: 'stakeholder_id' }),
    __metadata("design:type", Function)
], ConversionActivityOrmEntity.prototype, "stakeholder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ConversionActivityOrmEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConversionActivityOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConversionActivityOrmEntity.prototype, "outcome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conducted_by', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ConversionActivityOrmEntity.prototype, "conductedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conducted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], ConversionActivityOrmEntity.prototype, "conductedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'follow_up_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], ConversionActivityOrmEntity.prototype, "followUpDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ConversionActivityOrmEntity.prototype, "createdAt", void 0);
exports.ConversionActivityOrmEntity = ConversionActivityOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_conversion_activities')
], ConversionActivityOrmEntity);
//# sourceMappingURL=conversion-activity.orm-entity.js.map