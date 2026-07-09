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
exports.ItemOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const item_category_orm_entity_1 = require("./item-category.orm-entity");
const uom_orm_entity_1 = require("../../sales/entities/uom.orm-entity");
let ItemOrmEntity = class ItemOrmEntity {
    id;
    organizationId;
    code;
    name;
    category;
    genericProductCode;
    baseUomId;
    baseUom;
    purchaseUomId;
    purchaseUom;
    saleUomId;
    saleUom;
    barcode;
    trackLot;
    trackExpiry;
    shelfLifeDays;
    isActive;
    imageUrl;
    smallImageUrl;
    mediumImageUrl;
    largeImageUrl;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.ItemOrmEntity = ItemOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ItemOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], ItemOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ItemOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ItemOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_category_orm_entity_1.ItemCategoryOrmEntity, (category) => category.items, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id', }),
    __metadata("design:type", item_category_orm_entity_1.ItemCategoryOrmEntity)
], ItemOrmEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'generic_product_code', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "genericProductCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_uom_id', type: 'text' }),
    __metadata("design:type", String)
], ItemOrmEntity.prototype, "baseUomId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => uom_orm_entity_1.UomOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'base_uom_id' }),
    __metadata("design:type", uom_orm_entity_1.UomOrmEntity)
], ItemOrmEntity.prototype, "baseUom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_uom_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "purchaseUomId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => uom_orm_entity_1.UomOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'purchase_uom_id' }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "purchaseUom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sale_uom_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "saleUomId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => uom_orm_entity_1.UomOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'sale_uom_id' }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "saleUom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'track_lot', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ItemOrmEntity.prototype, "trackLot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'track_expiry', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ItemOrmEntity.prototype, "trackExpiry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shelf_life_days', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "shelfLifeDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ItemOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'small_image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "smallImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'medium_image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "mediumImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'large_image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "largeImageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ItemOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ItemOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], ItemOrmEntity.prototype, "deletedAt", void 0);
exports.ItemOrmEntity = ItemOrmEntity = __decorate([
    (0, typeorm_1.Entity)('items'),
    (0, typeorm_1.Unique)('uq_items_org_code', ['organizationId', 'code']),
    (0, typeorm_1.Unique)('uq_items_org_barcode', ['organizationId', 'barcode'])
], ItemOrmEntity);
//# sourceMappingURL=item.orm-entity.js.map