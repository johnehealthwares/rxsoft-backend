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
exports.AuditLogOrmEntity = void 0;
const typeorm_1 = require("typeorm");
class AuditLogOrmEntity {
    id;
    organizationId;
    actorUserId;
    action;
    resource;
    resourceId;
    details;
    occurredAt;
}
exports.AuditLogOrmEntity = AuditLogOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'uuid' }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actor_user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "actorUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'resource_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'details', type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'occurred_at' }),
    __metadata("design:type", Date)
], AuditLogOrmEntity.prototype, "occurredAt", void 0);
//# sourceMappingURL=audit-log.orm-entity.js.map