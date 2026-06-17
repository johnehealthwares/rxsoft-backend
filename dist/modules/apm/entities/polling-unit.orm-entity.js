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
exports.PollingUnitOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const ward_orm_entity_1 = require("./ward.orm-entity");
const lga_orm_entity_1 = require("./lga.orm-entity");
let PollingUnitOrmEntity = class PollingUnitOrmEntity {
    id;
    code;
    name;
    wardId;
    ward;
    lgaId;
    lga;
    registeredVoters;
    pastResultApm;
    pastResultPdp;
    pastResultApc;
    pastResultOther;
    latitude;
    longitude;
    riskLevel;
    conversionStatus;
    assignedAgentName;
    assignedAgentPhone;
    notes;
    isActive;
    createdAt;
    updatedAt;
};
exports.PollingUnitOrmEntity = PollingUnitOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PollingUnitOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], PollingUnitOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PollingUnitOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ward_id', type: 'text' }),
    __metadata("design:type", String)
], PollingUnitOrmEntity.prototype, "wardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ward_orm_entity_1.WardOrmEntity, (ward) => ward.pollingUnits),
    (0, typeorm_1.JoinColumn)({ name: 'ward_id' }),
    __metadata("design:type", ward_orm_entity_1.WardOrmEntity)
], PollingUnitOrmEntity.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lga_id', type: 'text' }),
    __metadata("design:type", String)
], PollingUnitOrmEntity.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lga_orm_entity_1.LgaOrmEntity),
    (0, typeorm_1.JoinColumn)({ name: 'lga_id' }),
    __metadata("design:type", lga_orm_entity_1.LgaOrmEntity)
], PollingUnitOrmEntity.prototype, "lga", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registered_voters', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PollingUnitOrmEntity.prototype, "registeredVoters", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'past_result_apm', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PollingUnitOrmEntity.prototype, "pastResultApm", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'past_result_pdp', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PollingUnitOrmEntity.prototype, "pastResultPdp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'past_result_apc', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PollingUnitOrmEntity.prototype, "pastResultApc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'past_result_other', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PollingUnitOrmEntity.prototype, "pastResultOther", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PollingUnitOrmEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PollingUnitOrmEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'risk_level', type: 'text', default: 'grey' }),
    __metadata("design:type", String)
], PollingUnitOrmEntity.prototype, "riskLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversion_status', type: 'text', default: 'untouched' }),
    __metadata("design:type", String)
], PollingUnitOrmEntity.prototype, "conversionStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_agent_name', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PollingUnitOrmEntity.prototype, "assignedAgentName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_agent_phone', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PollingUnitOrmEntity.prototype, "assignedAgentPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PollingUnitOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], PollingUnitOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PollingUnitOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PollingUnitOrmEntity.prototype, "updatedAt", void 0);
exports.PollingUnitOrmEntity = PollingUnitOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_polling_units')
], PollingUnitOrmEntity);
//# sourceMappingURL=polling-unit.orm-entity.js.map