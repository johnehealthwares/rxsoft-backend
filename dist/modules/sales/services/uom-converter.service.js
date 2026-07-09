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
exports.UomConverterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uom_orm_entity_1 = require("../entities/uom.orm-entity");
function getEffectiveFactor(uom) {
    return uom.uomType === 'smaller' ? 1 / uom.factor : uom.factor;
}
let UomConverterService = class UomConverterService {
    uomRepo;
    constructor(uomRepo) {
        this.uomRepo = uomRepo;
    }
    async convert(quantity, fromUomId, toUomId) {
        if (fromUomId === toUomId)
            return quantity;
        const [fromUom, toUom] = await Promise.all([
            this.uomRepo.findOneByOrFail({ id: fromUomId }),
            this.uomRepo.findOneByOrFail({ id: toUomId }),
        ]);
        if (fromUom.categoryId !== toUom.categoryId) {
            throw new common_1.BadRequestException(`UOM "${fromUom.name}" (category: ${fromUom.categoryId}) and "${toUom.name}" (category: ${toUom.categoryId}) are not in the same category`);
        }
        const fromEffective = getEffectiveFactor(fromUom);
        const toEffective = getEffectiveFactor(toUom);
        const inReference = quantity * fromEffective;
        return Number((inReference / toEffective).toFixed(4));
    }
    async convertToBaseUom(quantity, uomId, baseUomId) {
        return this.convert(quantity, uomId, baseUomId);
    }
    async convertFromBaseUom(quantity, targetUomId, baseUomId) {
        return this.convert(quantity, baseUomId, targetUomId);
    }
};
exports.UomConverterService = UomConverterService;
exports.UomConverterService = UomConverterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(uom_orm_entity_1.UomOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UomConverterService);
//# sourceMappingURL=uom-converter.service.js.map