import { ImportRegistryService } from './import-registry.service';
import { ValidationService } from './validation.service';
import { AttributeSyncService } from './attribute-sync.service';
import { ImportContext, ImportReport } from './types';
export declare class EntityImportService {
    private readonly registry;
    private readonly validationService;
    private readonly attributeSync;
    private static readonly SYSTEM_COLUMNS;
    constructor(registry: ImportRegistryService, validationService: ValidationService, attributeSync: AttributeSyncService);
    importSheet(entityName: string, rows: Record<string, any>[], context?: ImportContext): Promise<ImportReport>;
    private resolveEntity;
    private createEntity;
    private mapEntity;
    private resolveRelation;
    private buildCache;
    private isRelationColumn;
    private snakeToCamel;
}
