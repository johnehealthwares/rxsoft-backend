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
exports.IncidentReportOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let IncidentReportOrmEntity = class IncidentReportOrmEntity {
    id;
    pollingUnitId;
    type;
    description;
    severity;
    reportedBy;
    reportedAt;
    status;
    legalEscalation;
    securityEscalation;
    notes;
    createdAt;
    updatedAt;
};
exports.IncidentReportOrmEntity = IncidentReportOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], IncidentReportOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'polling_unit_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], IncidentReportOrmEntity.prototype, "pollingUnitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], IncidentReportOrmEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], IncidentReportOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'medium' }),
    __metadata("design:type", String)
], IncidentReportOrmEntity.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reported_by', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], IncidentReportOrmEntity.prototype, "reportedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reported_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], IncidentReportOrmEntity.prototype, "reportedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'open' }),
    __metadata("design:type", String)
], IncidentReportOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_escalation', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], IncidentReportOrmEntity.prototype, "legalEscalation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'security_escalation', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], IncidentReportOrmEntity.prototype, "securityEscalation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], IncidentReportOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], IncidentReportOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], IncidentReportOrmEntity.prototype, "updatedAt", void 0);
exports.IncidentReportOrmEntity = IncidentReportOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_incident_reports')
], IncidentReportOrmEntity);
//# sourceMappingURL=incident-report.orm-entity.js.map