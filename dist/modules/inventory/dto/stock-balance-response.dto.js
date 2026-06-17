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
exports.StockBalanceResponseDto = exports.StockBalanceLotRefDto = exports.StockBalanceLocationRefDto = exports.StockBalanceItemRefDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StockBalanceItemRefDto {
    id;
    code;
    name;
}
exports.StockBalanceItemRefDto = StockBalanceItemRefDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceItemRefDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceItemRefDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceItemRefDto.prototype, "name", void 0);
class StockBalanceLocationRefDto {
    id;
    name;
}
exports.StockBalanceLocationRefDto = StockBalanceLocationRefDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceLocationRefDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceLocationRefDto.prototype, "name", void 0);
class StockBalanceLotRefDto {
    id;
    code;
}
exports.StockBalanceLotRefDto = StockBalanceLotRefDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceLotRefDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceLotRefDto.prototype, "code", void 0);
class StockBalanceResponseDto {
    id;
    item;
    location;
    lot;
    itemId;
    locationId;
    lotId;
    quantityOnHand;
    quantityReserved;
    averageCost;
    reorderMinQty;
    reorderMaxQty;
}
exports.StockBalanceResponseDto = StockBalanceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StockBalanceItemRefDto }),
    __metadata("design:type", StockBalanceItemRefDto)
], StockBalanceResponseDto.prototype, "item", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StockBalanceLocationRefDto }),
    __metadata("design:type", StockBalanceLocationRefDto)
], StockBalanceResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StockBalanceLotRefDto, nullable: true }),
    __metadata("design:type", Object)
], StockBalanceResponseDto.prototype, "lot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceResponseDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StockBalanceResponseDto.prototype, "locationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], StockBalanceResponseDto.prototype, "lotId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StockBalanceResponseDto.prototype, "quantityOnHand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StockBalanceResponseDto.prototype, "quantityReserved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StockBalanceResponseDto.prototype, "averageCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], StockBalanceResponseDto.prototype, "reorderMinQty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], StockBalanceResponseDto.prototype, "reorderMaxQty", void 0);
//# sourceMappingURL=stock-balance-response.dto.js.map