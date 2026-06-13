import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ImportRegistryService } from './import-registry.service';
import { ValidationService } from './validation.service';
import { AttributeSyncService } from './attribute-sync.service';
import { IMPORT_CONFIG } from './import-config';

import {
  ImportContext,
  ImportReport,
  SyncMode,
  EntityCache,
} from './types';

@Injectable()
export class EntityImportService {
  private static readonly SYSTEM_COLUMNS = new Set([
    'id',
    'sync_status',
    'sync_message',
    'sync_time',
  ]);

  constructor(
    private readonly registry: ImportRegistryService,
    private readonly validationService: ValidationService,
    private readonly attributeSync: AttributeSyncService,
  ) {}

  async importSheet(
    entityName: string,
    rows: Record<string, any>[],
    context: ImportContext,
  ): Promise<ImportReport> {
    const target = this.registry.getTarget(entityName);
    const config = IMPORT_CONFIG[entityName] ?? {};

    const validation = this.validationService.validateSheet(
      entityName,
      rows,
      config,
    );

    if (!validation.valid) {
      return this.failReport(entityName, rows.length, validation.errors.map(e => e.message));
    }

    const existing = await target.findAll();
    this.buildCache(context, entityName, existing);

    const cache = context.caches.get(entityName)!;

    // Sort self-referential rows so referenced rows come first
    this.sortSelfReferentialRows(rows, entityName);

    const entitiesToSave: any[] = [];

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];

