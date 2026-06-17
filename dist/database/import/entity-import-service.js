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
    async importSheet(entityName, rows, context = new types_1.ImportContext()) {
        const target = this.registry.getTarget(entityName);
        const config = import_config_1.IMPORT_CONFIG[entityName] ??
            {};
        const validation = this.validationService.validateSheet(entityName, rows, config);
        if (!validation.valid) {
            return {
                sheet: entityName,
                processed: rows.length,
                success: 0,
                failed: validation.errors.length,
                errors: validation.errors.map((e) => e.message),
            };
        }
        const existing = await target.findAll();
        this.buildCache(context, entityName, existing);
        if (config.strictColumns) {
            const physicalColumns = await target.getColumns();
            const unknownColumnErrors = this.validationService.validateUnknownColumns(rows, physicalColumns, config);
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
        const relationErrors = this.validationService.validateRelations(rows, context.caches);
        if (relationErrors.length) {
            return {
                sheet: entityName,
                processed: rows.length,
                success: 0,
                failed: relationErrors.length,
                errors: relationErrors.map((e) => e.message),
            };
        }
        const cache = context.caches.get(entityName);
        const entitiesToSave = [];
        const entityRowMap = new Map();
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            try {
                const entity = await this.resolveEntity(row, cache, target, config);
                await this.mapEntity(entityName, entity, row, context, config);
                entitiesToSave.push(entity);
                entityRowMap.set(entity, row);
                context.results.push({
                    sheet: entityName,
                    rowNumber: index + 2,
                    uuid: entity.uuid,
                    code: entity.code,
                    status: 'SUCCESS',
                    message: row.uuid
                        ? 'Updated'
                        : 'Created',
                });
            }
            catch (error) {
                context.results.push({
                    sheet: entityName,
                    rowNumber: index + 2,
                    uuid: row.uuid,
                    code: row.code,
                    status: 'ERROR',
                    message: error.message,
                });
            }
        }
        const saved = await target.save(entitiesToSave);
        const refreshed = await target.findAll();
        this.buildCache(context, entityName, refreshed);
        const mode = config.mode ?? types_1.SyncMode.UPSERT;
        if (mode === types_1.SyncMode.FULL_SYNC) {
            const softDeleteField = config.softDeleteField ?? 'active';
            const presentUuid = new Set(rows.map((r) => r.uuid).filter(Boolean));
            const presentCode = new Set(rows.map((r) => r.code).filter(Boolean));
            const toDeactivate = [];
            for (const entity of refreshed) {
                const existsByUuid = presentUuid.has(entity.uuid);
                const existsByCode = presentCode.has(entity.code);
                if (!existsByUuid && !existsByCode) {
                    const updated = { ...entity };
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
        await this.attributeSync.sync(entityName, saved, rows, config);
        return {
            sheet: entityName,
            processed: rows.length,
            success: context.results.filter((r) => r.status ===
                'SUCCESS').length,
            failed: context.results.filter((r) => r.status ===
                'ERROR').length,
            errors: context.results
                .filter((r) => r.status ===
                'ERROR')
                .map((r) => r.message ??
                'Unknown error'),
        };
    }
    async resolveEntity(row, cache, target, config) {
        const mode = config.mode ??
            types_1.SyncMode.UPSERT;
        const existing = cache.byUuid.get(row.uuid) ??
            cache.byCode.get(row.code);
        switch (mode) {
            case types_1.SyncMode.INSERT_ONLY:
                if (existing) {
                    throw new Error(`Entity already exists (${row.code})`);
                }
                return this.createEntity(target, row);
            case types_1.SyncMode.UPDATE_ONLY:
                if (!existing) {
                    throw new Error(`Entity not found (${row.code})`);
                }
                return existing;
            case types_1.SyncMode.UPSERT:
            case types_1.SyncMode.FULL_SYNC:
            default:
                return (existing ??
                    this.createEntity(target, row));
        }
    }
    createEntity(target, row) {
        const entity = target.create();
        const idValue = row.uuid ?? (0, crypto_1.randomUUID)();
        entity.id = idValue;
        entity.uuid = idValue;
        return entity;
    }
    async mapEntity(entityName, entity, row, context, config) {
        const eavColumns = new Set(config.eav ?? []);
        const ignored = new Set([
            ...(config.ignoreColumns ??
                []),
        ]);
        for (const column of EntityImportService_1.SYSTEM_COLUMNS) {
            ignored.add(column);
        }
        for (const [column, value,] of Object.entries(row)) {
            if (ignored.has(column) ||
                eavColumns.has(column)) {
                continue;
            }
            if (this.isRelationColumn(column)) {
                this.resolveRelation(entity, column, value, context);
                continue;
            }
            entity[column] = value;
        }
    }
    resolveRelation(entity, column, value, context) {
        if (!value) {
            return;
        }
        const relationEntity = column.replace(/_code$/, '');
        const cache = context.caches.get(relationEntity);
        if (!cache) {
            throw new Error(`Missing cache for ${relationEntity}`);
        }
        const related = cache.byCode.get(value);
        if (!related) {
            throw new Error(`Unable to resolve ${relationEntity} code=${value}`);
        }
        entity[`${relationEntity}_id`] = related.id;
    }
    buildCache(context, entityName, entities) {
        context.caches.set(entityName, {
            byUuid: new Map(entities.map((entity) => [
                entity.uuid,
                entity,
            ])),
            byCode: new Map(entities.map((entity) => [
                entity.code,
                entity,
            ])),
        });
    }
    isRelationColumn(column) {
        return column.endsWith('_code');
    }
    snakeToCamel(value) {
        return value.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
    }
};
exports.EntityImportService = EntityImportService;
exports.EntityImportService = EntityImportService = EntityImportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [import_registry_service_1.ImportRegistryService,
        validation_service_1.ValidationService,
        attribute_sync_service_1.AttributeSyncService])
], EntityImportService);
//# sourceMappingURL=entity-import-service.js.map