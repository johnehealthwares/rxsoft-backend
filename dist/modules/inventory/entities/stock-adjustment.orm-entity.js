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
exports.StockAdjustmentOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let StockAdjustmentOrmEntity = class StockAdjustmentOrmEntity {
    id;
    stockBalance;
    reason;
    deltaQuantity;
    performedByUserId;
    performedAt;
    createdAt;
};
exports.StockAdjustmentOrmEntity = StockAdjustmentOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StockAdjustmentOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('StockBalanceOrmEntity', 'adjustments', {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'stock_balance_id' }),
    __metadata("design:type", Function)
], StockAdjustmentOrmEntity.prototype, "stockBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], StockAdjustmentOrmEntity.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delta_quantity', type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], StockAdjustmentOrmEntity.prototype, "deltaQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'performed_by_user_id', type: 'text' }),
    __metadata("design:type", String)
], StockAdjustmentOrmEntity.prototype, "performedByUserId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'performed_at' }),
    __metadata("design:type", Date)
], StockAdjustmentOrmEntity.prototype, "performedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StockAdjustmentOrmEntity.prototype, "createdAt", void 0);
exports.StockAdjustmentOrmEntity = StockAdjustmentOrmEntity = __decorate([
    (0, typeorm_1.Entity)('stock_adjustments')
], StockAdjustmentOrmEntity);
//# sourceMappingURL=stock-adjustment.orm-entity.js.map