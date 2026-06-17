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
exports.UserPosConfigOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const user_orm_entity_1 = require("../../identity/entities/user.orm-entity");
const stock_location_orm_entity_1 = require("../../inventory/entities/stock-location.orm-entity");
let UserPosConfigOrmEntity = class UserPosConfigOrmEntity {
    id;
    user;
    userId;
    organizationId;
    stockLocation;
    stockLocationId;
    storeId;
    allowA4Print;
    allowPos;
    loginTimeoutMinutes;
    createdAt;
    updatedAt;
};
exports.UserPosConfigOrmEntity = UserPosConfigOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserPosConfigOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_orm_entity_1.UserOrmEntity)
], UserPosConfigOrmEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], UserPosConfigOrmEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', type: 'uuid' }),
    __metadata("design:type", String)
], UserPosConfigOrmEntity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_location_orm_entity_1.StockLocationOrmEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'stock_location_id' }),
    __metadata("design:type", Object)
], UserPosConfigOrmEntity.prototype, "stockLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock_location_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], UserPosConfigOrmEntity.prototype, "stockLocationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], UserPosConfigOrmEntity.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'allow_a4_print', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserPosConfigOrmEntity.prototype, "allowA4Print", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'allow_pos', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], UserPosConfigOrmEntity.prototype, "allowPos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'login_timeout_minutes', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], UserPosConfigOrmEntity.prototype, "loginTimeoutMinutes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserPosConfigOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UserPosConfigOrmEntity.prototype, "updatedAt", void 0);
exports.UserPosConfigOrmEntity = UserPosConfigOrmEntity = __decorate([
    (0, typeorm_1.Entity)('user_pos_configs'),
    (0, typeorm_1.Unique)('uq_user_pos_configs_user', ['userId'])
], UserPosConfigOrmEntity);
//# sourceMappingURL=user-pos-config.orm-entity.js.map