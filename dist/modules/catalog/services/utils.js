"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUoms = validateUoms;
const common_1 = require("@nestjs/common");
function validateUoms({ purchaseUom, saleUom, baseUom }) {
    if (!purchaseUom || !saleUom || !baseUom) {
        throw new common_1.BadRequestException("All UOMs must be provided");
    }
    const categoryRef = baseUom.categoryId;
    [purchaseUom, saleUom].forEach(uom => {
        if (uom.categoryId !== categoryRef) {
            throw new common_1.BadRequestException(`${uom.name} is not in the same category as base UoM`);
        }
    });
    if (baseUom.uomType !== "reference" || baseUom.factor !== 1) {
        throw new common_1.BadRequestException(`Base UoM (${baseUom.name}) must be a uomType reference with factor = 1, current uomType - ${baseUom.uomType}, factor - ${baseUom.factor}}`);
    }
    [purchaseUom, saleUom, baseUom].forEach(uom => {
        if (uom.factor <= 0) {
            throw new common_1.BadRequestException(`${uom.name} must have a positive factor`);
        }
    });
    [purchaseUom, saleUom, baseUom].forEach(uom => {
        if (uom.rounding <= 0) {
            throw new common_1.BadRequestException(`${uom.name} must have positive rounding`);
        }
    });
    return true;
}
//# sourceMappingURL=utils.js.map