export interface CodeValidationOptions {
  providedCode: string;
  lastCode?: string;
  override?: boolean;
}

export interface CodeValidationResult {
  valid: boolean;
  expectedCode: string;
}

export function parseCode(code: string): { prefix: string; numberPart: string; numericValue: number } | null {
  const match = code.match(/^([A-Za-z]+)(\d+)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    numberPart: match[2],
    numericValue: parseInt(match[2], 10),
  };
}

export function generateNextCode(lastCode: string): string | null {
  const parsed = parseCode(lastCode);
  if (!parsed) return null;
  const nextValue = parsed.numericValue + 1;
  const nextNumberPart = String(nextValue).padStart(parsed.numberPart.length, '0');
  return `${parsed.prefix}${nextNumberPart}`;
}

export function validateSequentialCode(options: CodeValidationOptions): CodeValidationResult {
  const { providedCode, lastCode, override } = options;

  if (override) {
    return { valid: true, expectedCode: providedCode };
  }

  if (!lastCode) {
    return { valid: true, expectedCode: providedCode };
  }

  const expectedCode = generateNextCode(lastCode);

  if (!expectedCode) {
    return { valid: true, expectedCode: providedCode };
  }

  return {
    valid: providedCode === expectedCode,
    expectedCode,
  };
}
