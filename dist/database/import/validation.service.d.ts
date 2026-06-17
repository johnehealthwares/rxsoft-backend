import { ValidationError, ValidationResult } from './types';
export declare class ValidationService {
    validateSheet(entityName: string, rows: Record<string, any>[], config: {
        eav?: string[];
        ignoreColumns?: string[];
    }): ValidationResult;
    validateRelations(rows: Record<string, any>[], relationCaches: Map<string, {
        byCode: Map<string, any>;
    }>): ValidationError[];
    validateUnknownColumns(rows: Record<string, any>[], physicalColumns: string[], config: {
        eav?: string[];
        ignoreColumns?: string[];
    }): ValidationError[];
    validateAttributes(configuredAttributes: string[], existingAttributeCodes: string[]): ValidationError[];
    private validateDuplicateUuids;
    private validateDuplicateCodes;
    private validateRequiredCodes;
    private validateConfiguredEav;
}
