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
let AuditLogOrmEntity = class AuditLogOrmEntity {
    id;
    organizationId;
    actorUserId;
    actorUsername;
    action;
    httpMethod;
    httpPath;
    statusCode;
    durationMs;
    ipAddress;
    userAgent;
    metadata;
    createdAt;
};
exports.AuditLogOrmEntity = AuditLogOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, name: 'organization_id' }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, name: 'actor_user_id' }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "actorUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 120, nullable: true, name: 'actor_username' }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "actorUsername", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, name: 'http_method' }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "httpMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'http_path' }),
    __metadata("design:type", String)
], AuditLogOrmEntity.prototype, "httpPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'status_code' }),
    __metadata("design:type", Number)
], AuditLogOrmEntity.prototype, "statusCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'duration_ms' }),
    __metadata("design:type", Number)
], AuditLogOrmEntity.prototype, "durationMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 80, nullable: true, name: 'ip_address' }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, name: 'user_agent' }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], AuditLogOrmEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AuditLogOrmEntity.prototype, "createdAt", void 0);
exports.AuditLogOrmEntity = AuditLogOrmEntity = __decorate([
    (0, typeorm_1.Entity)('audit_logs')
], AuditLogOrmEntity);
//# sourceMappingURL=audit-log.orm-entity.js.map