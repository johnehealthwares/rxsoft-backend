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
exports.StockBalanceOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const item_orm_entity_1 = require("../../catalog/entities/item.orm-entity");
const stock_adjustment_orm_entity_1 = require("./stock-adjustment.orm-entity");
const stock_location_orm_entity_1 = require("./stock-location.orm-entity");
const stock_lot_orm_entity_1 = require("./stock-lot.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let StockBalanceOrmEntity = class StockBalanceOrmEntity {
    id;
    organizationId;
    item;
    location;
    lot;
    quantityOnHand;
    quantityReserved;
    averageCost;
    reorderMinQty;
    reorderMaxQty;
    adjustments;
    createdAt;
    updatedAt;
};
exports.StockBalanceOrmEntity = StockBalanceOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StockBalanceOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], StockBalanceOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_orm_entity_1.ItemOrmEntity, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    __metadata("design:type", item_orm_entity_1.ItemOrmEntity)
], StockBalanceOrmEntity.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_location_orm_entity_1.StockLocationOrmEntity, (location) => location.stockBalances, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'location_id' }),
    __metadata("design:type", stock_location_orm_entity_1.StockLocationOrmEntity)
], StockBalanceOrmEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_lot_orm_entity_1.StockLotOrmEntity, (lot) => lot.stockBalances, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'lot_id' }),
    __metadata("design:type", Object)
], StockBalanceOrmEntity.prototype, "lot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity_on_hand', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], StockBalanceOrmEntity.prototype, "quantityOnHand", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity_reserved', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], StockBalanceOrmEntity.prototype, "quantityReserved", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'average_cost', type: 'decimal', default: 0, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], StockBalanceOrmEntity.prototype, "averageCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reorder_min_qty', type: 'decimal', nullable: true, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Object)
], StockBalanceOrmEntity.prototype, "reorderMinQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reorder_max_qty', type: 'decimal', nullable: true, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Object)
], StockBalanceOrmEntity.prototype, "reorderMaxQty", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_adjustment_orm_entity_1.StockAdjustmentOrmEntity, (adjustment) => adjustment.stockBalance),
    __metadata("design:type", Array)
], StockBalanceOrmEntity.prototype, "adjustments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StockBalanceOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StockBalanceOrmEntity.prototype, "updatedAt", void 0);
exports.StockBalanceOrmEntity = StockBalanceOrmEntity = __decorate([
    (0, typeorm_1.Entity)('stock_balances'),
    (0, typeorm_1.Unique)('uq_stock_balances_org_location_item_lot', ['organizationId', 'location', 'item', 'lot'])
], StockBalanceOrmEntity);
//# sourceMappingURL=stock-balance.orm-entity.js.map