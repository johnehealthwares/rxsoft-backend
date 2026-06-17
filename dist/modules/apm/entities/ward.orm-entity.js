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
exports.WardOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const lga_orm_entity_1 = require("./lga.orm-entity");
const polling_unit_orm_entity_1 = require("./polling-unit.orm-entity");
let WardOrmEntity = class WardOrmEntity {
    id;
    name;
    code;
    lgaId;
    lga;
    description;
    displayOrder;
    isActive;
    pollingUnits;
    createdAt;
    updatedAt;
};
exports.WardOrmEntity = WardOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WardOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], WardOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], WardOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lga_id', type: 'text' }),
    __metadata("design:type", String)
], WardOrmEntity.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lga_orm_entity_1.LgaOrmEntity, (lga) => lga.wards),
    (0, typeorm_1.JoinColumn)({ name: 'lga_id' }),
    __metadata("design:type", lga_orm_entity_1.LgaOrmEntity)
], WardOrmEntity.prototype, "lga", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], WardOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_order', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], WardOrmEntity.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], WardOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => polling_unit_orm_entity_1.PollingUnitOrmEntity, (pu) => pu.ward),
    __metadata("design:type", Array)
], WardOrmEntity.prototype, "pollingUnits", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WardOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], WardOrmEntity.prototype, "updatedAt", void 0);
exports.WardOrmEntity = WardOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_wards')
], WardOrmEntity);
//# sourceMappingURL=ward.orm-entity.js.map