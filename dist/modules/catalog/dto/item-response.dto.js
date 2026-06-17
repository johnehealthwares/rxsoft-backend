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
exports.ItemResponseDto = exports.ForeignProperty = void 0;
const swagger_1 = require("@nestjs/swagger");
class ForeignProperty {
    id;
    code;
    name;
}
exports.ForeignProperty = ForeignProperty;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ForeignProperty.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], ForeignProperty.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ForeignProperty.prototype, "name", void 0);
class ItemCategoryResponse {
    id;
    code;
    name;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemCategoryResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemCategoryResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemCategoryResponse.prototype, "name", void 0);
class PharmaceuticsResponse {
    code;
    clinicalName;
    drugClass;
    pharmaceutics;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PharmaceuticsResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PharmaceuticsResponse.prototype, "clinicalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PharmaceuticsResponse.prototype, "drugClass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PharmaceuticsResponse.prototype, "pharmaceutics", void 0);
class GenericProductResponse {
    id;
    code;
    name;
    pharmaceutics;
    isPrescriptionRequired;
    isControlledSubstance;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GenericProductResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GenericProductResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GenericProductResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PharmaceuticsResponse }),
    __metadata("design:type", PharmaceuticsResponse)
], GenericProductResponse.prototype, "pharmaceutics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], GenericProductResponse.prototype, "isPrescriptionRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], GenericProductResponse.prototype, "isControlledSubstance", void 0);
class ItemResponseDto {
    id;
    code;
    name;
    categoryId;
    genericProductCode;
    category;
    genericProduct;
    barcode;
    baseUomId;
    purchaseUomId;
    saleUomId;
    saleUom;
    baseUom;
    purchaseUom;
    trackLot;
    trackExpiry;
    shelfLifeDays;
    isActive;
    imageUrl;
    smallImageUrl;
    mediumImageUrl;
    largeImageUrl;
}
exports.ItemResponseDto = ItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemResponseDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "genericProductCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ItemCategoryResponse)
], ItemResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: GenericProductResponse, nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "genericProduct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "barcode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemResponseDto.prototype, "baseUomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "purchaseUomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "saleUomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "saleUom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "baseUom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "purchaseUom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ItemResponseDto.prototype, "trackLot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ItemResponseDto.prototype, "trackExpiry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "shelfLifeDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ItemResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "smallImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "mediumImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], ItemResponseDto.prototype, "largeImageUrl", void 0);
//# sourceMappingURL=item-response.dto.js.map