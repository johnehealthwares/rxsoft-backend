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
exports.StockLotOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let StockLotOrmEntity = class StockLotOrmEntity {
    id;
    organizationId;
    code;
    stockBalances;
    createdAt;
    updatedAt;
};
exports.StockLotOrmEntity = StockLotOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StockLotOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'text' }),
    __metadata("design:type", String)
], StockLotOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], StockLotOrmEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('StockBalanceOrmEntity', 'lot'),
    __metadata("design:type", Array)
], StockLotOrmEntity.prototype, "stockBalances", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StockLotOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StockLotOrmEntity.prototype, "updatedAt", void 0);
exports.StockLotOrmEntity = StockLotOrmEntity = __decorate([
    (0, typeorm_1.Entity)('stock_lots'),
    (0, typeorm_1.Unique)('uq_stock_lots_org_code', ['organizationId', 'code'])
], StockLotOrmEntity);
//# sourceMappingURL=stock-lot.orm-entity.js.map