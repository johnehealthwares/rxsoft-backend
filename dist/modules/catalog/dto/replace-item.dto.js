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
exports.ReplaceItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ReplaceItemDto {
    code;
    name;
    categoryId;
    genericProductCode;
    baseUomId;
    purchaseUomId;
    saleUomId;
    barcode;
    trackLot;
    trackExpiry;
    shelfLifeDays;
    isActive;
    imageUrl;
    smallImageUrl;
    mediumImageUrl;
    largeImageUrl;
    overrideCodeValidation;
    priceListItems;
    stockItems;
}
exports.ReplaceItemDto = ReplaceItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PCM001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Paracetamol 500mg Tablet' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2f9e3c8a-7fb2-4f43-98b7-5f2a0d4f9021' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'GEN001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "genericProductCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8f6c4d74-607a-4d90-96f5-4aa6f4a32b31' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "baseUomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8f6c4d74-607a-4d90-96f5-4aa6f4a32b31' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "purchaseUomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8f6c4d74-607a-4d90-96f5-4aa6f4a32b31' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "saleUomId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1234567890123' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "barcode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReplaceItemDto.prototype, "trackLot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReplaceItemDto.prototype, "trackExpiry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 730 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReplaceItemDto.prototype, "shelfLifeDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReplaceItemDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "smallImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "mediumImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceItemDto.prototype, "largeImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ReplaceItemDto.prototype, "overrideCodeValidation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ReplaceItemDto.prototype, "priceListItems", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ReplaceItemDto.prototype, "stockItems", void 0);
//# sourceMappingURL=replace-item.dto.js.map