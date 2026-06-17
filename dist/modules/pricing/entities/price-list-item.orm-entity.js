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
exports.PriceListItemOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const item_orm_entity_1 = require("../../catalog/entities/item.orm-entity");
const price_list_orm_entity_1 = require("./price-list.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let PriceListItemOrmEntity = class PriceListItemOrmEntity {
    id;
    priceList;
    item;
    currencyCode;
    unitPrice;
    startsAt;
    endsAt;
    createdAt;
    updatedAt;
};
exports.PriceListItemOrmEntity = PriceListItemOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PriceListItemOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => price_list_orm_entity_1.PriceListOrmEntity, (priceList) => priceList.items, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'price_list_id' }),
    __metadata("design:type", price_list_orm_entity_1.PriceListOrmEntity)
], PriceListItemOrmEntity.prototype, "priceList", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_orm_entity_1.ItemOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    __metadata("design:type", item_orm_entity_1.ItemOrmEntity)
], PriceListItemOrmEntity.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_code', type: 'text', default: 'NGN' }),
    __metadata("design:type", String)
], PriceListItemOrmEntity.prototype, "currencyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], PriceListItemOrmEntity.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'starts_at', nullable: true }),
    __metadata("design:type", Date)
], PriceListItemOrmEntity.prototype, "startsAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ends_at', nullable: true }),
    __metadata("design:type", Date)
], PriceListItemOrmEntity.prototype, "endsAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PriceListItemOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PriceListItemOrmEntity.prototype, "updatedAt", void 0);
exports.PriceListItemOrmEntity = PriceListItemOrmEntity = __decorate([
    (0, typeorm_1.Entity)('price_list_items'),
    (0, typeorm_1.Unique)('UQ_PRICE_LIST_ITEM', ['priceList', 'item'])
], PriceListItemOrmEntity);
//# sourceMappingURL=price-list-item.orm-entity.js.map