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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApmDataController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const apm_conversion_service_1 = require("../services/apm-conversion.service");
let ApmDataController = class ApmDataController {
    conversionService;
    constructor(conversionService) {
        this.conversionService = conversionService;
    }
    listLgas() {
        return this.conversionService.listLgas();
    }
    getLga(id) {
        return this.conversionService.getLga(id);
    }
    listWards(lgaId) {
        return this.conversionService.listWards(lgaId);
    }
    getWard(id) {
        return this.conversionService.getWard(id);
    }
    listPollingUnits(wardId) {
        return this.conversionService.listPollingUnits(wardId);
    }
    getPollingUnit(id) {
        return this.conversionService.getPollingUnit(id);
    }
    searchPollingUnits(query) {
        return this.conversionService.searchPollingUnits(query);
    }
};
exports.ApmDataController = ApmDataController;
__decorate([
    (0, common_1.Get)('lgas'),
    (0, swagger_1.ApiOperation)({ summary: 'List all LGAs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApmDataController.prototype, "listLgas", null);
__decorate([
    (0, common_1.Get)('lgas/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get LGA by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmDataController.prototype, "getLga", null);
__decorate([
    (0, common_1.Get)('lgas/:lgaId/wards'),
    (0, swagger_1.ApiOperation)({ summary: 'List wards in an LGA' }),
    __param(0, (0, common_1.Param)('lgaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmDataController.prototype, "listWards", null);
__decorate([
    (0, common_1.Get)('wards/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ward by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmDataController.prototype, "getWard", null);
__decorate([
    (0, common_1.Get)('wards/:wardId/polling-units'),
    (0, swagger_1.ApiOperation)({ summary: 'List polling units in a ward' }),
    __param(0, (0, common_1.Param)('wardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmDataController.prototype, "listPollingUnits", null);
__decorate([
    (0, common_1.Get)('polling-units/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get polling unit by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmDataController.prototype, "getPollingUnit", null);
__decorate([
    (0, common_1.Get)('polling-units/search/:query'),
    (0, swagger_1.ApiOperation)({ summary: 'Search polling units' }),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApmDataController.prototype, "searchPollingUnits", null);
exports.ApmDataController = ApmDataController = __decorate([
    (0, swagger_1.ApiTags)('apm-data'),
    (0, common_1.Controller)('apm/data'),
    __metadata("design:paramtypes", [apm_conversion_service_1.ApmConversionService])
], ApmDataController);
//# sourceMappingURL=apm-data.controller.js.map