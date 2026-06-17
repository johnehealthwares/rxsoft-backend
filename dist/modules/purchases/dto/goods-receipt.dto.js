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
exports.GoodsReceiptResponseDto = exports.GoodsReceiptLineResponseDto = exports.ReceiveGoodsDto = exports.ReceiveGoodsLineDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ReceiveGoodsLineDto {
    itemId;
    receivedQty;
    unitCost;
    uomId;
}
exports.ReceiveGoodsLineDto = ReceiveGoodsLineDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveGoodsLineDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.001),
    __metadata("design:type", Number)
], ReceiveGoodsLineDto.prototype, "receivedQty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ReceiveGoodsLineDto.prototype, "unitCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveGoodsLineDto.prototype, "uomId", void 0);
class ReceiveGoodsDto {
    purchaseOrderId;
    receivedDate;
    receiptNumber;
    note;
    lines;
}
exports.ReceiveGoodsDto = ReceiveGoodsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveGoodsDto.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ReceiveGoodsDto.prototype, "receivedDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveGoodsDto.prototype, "receiptNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReceiveGoodsDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReceiveGoodsLineDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ReceiveGoodsLineDto),
    __metadata("design:type", Array)
], ReceiveGoodsDto.prototype, "lines", void 0);
class GoodsReceiptLineResponseDto {
    id;
    itemId;
    receivedQty;
    unitCost;
    uomId;
}
exports.GoodsReceiptLineResponseDto = GoodsReceiptLineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GoodsReceiptLineResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GoodsReceiptLineResponseDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GoodsReceiptLineResponseDto.prototype, "receivedQty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GoodsReceiptLineResponseDto.prototype, "unitCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GoodsReceiptLineResponseDto.prototype, "uomId", void 0);
class GoodsReceiptResponseDto {
    id;
    receiptNumber;
    purchaseOrderId;
    receivedDate;
    note;
    lines;
}
exports.GoodsReceiptResponseDto = GoodsReceiptResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GoodsReceiptResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GoodsReceiptResponseDto.prototype, "receiptNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GoodsReceiptResponseDto.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GoodsReceiptResponseDto.prototype, "receivedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], GoodsReceiptResponseDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [GoodsReceiptLineResponseDto] }),
    __metadata("design:type", Array)
], GoodsReceiptResponseDto.prototype, "lines", void 0);
//# sourceMappingURL=goods-receipt.dto.js.map