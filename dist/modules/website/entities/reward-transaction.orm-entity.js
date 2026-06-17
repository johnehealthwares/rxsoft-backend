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
exports.RewardTransactionOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let RewardTransactionOrmEntity = class RewardTransactionOrmEntity {
    id;
    userId;
    points;
    type;
    description;
    referenceId;
    createdAt;
};
exports.RewardTransactionOrmEntity = RewardTransactionOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RewardTransactionOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], RewardTransactionOrmEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], RewardTransactionOrmEntity.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], RewardTransactionOrmEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RewardTransactionOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RewardTransactionOrmEntity.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RewardTransactionOrmEntity.prototype, "createdAt", void 0);
exports.RewardTransactionOrmEntity = RewardTransactionOrmEntity = __decorate([
    (0, typeorm_1.Entity)('reward_transactions')
], RewardTransactionOrmEntity);
//# sourceMappingURL=reward-transaction.orm-entity.js.map