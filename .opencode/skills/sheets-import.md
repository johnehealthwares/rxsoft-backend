# Google Sheets Import — rxsoft-backend

## Purpose

Add or modify Google Sheets / Excel import for entity data.

## When to invoke

When adding a new import configuration for bulk data loading.

## When not to invoke

For one-off data migrations.

## Inputs

- **Entity type** to import
- **Sheet ID or file**
- **Column mapping**

## Workflow

1. Add import configuration in `src/database/import/import-config.ts` with entity name, sync mode, column mappings, and dependency ordering.
2. Use `EntityImportService` which handles:
   - Row validation via `ValidationService`
   - Reference resolution (FKs between entities)
   - Attribute sync via `AttributeSyncService`
   - Schema evolution via `SchemaEvolverService` (auto-adds columns)
3. Configure import target: `DatabaseImportTarget`, `RepositoryImportTarget`, or `QueryBuilderImportTarget`.
4. Add to the import priority list for dependency resolution.
5. For Google Sheets: use `GoogleSheetReaderService` + `GoogleSheetStatusWriter` to write sync status back to the sheet.

## Refactoring

This package has the most advanced import pipeline. Follow the existing `EntityImportService` patterns and import config definitions.