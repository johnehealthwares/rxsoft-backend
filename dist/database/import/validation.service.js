"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
let ValidationService = class ValidationService {
    validateSheet(entityName, rows, config) {
        const errors = [];
        this.validateDuplicateUuids(rows, errors);
        this.validateConfiguredEav(rows, config, errors);
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    validateRelations(rows, relationCaches) {
        const errors = [];
        rows.forEach((row, index) => {
            Object.entries(row).forEach(([column, value]) => {
                if (!column.endsWith('_code') ||
                    !value) {
                    return;
                }
                const relationEntity = column.replace(/_code$/, '');
                const cache = relationCaches.get(relationEntity);
                if (!cache) {
                    errors.push({
                        rowNumber: index + 2,
                        column,
                        code: 'RELATION_CACHE_MISSING',
                        message: `No cache found for relation '${relationEntity}'`,
                    });
                    return;
                }
                if (!cache.byCode.has(String(value))) {
                    errors.push({
                        rowNumber: index + 2,
                        column,
                        code: 'INVALID_RELATION',
                        message: `Unable to resolve ${relationEntity} code '${value}'`,
                    });
                }
            });
        });
        return errors;
    }
    validateUnknownColumns(rows, physicalColumns, config) {
        const errors = [];
        const allowedColumns = new Set([
            ...physicalColumns,
            ...(config.eav ?? []),
            ...(config.ignoreColumns ??
                []),
            'uuid',
            'sync_status',
            'sync_message',
            'sync_time',
        ]);
        rows.forEach((row, index) => {
            Object.keys(row).forEach((column) => {
                if (column.endsWith('_code')) {
                    return;
                }
                if (!allowedColumns.has(column)) {
                    errors.push({
                        rowNumber: index + 2,
                        column,
                        code: 'UNKNOWN_COLUMN',
                        message: `Unknown column '${column}'`,
                    });
                }
            });
        });
        return errors;
    }
    validateAttributes(configuredAttributes, existingAttributeCodes) {
        const errors = [];
        const existing = new Set(existingAttributeCodes);
        configuredAttributes.forEach((attribute) => {
            if (!existing.has(attribute)) {
                errors.push({
                    rowNumber: 0,
                    code: 'ATTRIBUTE_NOT_FOUND',
                    message: `Configured attribute '${attribute}' does not exist`,
                });
            }
        });
        return errors;
    }
    validateDuplicateUuids(rows, errors) {
        const seen = new Map();
        rows.forEach((row, index) => {
            const uuid = row.uuid?.trim();
            if (!uuid) {
                return;
            }
            if (seen.has(uuid)) {
                errors.push({
                    rowNumber: index + 2,
                    column: 'uuid',
                    code: 'DUPLICATE_UUID',
                    message: `Duplicate uuid '${uuid}'`,
                });
                return;
            }
            seen.set(uuid, index);
        });
    }
    validateDuplicateCodes(rows, errors) {
        const seen = new Map();
        rows.forEach((row, index) => {
            const code = row.code;
            if (!code) {
                return;
            }
            if (seen.has(code)) {
                errors.push({
                    rowNumber: index + 2,
                    column: 'code',
                    code: 'DUPLICATE_CODE',
                    message: `Duplicate code '${code}'`,
                });
                return;
            }
            seen.set(code, index);
        });
    }
    validateRequiredCodes(rows, errors) {
        rows.forEach((row, index) => {
            if (!row.code ||
                String(row.code).trim() === '') {
                errors.push({
                    rowNumber: index + 2,
                    column: 'code',
                    code: 'CODE_REQUIRED',
                    message: 'Code is required',
                });
            }
        });
    }
    validateConfiguredEav(rows, config, errors) {
        const eavColumns = config.eav ?? [];
        if (!rows.length ||
            !eavColumns.length) {
            return;
        }
        const headers = Object.keys(rows[0]);
        eavColumns.forEach((attribute) => {
            if (!headers.includes(attribute)) {
                errors.push({
                    rowNumber: 1,
                    column: attribute,
                    code: 'EAV_COLUMN_MISSING',
                    message: `Configured EAV column '${attribute}' not found in sheet`,
                });
            }
        });
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map