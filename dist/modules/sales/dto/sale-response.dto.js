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
exports.SaleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SaleResponseDto {
    id;
    saleNumber;
    saleChannel;
    storeId;
    storeName;
    status;
    totalAmount;
    paidAmount;
    changeAmount;
    saleDate;
}
exports.SaleResponseDto = SaleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleResponseDto.prototype, "saleNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['pos', 'invoice', 'mobile'] }),
    __metadata("design:type", String)
], SaleResponseDto.prototype, "saleChannel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleResponseDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], SaleResponseDto.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['draft', 'posted', 'voided', 'refunded'] }),
    __metadata("design:type", String)
], SaleResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleResponseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleResponseDto.prototype, "paidAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleResponseDto.prototype, "changeAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleResponseDto.prototype, "saleDate", void 0);
//# sourceMappingURL=sale-response.dto.js.map