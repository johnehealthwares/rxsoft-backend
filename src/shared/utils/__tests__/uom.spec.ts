import { convertUomQuantity, uomEffectiveFactor } from '../uom';

describe('uom conversion helpers', () => {
  describe('uomEffectiveFactor', () => {
    it('routes smaller units through 1/factor and the rest through factor', () => {
      expect(uomEffectiveFactor({ uomType: 'reference', factor: 1 })).toBe(1);
      expect(uomEffectiveFactor({ uomType: 'bigger', factor: 10 })).toBe(10);
      expect(uomEffectiveFactor({ uomType: 'smaller', factor: 10 })).toBe(0.1);
    });

    it('defaults to 1 for missing/zero/negative factors', () => {
      expect(uomEffectiveFactor(null)).toBe(1);
      expect(uomEffectiveFactor({ uomType: 'bigger', factor: 0 })).toBe(1);
      expect(uomEffectiveFactor({ uomType: 'bigger', factor: NaN })).toBe(1);
    });
  });

  describe('convertUomQuantity', () => {
    it('is identity when from === to', () => {
      const uom = { uomType: 'bigger', factor: 10 };
      expect(convertUomQuantity(5, uom, uom)).toBe(5);
    });

    it('converts between bigger and reference via the reference', () => {
      // 2 boxes @ factor 10 → 20 reference units
      expect(convertUomQuantity(2, { uomType: 'bigger', factor: 10 }, { uomType: 'reference', factor: 1 })).toBe(20);
      // 20 reference units → 2 boxes
      expect(convertUomQuantity(20, { uomType: 'reference', factor: 1 }, { uomType: 'bigger', factor: 10 })).toBe(2);
    });

    it('converts from a non-1 base UOM (base = bigger factor 10)', () => {
      const base = { uomType: 'bigger', factor: 10 };
      // 30 smaller units (factor 10 → 3 reference) → base units = 3 / 10 = 0.3
      expect(convertUomQuantity(30, { uomType: 'smaller', factor: 10 }, base)).toBe(0.3);
      // 2 base units → reference = 20
      expect(convertUomQuantity(2, base, { uomType: 'reference', factor: 1 })).toBe(20);
    });

    it('passes through when either uom is missing', () => {
      expect(convertUomQuantity(7, null, { uomType: 'reference', factor: 1 })).toBe(7);
      expect(convertUomQuantity(7, { uomType: 'reference', factor: 1 }, null)).toBe(7);
    });
  });
});