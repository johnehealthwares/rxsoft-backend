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
exports.OrganisationConfigOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let OrganisationConfigOrmEntity = class OrganisationConfigOrmEntity {
    id;
    organizationId;
    posHeader;
    defaultLoginTimeoutMinutes;
    defaultAllowPos;
    defaultAllowA4Print;
    createdAt;
    updatedAt;
};
exports.OrganisationConfigOrmEntity = OrganisationConfigOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrganisationConfigOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'uuid' }),
    __metadata("design:type", String)
], OrganisationConfigOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pos_header', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], OrganisationConfigOrmEntity.prototype, "posHeader", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_login_timeout_minutes', type: 'int', default: 480 }),
    __metadata("design:type", Number)
], OrganisationConfigOrmEntity.prototype, "defaultLoginTimeoutMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_allow_pos', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], OrganisationConfigOrmEntity.prototype, "defaultAllowPos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_allow_a4_print', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OrganisationConfigOrmEntity.prototype, "defaultAllowA4Print", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OrganisationConfigOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], OrganisationConfigOrmEntity.prototype, "updatedAt", void 0);
exports.OrganisationConfigOrmEntity = OrganisationConfigOrmEntity = __decorate([
    (0, typeorm_1.Entity)('organisation_configs'),
    (0, typeorm_1.Unique)('uq_organisation_configs_org', ['organizationId'])
], OrganisationConfigOrmEntity);
//# sourceMappingURL=organisation-config.orm-entity.js.map