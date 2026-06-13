import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ImportRegistryService } from './import-registry.service';
import { ValidationService } from './validation.service';
import { AttributeSyncService } from './attribute-sync.service';

import { IMPORT_CONFIG } from './import-config';

import {
  EntityCache,
  ImportContext,
  ImportReport,
  SyncMode,
} from './types';

@Injectable()
export class EntityImportService {
  private static readonly SYSTEM_COLUMNS =
    new Set([
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
    context = new ImportContext(),
  ): Promise<ImportReport> {
    const target =
      this.registry.getTarget(
        entityName,
      );

    const config =
      IMPORT_CONFIG[entityName] ??
      {};

    const validation =
      this.validationService.validateSheet(
        entityName,
        rows,
        config,
      );

    if (!validation.valid) {
      return {
        sheet: entityName,
        processed: rows.length,
        success: 0,
        failed:
          validation.errors.length,
        errors:
          validation.errors.map(
            (e) => e.message,
          ),
      };
    }

    const existing =
      await target.findAll();

    this.buildCache(
      context,
      entityName,
      existing,
    );

    // Optional strict unknown-column validation
    if (config.strictColumns) {
      const physicalColumns = await target.getColumns();

      const unknownColumnErrors = this.validationService.validateUnknownColumns(
        rows,
        physicalColumns,
        config,
      );

      if (unknownColumnErrors.length) {
        return {
          sheet: entityName,
          processed: rows.length,
          success: 0,
          failed: unknownColumnErrors.length,
          errors: unknownColumnErrors.map((e) => e.message),
        };
      }
    }

    const relationErrors =
      this.validationService.validateRelations(
        rows,
        context.caches,
      );

    if (relationErrors.length) {
      return {
        sheet: entityName,
        processed: rows.length,
        success: 0,
        failed:
          relationErrors.length,
        errors:
          relationErrors.map(
            (e) => e.message,
          ),
      };
    }

    const cache =
      context.caches.get(
        entityName,
      )!;

    const entitiesToSave: any[] =
      [];

    const entityRowMap =
      new Map<any, any>();

    for (
      let index = 0;
      index < rows.length;
      index++
    ) {
      const row = rows[index];

      try {
        const entity =
          await this.resolveEntity(
            row,
            cache,
            target,
            config,
          );

        await this.mapEntity(
          entityName,
          entity,
          row,
          context,
          config,
        );

        entitiesToSave.push(
          entity,
        );

        entityRowMap.set(
          entity,
          row,
        );

        context.results.push({
          sheet: entityName,
          rowNumber: index + 2,
          uuid: entity.uuid,
          code: entity.code,
          status: 'SUCCESS',
          message:
            row.uuid
              ? 'Updated'
              : 'Created',
        });
      } catch (error: any) {
        context.results.push({
          sheet: entityName,
          rowNumber: index + 2,
          uuid: row.uuid,
          code: row.code,
          status: 'ERROR',
          message:
            error.message,
        });
      }
    }

    const saved =
      await target.save(
        entitiesToSave,
      );

    const refreshed =
      await target.findAll();

    this.buildCache(
      context,
      entityName,
      refreshed,
    );

    // FULL_SYNC: soft-deactivate records missing from spreadsheet
    const mode = config.mode ?? SyncMode.UPSERT;

    if (mode === SyncMode.FULL_SYNC) {
      const softDeleteField = config.softDeleteField ?? 'active';

      const presentUuid = new Set(
        rows.map((r) => r.uuid).filter(Boolean),
      );

      const presentCode = new Set(rows.map((r) => r.code).filter(Boolean));

      const toDeactivate: any[] = [];

      for (const entity of refreshed) {
        const existsByUuid = presentUuid.has(entity.uuid);
        const existsByCode = presentCode.has(entity.code);

        if (!existsByUuid && !existsByCode) {
          // mark inactive
          const updated = { ...entity};
          updated[softDeleteField] = false;
          toDeactivate.push(updated);

          context.results.push({
            rowNumber: 0,
            uuid: entity.uuid,
            sheet: entityName,
            code: entity.code,
            status: 'SUCCESS',
            message: 'Deactivated (FULL_SYNC)',
          });
        }
      }

      if (toDeactivate.length) {
        await target.save(toDeactivate);
      }
    }

    await this.attributeSync.sync(
      entityName,
      saved,
      rows,
      config,
    );

    return {
      sheet: entityName,
      processed: rows.length,
      success:
        context.results.filter(
          (r) =>
            r.status ===
            'SUCCESS',
        ).length,
      failed:
        context.results.filter(
          (r) =>
            r.status ===
            'ERROR',
        ).length,
      errors:
        context.results
          .filter(
            (r) =>
              r.status ===
              'ERROR',
          )
          .map(
            (r) =>
              r.message ??
              'Unknown error',
          ),
    };
  }

  private async resolveEntity(
    row: Record<string, any>,
    cache: EntityCache,
    target: any,
    config: any,
  ) {
    const mode =
      config.mode ??
      SyncMode.UPSERT;

    const existing =
      cache.byUuid.get(
        row.uuid,
      ) ??
      cache.byCode.get(
        row.code,
      );

    switch (mode) {
      case SyncMode.INSERT_ONLY:
        if (existing) {
          throw new Error(
            `Entity already exists (${row.code})`,
          );
        }

        return this.createEntity(
          target,
          row,
        );

      case SyncMode.UPDATE_ONLY:
        if (!existing) {
          throw new Error(
            `Entity not found (${row.code})`,
          );
        }

        return existing;

      case SyncMode.UPSERT:
      case SyncMode.FULL_SYNC:
      default:
        return (
          existing ??
          this.createEntity(
            target,
            row,
          )
        );
    }
  }

  private createEntity(
    target: any,
    row: Record<string, any>,
  ) {
    const entity =
      target.create();

    // Treat the sheet `uuid` as the entity id in the DB. Keep `uuid` also for compatibility.
    const idValue = row.uuid ?? randomUUID();
    entity.id = idValue;
    entity.uuid = idValue;

    return entity;
  }

  private async mapEntity(
    entityName: string,
    entity: any,
    row: Record<string, any>,
    context: ImportContext,
    config: any,
  ) {
    const eavColumns =
      new Set(
        config.eav ?? [],
      );

    const ignored =
      new Set([
        ...(config.ignoreColumns ??
          []),
      ]);

    for (const column of EntityImportService.SYSTEM_COLUMNS) {
      ignored.add(column);
    }

    for (const [
      column,
      value,
    ] of Object.entries(row)) {
      if (
        ignored.has(column) ||
        eavColumns.has(column)
      ) {
        continue;
      }

      if (
        this.isRelationColumn(
          column,
        )
      ) {
        this.resolveRelation(
          entity,
          column,
          value,
          context,
        );

        continue;
      }

      entity[column] = value;
    }
  }

  private resolveRelation(
    entity: any,
    column: string,
    value: string,
    context: ImportContext,
  ) {
    if (!value) {
      return;
    }

    const relationEntity =
      column.replace(
        /_code$/,
        '',
      );

    const cache =
      context.caches.get(
        relationEntity,
      );

    if (!cache) {
      throw new Error(
        `Missing cache for ${relationEntity}`,
      );
    }

    const related =
      cache.byCode.get(value);

    if (!related) {
      throw new Error(
        `Unable to resolve ${relationEntity} code=${value}`,
      );
    }

    // const relationProperty =
    //   this.snakeToCamel(
    //     relationEntity,
    //   );

    entity[
      `${relationEntity}_id`
    ] = related.id;
  }

  private buildCache(
    context: ImportContext,
    entityName: string,
    entities: any[],
  ) {
    context.caches.set(
      entityName,
      {
        byUuid: new Map(
          entities.map(
            (entity) => [
              entity.uuid,
              entity,
            ],
          ),
        ),

        byCode: new Map(
          entities.map(
            (entity) => [
              entity.code,
              entity,
            ],
          ),
        ),
      },
    );
  }

  private isRelationColumn(
    column: string,
  ) {
    return column.endsWith(
      '_code',
    );
  }

  private snakeToCamel(
    value: string,
  ) {
    return value.replace(
      /_([a-z])/g,
      (_, char) =>
        char.toUpperCase(),
    );
  }
}