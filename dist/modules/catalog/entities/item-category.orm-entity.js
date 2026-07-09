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
exports.ItemCategoryOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
let ItemCategoryOrmEntity = class ItemCategoryOrmEntity {
    id;
    organizationId;
    parent;
    children;
    code;
    name;
    items;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.ItemCategoryOrmEntity = ItemCategoryOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ItemCategoryOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'uuid', default: persistence_scope_1.DEFAULT_ORGANIZATION_ID }),
    __metadata("design:type", String)
], ItemCategoryOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ItemCategoryOrmEntity, (parent) => parent.children, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Object)
], ItemCategoryOrmEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ItemCategoryOrmEntity, (child) => child.parent),
    __metadata("design:type", Array)
], ItemCategoryOrmEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ItemCategoryOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ItemCategoryOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('ItemOrmEntity', 'category'),
    __metadata("design:type", Array)
], ItemCategoryOrmEntity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ItemCategoryOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ItemCategoryOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], ItemCategoryOrmEntity.prototype, "deletedAt", void 0);
exports.ItemCategoryOrmEntity = ItemCategoryOrmEntity = __decorate([
    (0, typeorm_1.Entity)('item_categories'),
    (0, typeorm_1.Unique)('uq_product_categories_org_code', ['organizationId', 'code'])
], ItemCategoryOrmEntity);
//# sourceMappingURL=item-category.orm-entity.js.map