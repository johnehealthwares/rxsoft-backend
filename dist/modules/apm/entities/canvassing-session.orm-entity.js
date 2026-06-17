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
exports.CanvassingSessionOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const canvassing_visit_orm_entity_1 = require("./canvassing-visit.orm-entity");
let CanvassingSessionOrmEntity = class CanvassingSessionOrmEntity {
    id;
    title;
    lgaId;
    wardId;
    teamLead;
    teamSize;
    status;
    scheduledDate;
    completedDate;
    notes;
    visits;
    createdAt;
    updatedAt;
};
exports.CanvassingSessionOrmEntity = CanvassingSessionOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CanvassingSessionOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CanvassingSessionOrmEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lga_id', type: 'text' }),
    __metadata("design:type", String)
], CanvassingSessionOrmEntity.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ward_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CanvassingSessionOrmEntity.prototype, "wardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'team_lead', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CanvassingSessionOrmEntity.prototype, "teamLead", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'team_size', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], CanvassingSessionOrmEntity.prototype, "teamSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'planned' }),
    __metadata("design:type", String)
], CanvassingSessionOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], CanvassingSessionOrmEntity.prototype, "scheduledDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], CanvassingSessionOrmEntity.prototype, "completedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CanvassingSessionOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => canvassing_visit_orm_entity_1.CanvassingVisitOrmEntity, (visit) => visit.session),
    __metadata("design:type", Array)
], CanvassingSessionOrmEntity.prototype, "visits", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CanvassingSessionOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CanvassingSessionOrmEntity.prototype, "updatedAt", void 0);
exports.CanvassingSessionOrmEntity = CanvassingSessionOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_canvassing_sessions')
], CanvassingSessionOrmEntity);
//# sourceMappingURL=canvassing-session.orm-entity.js.map