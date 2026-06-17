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
exports.StakeholderOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const lga_orm_entity_1 = require("./lga.orm-entity");
const ward_orm_entity_1 = require("./ward.orm-entity");
const conversion_activity_orm_entity_1 = require("./conversion-activity.orm-entity");
let StakeholderOrmEntity = class StakeholderOrmEntity {
    id;
    name;
    phone;
    email;
    role;
    lgaId;
    lga;
    wardId;
    ward;
    affiliation;
    influenceLevel;
    conversionStatus;
    notes;
    isActive;
    activities;
    createdAt;
    updatedAt;
};
exports.StakeholderOrmEntity = StakeholderOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StakeholderOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], StakeholderOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StakeholderOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StakeholderOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StakeholderOrmEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lga_id', type: 'text' }),
    __metadata("design:type", String)
], StakeholderOrmEntity.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lga_orm_entity_1.LgaOrmEntity),
    (0, typeorm_1.JoinColumn)({ name: 'lga_id' }),
    __metadata("design:type", lga_orm_entity_1.LgaOrmEntity)
], StakeholderOrmEntity.prototype, "lga", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ward_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StakeholderOrmEntity.prototype, "wardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ward_orm_entity_1.WardOrmEntity),
    (0, typeorm_1.JoinColumn)({ name: 'ward_id' }),
    __metadata("design:type", Object)
], StakeholderOrmEntity.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StakeholderOrmEntity.prototype, "affiliation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'influence_level', type: 'text', default: 'medium' }),
    __metadata("design:type", String)
], StakeholderOrmEntity.prototype, "influenceLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_status', type: 'text', default: 'untouched' }),
    __metadata("design:type", String)
], StakeholderOrmEntity.prototype, "conversionStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StakeholderOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], StakeholderOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => conversion_activity_orm_entity_1.ConversionActivityOrmEntity, (activity) => activity.stakeholder),
    __metadata("design:type", Array)
], StakeholderOrmEntity.prototype, "activities", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StakeholderOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StakeholderOrmEntity.prototype, "updatedAt", void 0);
exports.StakeholderOrmEntity = StakeholderOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_stakeholders')
], StakeholderOrmEntity);
//# sourceMappingURL=stakeholder.orm-entity.js.map