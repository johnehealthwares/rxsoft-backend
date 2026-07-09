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
exports.UomOrmEntity = void 0;
const column_transformer_1 = require("../../../shared/utils/column-transformer");
const typeorm_1 = require("typeorm");
let UomOrmEntity = class UomOrmEntity {
    id;
    organizationId;
    categoryId;
    category;
    code;
    name;
    uomType;
    factor;
    rounding;
    isActive;
    createdAt;
    updatedAt;
};
exports.UomOrmEntity = UomOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UomOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], UomOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], UomOrmEntity.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('UomCategoryOrmEntity', { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Object)
], UomOrmEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], UomOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UomOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uom_type', type: 'text', default: 'reference' }),
    __metadata("design:type", String)
], UomOrmEntity.prototype, "uomType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', default: 1, precision: 10,
        scale: 2,
        transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], UomOrmEntity.prototype, "factor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', default: 0.01, precision: 10,
        scale: 3,
        transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], UomOrmEntity.prototype, "rounding", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], UomOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UomOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UomOrmEntity.prototype, "updatedAt", void 0);
exports.UomOrmEntity = UomOrmEntity = __decorate([
    (0, typeorm_1.Entity)('uoms')
], UomOrmEntity);
//# sourceMappingURL=uom.orm-entity.js.map