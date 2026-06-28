export interface CodeValidationOptions {
    providedCode: string;
    lastCode?: string;
    override?: boolean;
}
export interface CodeValidationResult {
    valid: boolean;
    expectedCode: string;
}
export declare function parseCode(code: string): {
    prefix: string;
    numberPart: string;
    numericValue: number;
} | null;
export declare function generateNextCode(lastCode: string): string | null;
export declare function validateSequentialCode(options: CodeValidationOptions): CodeValidationResult;
