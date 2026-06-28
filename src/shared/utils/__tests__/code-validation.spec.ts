import { parseCode, generateNextCode, validateSequentialCode } from '../code-validation';

describe('parseCode', () => {
  it('extracts prefix and numeric portion from a standard code', () => {
    const result = parseCode('PD000032');
    expect(result).toEqual({ prefix: 'PD', numberPart: '000032', numericValue: 32 });
  });

  it('extracts prefix and numeric portion from PO code', () => {
    const result = parseCode('PO000154');
    expect(result).toEqual({ prefix: 'PO', numberPart: '000154', numericValue: 154 });
  });

  it('extracts prefix and numeric portion from INV code', () => {
    const result = parseCode('INV000012');
    expect(result).toEqual({ prefix: 'INV', numberPart: '000012', numericValue: 12 });
  });

  it('returns null for a semantic code without trailing digits', () => {
    expect(parseCode('super_admin')).toBeNull();
  });

  it('returns null for a code with only digits', () => {
    expect(parseCode('123456')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseCode('')).toBeNull();
  });

  it('handles single-letter prefix', () => {
    const result = parseCode('A001');
    expect(result).toEqual({ prefix: 'A', numberPart: '001', numericValue: 1 });
  });

  it('handles multi-prefix code like GR-000001 (no dash pattern)', () => {
    expect(parseCode('GR000001')).toEqual({ prefix: 'GR', numberPart: '000001', numericValue: 1 });
  });
});

describe('generateNextCode', () => {
  it('increments numeric portion preserving leading zeros', () => {
    expect(generateNextCode('PD000032')).toBe('PD000033');
  });

  it('handles rollover to next digit group', () => {
    expect(generateNextCode('PD000099')).toBe('PD000100');
  });

  it('handles single digit number portion', () => {
    expect(generateNextCode('A1')).toBe('A2');
  });

  it('returns null for semantic code without digits', () => {
    expect(generateNextCode('super_admin')).toBeNull();
  });
});

describe('validateSequentialCode', () => {
  describe('valid sequential codes', () => {
    it('accepts code that matches expected next code', () => {
      const result = validateSequentialCode({
        providedCode: 'PD000033',
        lastCode: 'PD000032',
      });
      expect(result.valid).toBe(true);
      expect(result.expectedCode).toBe('PD000033');
    });

    it('accepts when lastCode matches providedCode (first record edge case)', () => {
      const result = validateSequentialCode({
        providedCode: 'PD000001',
        lastCode: 'PD000001',
      });
      expect(result.valid).toBe(false);
      expect(result.expectedCode).toBe('PD000002');
    });
  });

  describe('invalid codes', () => {
    it('rejects code that does not match expected next code', () => {
      const result = validateSequentialCode({
        providedCode: 'PD000099',
        lastCode: 'PD000032',
      });
      expect(result.valid).toBe(false);
      expect(result.expectedCode).toBe('PD000033');
    });

    it('provides clear expected code in result', () => {
      const result = validateSequentialCode({
        providedCode: 'PO000999',
        lastCode: 'PO000154',
      });
      expect(result.valid).toBe(false);
      expect(result.expectedCode).toBe('PO000155');
    });
  });

  describe('leading zero preservation', () => {
    it('preserves 6-digit zero padding', () => {
      const result = generateNextCode('INV000099');
      expect(result).toBe('INV000100');
    });

    it('preserves 3-digit zero padding', () => {
      const result = generateNextCode('ABC001');
      expect(result).toBe('ABC002');
    });

    it('preserves 2-digit zero padding', () => {
      const result = generateNextCode('GR01');
      expect(result).toBe('GR02');
    });
  });

  describe('first-record scenarios', () => {
    it('accepts any code when no lastCode exists', () => {
      const result = validateSequentialCode({
        providedCode: 'PD000001',
      });
      expect(result.valid).toBe(true);
      expect(result.expectedCode).toBe('PD000001');
    });

    it('accepts any code when lastCode is undefined', () => {
      const result = validateSequentialCode({
        providedCode: 'SOMETHING',
        lastCode: undefined,
      });
      expect(result.valid).toBe(true);
    });
  });

  describe('different prefixes', () => {
    it('validates PO prefix', () => {
      const result = validateSequentialCode({
        providedCode: 'PO000155',
        lastCode: 'PO000154',
      });
      expect(result.valid).toBe(true);
    });

    it('validates INV prefix', () => {
      const result = validateSequentialCode({
        providedCode: 'INV000013',
        lastCode: 'INV000012',
      });
      expect(result.valid).toBe(true);
    });

    it('rejects mismatched prefixes', () => {
      const result = validateSequentialCode({
        providedCode: 'PD000155',
        lastCode: 'PO000154',
      });
      expect(result.valid).toBe(false);
      expect(result.expectedCode).toBe('PO000155');
    });
  });

  describe('override behavior', () => {
    it('accepts any code when override is true', () => {
      const result = validateSequentialCode({
        providedCode: 'PD999999',
        lastCode: 'PD000032',
        override: true,
      });
      expect(result.valid).toBe(true);
    });

    it('accepts providedCode as expectedCode when override is true', () => {
      const result = validateSequentialCode({
        providedCode: 'CUSTOM-CODE',
        lastCode: 'PD000032',
        override: true,
      });
      expect(result.valid).toBe(true);
      expect(result.expectedCode).toBe('CUSTOM-CODE');
    });

    it('accepts override even without lastCode', () => {
      const result = validateSequentialCode({
        providedCode: 'ANYTHING',
        override: true,
      });
      expect(result.valid).toBe(true);
    });
  });

  describe('semantic codes (non-sequential)', () => {
    it('accepts semantic codes like super_admin', () => {
      const result = validateSequentialCode({
        providedCode: 'super_admin',
        lastCode: 'admin',
      });
      expect(result.valid).toBe(true);
    });

    it('accepts hierarchical codes like AFIW01', () => {
      const result = validateSequentialCode({
        providedCode: 'AFIW02',
        lastCode: 'AFIW01',
      });
      expect(result.valid).toBe(true);
    });
  });
});
