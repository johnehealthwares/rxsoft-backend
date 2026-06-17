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
exports.WhatsAppGroupOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let WhatsAppGroupOrmEntity = class WhatsAppGroupOrmEntity {
    id;
    level;
    name;
    parentId;
    parent;
    description;
    groupLink;
    adminName;
    adminPhone;
    memberCount;
    isActive;
    createdAt;
    updatedAt;
};
exports.WhatsAppGroupOrmEntity = WhatsAppGroupOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WhatsAppGroupOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], WhatsAppGroupOrmEntity.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], WhatsAppGroupOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], WhatsAppGroupOrmEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => WhatsAppGroupOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Object)
], WhatsAppGroupOrmEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], WhatsAppGroupOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'group_link', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], WhatsAppGroupOrmEntity.prototype, "groupLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admin_name', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], WhatsAppGroupOrmEntity.prototype, "adminName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admin_phone', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], WhatsAppGroupOrmEntity.prototype, "adminPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], WhatsAppGroupOrmEntity.prototype, "memberCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], WhatsAppGroupOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WhatsAppGroupOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], WhatsAppGroupOrmEntity.prototype, "updatedAt", void 0);
exports.WhatsAppGroupOrmEntity = WhatsAppGroupOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_whatsapp_groups')
], WhatsAppGroupOrmEntity);
//# sourceMappingURL=whatsapp-group.orm-entity.js.map