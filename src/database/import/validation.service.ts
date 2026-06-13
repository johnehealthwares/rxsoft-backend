// validation.service.ts

import { Injectable } from '@nestjs/common';
import { ValidationError, ValidationResult } from './types';

@Injectable()
export class ValidationService {
  validateSheet(
    entityName: string,
    rows: Record<string, any>[],
    config: {
      eav?: string[];
      ignoreColumns?: string[];
    },
  ): ValidationResult {
    const errors: ValidationError[] = [];

    this.validateDuplicateUuids(rows, errors);
    //this.validateDuplicateCodes(rows, errors);
    //this.validateRequiredCodes(rows, errors);
    this.validateConfiguredEav(rows, config, errors);

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  validateRelations(
    rows: Record<string, any>[],
    relationCaches: Map<
      string,
      {
        byCode: Map<string, any>;
      }
    >,
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    rows.forEach((row, index) => {
      Object.entries(row).forEach(
        ([column, value]) => {
          if (
            !column.endsWith('_code') ||
            !value
          ) {
            return;
          }

          const relationEntity =
            column.replace(
              /_code$/,
              '',
            );

          const cache =
            relationCaches.get(
              relationEntity,
            );

          if (!cache) {
            errors.push({
              rowNumber: index + 2,
              column,
              code:
                'RELATION_CACHE_MISSING',
              message: `No cache found for relation '${relationEntity}'`,
            });

            return;
          }

          if (
            !cache.byCode.has(
              String(value),
            )
          ) {
            errors.push({
              rowNumber: index + 2,
              column,
              code:
                'INVALID_RELATION',
              message: `Unable to resolve ${relationEntity} code '${value}'`,
            });
          }
        },
      );
    });

    return errors;
  }

  validateUnknownColumns(
    rows: Record<string, any>[],
    physicalColumns: string[],
    config: {
      eav?: string[];
      ignoreColumns?: string[];
    },
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    const allowedColumns =
      new Set([
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
      Object.keys(row).forEach(
        (column) => {
          if (
            column.endsWith('_code')
          ) {
            return;
          }

          if (
            !allowedColumns.has(
              column,
            )
          ) {
            errors.push({
              rowNumber: index + 2,
              column,
              code:
                'UNKNOWN_COLUMN',
              message: `Unknown column '${column}'`,
            });
          }
        },
      );
    });

    return errors;
  }

  validateAttributes(
    configuredAttributes: string[],
    existingAttributeCodes: string[],
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    const existing =
      new Set(
        existingAttributeCodes,
      );

    configuredAttributes.forEach(
      (attribute) => {
        if (
          !existing.has(attribute)
        ) {
          errors.push({
            rowNumber: 0,
            code:
              'ATTRIBUTE_NOT_FOUND',
            message: `Configured attribute '${attribute}' does not exist`,
          });
        }
      },
    );

    return errors;
  }

  private validateDuplicateUuids(
    rows: Record<string, any>[],
    errors: ValidationError[],
  ) {
    const seen =
      new Map<string, number>();

    rows.forEach((row, index) => {
      const uuid =
        row.uuid?.trim();

      if (!uuid) {
        return;
      }

      if (seen.has(uuid)) {
        errors.push({
          rowNumber: index + 2,
          column: 'uuid',
          code:
            'DUPLICATE_UUID',
          message: `Duplicate uuid '${uuid}'`,
        });

        return;
      }

      seen.set(uuid, index);
    });
  }

  private validateDuplicateCodes(
    rows: Record<string, any>[],
    errors: ValidationError[],
  ) {
    const seen =
      new Map<string, number>();

    rows.forEach((row, index) => {
      const code =
        row.code;

      if (!code) {
        return;
      }

      if (seen.has(code)) {
        errors.push({
          rowNumber: index + 2,
          column: 'code',
          code:
            'DUPLICATE_CODE',
          message: `Duplicate code '${code}'`,
        });

        return;
      }

      seen.set(code, index);
    });
  }

  private validateRequiredCodes(
    rows: Record<string, any>[],
    errors: ValidationError[],
  ) {
    rows.forEach((row, index) => {
      if (
        !row.code ||
        String(
          row.code,
        ).trim() === ''
      ) {
        errors.push({
          rowNumber: index + 2,
          column: 'code',
          code:
            'CODE_REQUIRED',
          message:
            'Code is required',
        });
      }
    });
  }

  private validateConfiguredEav(
    rows: Record<string, any>[],
    config: {
      eav?: string[];
    },
    errors: ValidationError[],
  ) {
    const eavColumns =
      config.eav ?? [];

    if (
      !rows.length ||
      !eavColumns.length
    ) {
      return;
    }

    const headers =
      Object.keys(rows[0]);

    eavColumns.forEach(
      (attribute) => {
        if (
          !headers.includes(
            attribute,
          )
        ) {
          errors.push({
            rowNumber: 1,
            column: attribute,
            code:
              'EAV_COLUMN_MISSING',
            message: `Configured EAV column '${attribute}' not found in sheet`,
          });
        }
      },
    );
  }
}