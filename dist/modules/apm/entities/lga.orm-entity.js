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
exports.LgaOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const ward_orm_entity_1 = require("./ward.orm-entity");
let LgaOrmEntity = class LgaOrmEntity {
    id;
    name;
    code;
    region;
    description;
    displayOrder;
    isActive;
    wards;
    createdAt;
    updatedAt;
};
exports.LgaOrmEntity = LgaOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LgaOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], LgaOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], LgaOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], LgaOrmEntity.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], LgaOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_order', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], LgaOrmEntity.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], LgaOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ward_orm_entity_1.WardOrmEntity, (ward) => ward.lga),
    __metadata("design:type", Array)
], LgaOrmEntity.prototype, "wards", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LgaOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], LgaOrmEntity.prototype, "updatedAt", void 0);
exports.LgaOrmEntity = LgaOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_lgas')
], LgaOrmEntity);
//# sourceMappingURL=lga.orm-entity.js.map