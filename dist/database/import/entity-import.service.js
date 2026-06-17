"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EntityImportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityImportService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const import_registry_service_1 = require("./import-registry.service");
const validation_service_1 = require("./validation.service");
const attribute_sync_service_1 = require("./attribute-sync.service");
const import_config_1 = require("./import-config");
const types_1 = require("./types");
let EntityImportService = class EntityImportService {
    static { EntityImportService_1 = this; }
    registry;
    validationService;
    attributeSync;
    static SYSTEM_COLUMNS = new Set([
        'id',
        'sync_status',
        'sync_message',
        'sync_time',
    ]);
    constructor(registry, validationService, attributeSync) {
        this.registry = registry;
        this.validationService = validationService;
        this.attributeSync = attributeSync;
    }
    async importSheet(entityName, rows, context) {
        const target = this.registry.getTarget(entityName);
        const config = import_config_1.IMPORT_CONFIG[entityName] ?? {};
        const validation = this.validationService.validateSheet(entityName, rows, config);
        if (!validation.valid) {
            return this.failReport(entityName, rows.length, validation.errors.map(e => e.message));
        }
        const existing = await target.findAll();
        this.buildCache(context, entityName, existing);
        const cache = context.caches.get(entityName);
        this.sortSelfReferentialRows(rows, entityName);
        const entitiesToSave = [];
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            try {
                const entity = await this.resolveEntity(row, cache, target, config);
                await this.mapEntity(entityName, entity, row, context, config);
                entitiesToSave.push(entity);
                if (entity.uuid)
                    cache.byUuid.set(entity.uuid, entity);
                if (entity.code)
                    cache.byCode.set(entity.code, entity);
                context.results.push({
                    rowNumber: index + 2,
                    code: entity.code,
                    sheet: entityName,
                    status: 'SUCCESS',
                    message: row.uuid ? 'Updated' : 'Created',
                });
            }
            catch (err) {
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
    async resolveEntity(row, cache, target, config) {
        const mode = config.mode ?? types_1.SyncMode.UPSERT;
        const existing = (row.uuid ? cache.byUuid.get(row.uuid) : undefined) ??
            cache.byCode.get(row.code);
        switch (mode) {
            case types_1.SyncMode.INSERT_ONLY:
                if (existing)
                    throw new Error(`Exists: ${row.code}`);
                return this.createEntity(target, row);
            case types_1.SyncMode.UPDATE_ONLY:
                if (!existing)
                    throw new Error(`Not found: ${row.code}`);
                return existing;
            default:
                return existing ?? this.createEntity(target, row);
        }
    }
    createEntity(target, row) {
        const entity = target.create();
        entity.uuid = row.uuid ?? (0, crypto_1.randomUUID)();
        return entity;
    }
    async mapEntity(entityName, entity, row, context, config) {
        const eav = new Set(config.eav ?? []);
        const ignored = new Set([
            ...(config.ignoreColumns ?? []),
            ...EntityImportService_1.SYSTEM_COLUMNS,
            'idq',
            'uuid',
        ]);
        for (const [col, val] of Object.entries(row)) {
            if (ignored.has(col) || eav.has(col))
                continue;
            if (col.endsWith('_name'))
                continue;
            if (this.isRelationColumn(col)) {
                this.resolveRelation(entity, col, val, context, entityName);
                continue;
            }
            entity[col] = val;
        }
    }
    resolveRelation(entity, column, value, context, entityName) {
        if (!value)
            return;
        const relation = column.replace(/_code$/, '');
        let cache;
        for (const [name, c] of context.caches) {
            if (name === relation || name.endsWith(relation) || relation.endsWith(name)) {
                const match = c.byCode.get(value);
                if (match) {
                    entity[`${relation}_id`] = match.id;
                    return;
                }
            }
        }
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
    }
    async applyFullSyncIfNeeded(config, target, refreshed, rows, context) {
        if (config.mode !== types_1.SyncMode.FULL_SYNC)
            return;
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
    buildCache(context, entity, rows) {
        context.caches.set(entity, {
            byUuid: new Map(rows.map(r => [r.uuid, r])),
            byCode: new Map(rows.map(r => [r.code, r])),
        });
    }
    isRelationColumn(col) {
        return col.endsWith('_code');
    }
    snakeToCamel(v) {
        return v.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    }
    sortSelfReferentialRows(rows, entityName) {
        if (rows.length < 2)
            return;
        const cols = Object.keys(rows[0]).filter(c => c.endsWith('_code'));
        const selfRefCols = cols.filter(col => {
            const relation = col.replace(/_code$/, '');
            if (this.registry.hasTarget(relation))
                return false;
            const codes = new Set(rows.map(r => r.code));
            return rows.some(r => r[col] && codes.has(r[col]));
        });
        if (!selfRefCols.length)
            return;
        rows.sort((a, b) => {
            for (const col of selfRefCols) {
                if (!a[col] && b[col])
                    return -1;
                if (a[col] && !b[col])
                    return 1;
            }
            return 0;
        });
    }
    buildReport(entity, processed, context) {
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
    failReport(sheet, processed, errors) {
        return {
            sheet,
            processed,
            success: 0,
            failed: errors.length,
            errors,
        };
    }
};
exports.EntityImportService = EntityImportService;
exports.EntityImportService = EntityImportService = EntityImportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [import_registry_service_1.ImportRegistryService,
        validation_service_1.ValidationService,
        attribute_sync_service_1.AttributeSyncService])
], EntityImportService);
//# sourceMappingURL=entity-import.service.js.map