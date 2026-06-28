"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCode = parseCode;
exports.generateNextCode = generateNextCode;
exports.validateSequentialCode = validateSequentialCode;
function parseCode(code) {
    const match = code.match(/^([A-Za-z]+)(\d+)$/);
    if (!match)
        return null;
    return {
        prefix: match[1],
        numberPart: match[2],
        numericValue: parseInt(match[2], 10),
    };
}
function generateNextCode(lastCode) {
    const parsed = parseCode(lastCode);
    if (!parsed)
        return null;
    const nextValue = parsed.numericValue + 1;
    const nextNumberPart = String(nextValue).padStart(parsed.numberPart.length, '0');
    return `${parsed.prefix}${nextNumberPart}`;
}
function validateSequentialCode(options) {
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
//# sourceMappingURL=code-validation.js.map