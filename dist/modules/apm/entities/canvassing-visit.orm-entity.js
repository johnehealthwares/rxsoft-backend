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
exports.CanvassingVisitOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const canvassing_session_orm_entity_1 = require("./canvassing-session.orm-entity");
let CanvassingVisitOrmEntity = class CanvassingVisitOrmEntity {
    id;
    sessionId;
    session;
    name;
    phone;
    address;
    supportLevel;
    issues;
    outcome;
    contactedAt;
    createdAt;
};
exports.CanvassingVisitOrmEntity = CanvassingVisitOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CanvassingVisitOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'session_id', type: 'text' }),
    __metadata("design:type", String)
], CanvassingVisitOrmEntity.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => canvassing_session_orm_entity_1.CanvassingSessionOrmEntity, (s) => s.visits),
    (0, typeorm_1.JoinColumn)({ name: 'session_id' }),
    __metadata("design:type", canvassing_session_orm_entity_1.CanvassingSessionOrmEntity)
], CanvassingVisitOrmEntity.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CanvassingVisitOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CanvassingVisitOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CanvassingVisitOrmEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CanvassingVisitOrmEntity.prototype, "supportLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CanvassingVisitOrmEntity.prototype, "issues", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CanvassingVisitOrmEntity.prototype, "outcome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], CanvassingVisitOrmEntity.prototype, "contactedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CanvassingVisitOrmEntity.prototype, "createdAt", void 0);
exports.CanvassingVisitOrmEntity = CanvassingVisitOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_canvassing_visits')
], CanvassingVisitOrmEntity);
//# sourceMappingURL=canvassing-visit.orm-entity.js.map