      try {
        const entity = await this.resolveEntity(row, cache, target, config);

        await this.mapEntity(entityName, entity, row, context, config);

        entitiesToSave.push(entity);

        // Self-referential rows need parent in cache before child is resolved
        if (entity.uuid) cache.byUuid.set(entity.uuid, entity);
        if (entity.code) cache.byCode.set(entity.code, entity);

        context.results.push({
          rowNumber: index + 2,
          code: entity.code,
          sheet: entityName,
          status: 'SUCCESS',
          message: row.uuid ? 'Updated' : 'Created',
        });
      } catch (err: any) {
        context.results.push({
          rowNumber: index + 2,
          sheet: entityName,
          code: row.code,
          status: 'ERROR',
          message: err.message,
        });
      }
    }

    const saved = await target.save(entitiesToSave);

    const refreshed = await target.findAll();
    this.buildCache(context, entityName, refreshed);

    await this.applyFullSyncIfNeeded(config, target, refreshed, rows, context);

    await this.attributeSync.sync(entityName, saved, rows, config);

    return this.buildReport(entityName, rows.length, context);
  }

  // -------------------------
  // ENTITY RESOLUTION
  // -------------------------

  private async resolveEntity(
    row: any,
    cache: EntityCache,
    target: any,
    config: any,
  ) {
    const mode = config.mode ?? SyncMode.UPSERT;

    // Only look up by uuid if it's a real uuid (not empty/missing from sheet)
    const existing =
      (row.uuid ? cache.byUuid.get(row.uuid) : undefined) ??
      cache.byCode.get(row.code);

    switch (mode) {
      case SyncMode.INSERT_ONLY:
        if (existing) throw new Error(`Exists: ${row.code}`);
        return this.createEntity(target, row);

      case SyncMode.UPDATE_ONLY:
        if (!existing) throw new Error(`Not found: ${row.code}`);
        return existing;

      default:
        return existing ?? this.createEntity(target, row);
    }
  }

  private createEntity(target: any, row: any) {
    const entity = target.create();
    entity.uuid = row.uuid ?? randomUUID();
    return entity;
  }

  // -------------------------
  // MAPPING
  // -------------------------

  private async mapEntity(
    entityName: string,
    entity: any,
    row: any,
    context: ImportContext,
    config: any,
  ) {
    const eav = new Set(config.eav ?? []);
    const ignored = new Set([
      ...(config.ignoreColumns ?? []),
      ...EntityImportService.SYSTEM_COLUMNS,
      'idq',
      'uuid',
    ]);

    for (const [col, val] of Object.entries(row)) {
      if (ignored.has(col) || eav.has(col)) continue;

      // Skip ${relation}_name columns (display-only reference, not stored in DB)
      if (col.endsWith('_name')) continue;

      if (this.isRelationColumn(col)) {
        this.resolveRelation(entity, col, val, context, entityName);
        continue;
      }

      entity[col] = val;
    }
  }

  private resolveRelation(
    entity: any,
    column: string,
    value: any,
    context: ImportContext,
    entityName?: string,
  ) {
    if (!value) return;

    const relation = column.replace(/_code$/, '');
    let cache: EntityCache | undefined;

    // Try exact match, then fuzzy match over all caches
    for (const [name, c] of context.caches) {
      if (name === relation || name.endsWith(relation) || relation.endsWith(name)) {
        const match = c.byCode.get(value);
        if (match) {
          entity[`${relation}_id`] = match.id;
          return;
        }
      }
    }

    // Final fallback: try the current entity's own cache
    if (entityName) {
      const selfCache = context.caches.get(entityName);
      if (selfCache) {
        const match = selfCache.byCode.get(value);
        if (match) {
          entity[`${relation}_id`] = match.id;
          return;
        }
      }
    }

    // Code not found in any cache — insert without the relation
  }

  // -------------------------
  // FULL SYNC
  // -------------------------

  private async applyFullSyncIfNeeded(
    config: any,
    target: any,
    refreshed: any[],
    rows: any[],
    context: ImportContext,
  ) {
    if (config.mode !== SyncMode.FULL_SYNC) return;

    const activeField = config.softDeleteField ?? 'active';

    const present = new Set(rows.map(r => r.uuid ?? r.code));

    const toDeactivate = refreshed
      .filter(e => !present.has(e.uuid ?? e.code))
      .map(e => ({
        ...e,
        [activeField]: false,
      }));

    if (toDeactivate.length) {
      await target.save(toDeactivate);
    }
  }

  // -------------------------
  // CACHE
  // -------------------------

  private buildCache(context: ImportContext, entity: string, rows: any[]) {
    context.caches.set(entity, {
      byUuid: new Map(rows.map(r => [r.uuid, r])),
      byCode: new Map(rows.map(r => [r.code, r])),
    });
  }

  private isRelationColumn(col: string) {
    return col.endsWith('_code');
  }

  private snakeToCamel(v: string) {
    return v.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  }

  private sortSelfReferentialRows(rows: Record<string, any>[], entityName: string) {
    if (rows.length < 2) return;

    const cols = Object.keys(rows[0]).filter(c => c.endsWith('_code'));
    const selfRefCols = cols.filter(col => {
      const relation = col.replace(/_code$/, '');
      // Self-referential if the relation doesn't have its own target
      // but the column values reference other rows in this sheet
      if (this.registry.hasTarget(relation)) return false;
      const codes = new Set(rows.map(r => r.code));
      return rows.some(r => r[col] && codes.has(r[col]));
    });

    if (!selfRefCols.length) return;

    rows.sort((a, b) => {
      for (const col of selfRefCols) {
        if (!a[col] && b[col]) return -1;
        if (a[col] && !b[col]) return 1;
      }
      return 0;
    });
  }

  // -------------------------
  // REPORTING
  // -------------------------

  private buildReport(entity: string, processed: number, context: ImportContext): ImportReport {
    const entityResults = context.results.filter(r => r.sheet === entity);
    const success = entityResults.filter(r => r.status === 'SUCCESS').length;
    const failed = entityResults.filter(r => r.status === 'ERROR').length;

    return {
      sheet: entity,
      processed,
      success,
      failed,
      errors: entityResults
        .filter(r => r.status === 'ERROR')
        .map(r => r.message ?? 'Unknown error'),
    };
  }

  private failReport(sheet: string, processed: number, errors: string[]): ImportReport {
    return {
      sheet,
      processed,
      success: 0,
      failed: errors.length,
      errors,
    };
  }
}