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
exports.StockMovementOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const item_orm_entity_1 = require("../../catalog/entities/item.orm-entity");
const stock_lot_orm_entity_1 = require("./stock-lot.orm-entity");
const stock_location_orm_entity_1 = require("./stock-location.orm-entity");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let StockMovementOrmEntity = class StockMovementOrmEntity {
    id;
    organizationId;
    inventoryDocumentId;
    inventoryDocumentLineId;
    item;
    itemId;
    lot;
    lotId;
    fromLocation;
    fromLocationId;
    toLocation;
    toLocationId;
    movementType;
    quantity;
    unitCost;
    occurredAt;
    createdByUserId;
    createdAt;
};
exports.StockMovementOrmEntity = StockMovementOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StockMovementOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], StockMovementOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'inventory_document_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "inventoryDocumentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'inventory_document_line_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "inventoryDocumentLineId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_orm_entity_1.ItemOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    __metadata("design:type", item_orm_entity_1.ItemOrmEntity)
], StockMovementOrmEntity.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_id', type: 'uuid' }),
    __metadata("design:type", String)
], StockMovementOrmEntity.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_lot_orm_entity_1.StockLotOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'lot_id' }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "lot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lot_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "lotId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_location_orm_entity_1.StockLocationOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'from_location_id' }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "fromLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'from_location_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "fromLocationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_location_orm_entity_1.StockLocationOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'to_location_id' }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "toLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'to_location_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "toLocationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'movement_type', type: 'text' }),
    __metadata("design:type", String)
], StockMovementOrmEntity.prototype, "movementType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Number)
], StockMovementOrmEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_cost', type: 'decimal', nullable: true, precision: 10, scale: 2, transformer: new column_transformer_1.ColumnNumericTransformer() }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "unitCost", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'occurred_at' }),
    __metadata("design:type", Date)
], StockMovementOrmEntity.prototype, "occurredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_user_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StockMovementOrmEntity.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StockMovementOrmEntity.prototype, "createdAt", void 0);
exports.StockMovementOrmEntity = StockMovementOrmEntity = __decorate([
    (0, typeorm_1.Entity)('stock_movements')
], StockMovementOrmEntity);
//# sourceMappingURL=stock-movement.orm-entity.js.map