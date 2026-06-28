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
exports.UpdatePaymentMethodDto = exports.CreatePaymentMethodDto = exports.ListPaymentMethodsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const list_query_dto_1 = require("../../../shared/dto/list-query.dto");
class ListPaymentMethodsDto extends list_query_dto_1.ListQueryDto {
}
exports.ListPaymentMethodsDto = ListPaymentMethodsDto;
class CreatePaymentMethodDto {
    code;
    name;
    methodType;
    isActive;
    overrideCodeValidation;
}
exports.CreatePaymentMethodDto = CreatePaymentMethodDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentMethodDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentMethodDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['cash', 'card', 'transfer', 'wallet', 'insurance'] }),
    (0, class_validator_1.IsIn)(['cash', 'card', 'transfer', 'wallet', 'insurance']),
    __metadata("design:type", String)
], CreatePaymentMethodDto.prototype, "methodType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePaymentMethodDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePaymentMethodDto.prototype, "overrideCodeValidation", void 0);
class UpdatePaymentMethodDto {
    code;
    name;
    methodType;
    isActive;
}
exports.UpdatePaymentMethodDto = UpdatePaymentMethodDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePaymentMethodDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePaymentMethodDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['cash', 'card', 'transfer', 'wallet', 'insurance'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['cash', 'card', 'transfer', 'wallet', 'insurance']),
    __metadata("design:type", String)
], UpdatePaymentMethodDto.prototype, "methodType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePaymentMethodDto.prototype, "isActive", void 0);
//# sourceMappingURL=payment-methods.dto.js.map