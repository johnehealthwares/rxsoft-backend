export type UomFactorInfo = {
  uomType?: string | null;
  factor?: number | null;
  id?: string;
};

// Multiplier that converts 1 unit of `uom` into category-reference units. The
// reference UOM of a category has factor 1 (uomType "reference"); conversions
// always route through the reference, so the base UOM may itself be any UOM.
export function uomEffectiveFactor(uom: UomFactorInfo | null | undefined): number {
  if (!uom) return 1;
  const factor = Number(uom.factor ?? 1);
  if (!Number.isFinite(factor) || factor <= 0) return 1;
  return uom.uomType === 'smaller' ? 1 / factor : factor;
}

// Converts `quantity` expressed in `fromUom` into `toUom` units, routing through
// the category reference. Falls back to pass-through when either UOM is missing.
export function convertUomQuantity(
  quantity: number,
  fromUom: UomFactorInfo | null | undefined,
  toUom: UomFactorInfo | null | undefined,
): number {
  if (!fromUom || !toUom || !Number.isFinite(quantity)) {
    return quantity;
  }
  const from = uomEffectiveFactor(fromUom);
  const to = uomEffectiveFactor(toUom);
  return Number(((quantity * from) / to).toFixed(4));
}