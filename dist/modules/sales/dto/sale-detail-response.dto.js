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
exports.SaleDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SaleDetailCustomerDto {
    id;
    name;
    phone;
    email;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailCustomerDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailCustomerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailCustomerDto.prototype, "email", void 0);
class SaleDetailCategoryDto {
    id;
    name;
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailCategoryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailCategoryDto.prototype, "name", void 0);
class SaleDetailUomDto {
    id;
    name;
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailUomDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailUomDto.prototype, "name", void 0);
class SaleDetailItemDto {
    id;
    code;
    name;
    category;
    baseUomId;
    saleUomId;
    saleUom;
    baseUom;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailItemDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: SaleDetailCategoryDto }),
    __metadata("design:type", Object)
], SaleDetailItemDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailItemDto.prototype, "baseUomId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailItemDto.prototype, "saleUomId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: SaleDetailUomDto }),
    __metadata("design:type", Object)
], SaleDetailItemDto.prototype, "saleUom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: SaleDetailUomDto }),
    __metadata("design:type", Object)
], SaleDetailItemDto.prototype, "baseUom", void 0);
class SaleDetailLineDto {
    id;
    lineNumber;
    item;
    quantity;
    unitPrice;
    lineTotal;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailLineDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleDetailLineDto.prototype, "lineNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SaleDetailItemDto }),
    __metadata("design:type", SaleDetailItemDto)
], SaleDetailLineDto.prototype, "item", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleDetailLineDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleDetailLineDto.prototype, "unitPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleDetailLineDto.prototype, "lineTotal", void 0);
class SaleDetailPaymentMethodDto {
    id;
    code;
    name;
    methodType;
    isActive;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailPaymentMethodDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SaleDetailPaymentMethodDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailPaymentMethodDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailPaymentMethodDto.prototype, "methodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SaleDetailPaymentMethodDto.prototype, "isActive", void 0);
class SaleDetailPaymentDto {
    id;
    paymentMethod;
    amount;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailPaymentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SaleDetailPaymentMethodDto }),
    __metadata("design:type", SaleDetailPaymentMethodDto)
], SaleDetailPaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleDetailPaymentDto.prototype, "amount", void 0);
class SaleDetailResponseDto {
    id;
    saleNumber;
    saleChannel;
    customer;
    status;
    totalAmount;
    paidAmount;
    lines;
    payments;
    saleDate;
    notes;
}
exports.SaleDetailResponseDto = SaleDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailResponseDto.prototype, "saleNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['pos', 'invoice', 'mobile'] }),
    __metadata("design:type", String)
], SaleDetailResponseDto.prototype, "saleChannel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: SaleDetailCustomerDto }),
    __metadata("design:type", Object)
], SaleDetailResponseDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['draft', 'posted', 'voided', 'refunded'] }),
    __metadata("design:type", String)
], SaleDetailResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleDetailResponseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SaleDetailResponseDto.prototype, "paidAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SaleDetailLineDto] }),
    __metadata("design:type", Array)
], SaleDetailResponseDto.prototype, "lines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SaleDetailPaymentDto] }),
    __metadata("design:type", Array)
], SaleDetailResponseDto.prototype, "payments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SaleDetailResponseDto.prototype, "saleDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], SaleDetailResponseDto.prototype, "notes", void 0);
//# sourceMappingURL=sale-detail-response.dto.js.map