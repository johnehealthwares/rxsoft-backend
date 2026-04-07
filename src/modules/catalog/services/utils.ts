import { BadRequestException } from "@nestjs/common";

export function validateUoms({ purchaseUom, saleUom, baseUom }) {
  if (!purchaseUom || !saleUom || !baseUom) {
    throw new BadRequestException("All UOMs must be provided");
  }

  // 1. All UOMs must belong to the same category (same category reference)
  const categoryRef = baseUom.categoryId;
  [purchaseUom, saleUom].forEach(uom => {
    if (uom.categoryId !== categoryRef) {
      throw new BadRequestException(`${uom.name} is not in the same category as base UoM`);
    }
  });

  // 2. Base UOM must be reference
  console.log({baseUom})
  if (baseUom.uomType !== "reference" || baseUom.factor !== 1) {
    throw new BadRequestException(`Base UoM (${baseUom.name}) must be a uomType reference with factor = 1, current uomType - ${baseUom.uomType}, factor - ${baseUom.factor}}`);
  }

  // 3. Factors must be positive
  [purchaseUom, saleUom, baseUom].forEach(uom => {
    if (uom.factor <= 0) {
      throw new BadRequestException(`${uom.name} must have a positive factor`);
    }
  });

  // 4. Rounding must be positive
  [purchaseUom, saleUom, baseUom].forEach(uom => {
    if (uom.rounding <= 0) {
      throw new BadRequestException(`${uom.name} must have positive rounding`);
    }
  });

  return true; // valid
}