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
exports.PermissionModuleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ActionDto {
    name;
    label;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActionDto.prototype, "label", void 0);
class FeatureDto {
    resource;
    label;
    actions;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeatureDto.prototype, "resource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeatureDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ActionDto] }),
    __metadata("design:type", Array)
], FeatureDto.prototype, "actions", void 0);
class PermissionModuleResponseDto {
    id;
    name;
    features;
}
exports.PermissionModuleResponseDto = PermissionModuleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PermissionModuleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PermissionModuleResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FeatureDto] }),
    __metadata("design:type", Array)
], PermissionModuleResponseDto.prototype, "features", void 0);
//# sourceMappingURL=permission-module-response.dto.js.map