import { EntityImportService } from '../../entity-import.service';
import { SchemaEvolverService } from '../../../../integration/schema-evolver-service';
export declare class SpreadsheetImportService {
    private readonly entityImporter;
    private readonly schemaEvolver;
    constructor(entityImporter: EntityImportService, schemaEvolver: SchemaEvolverService);
    import(filePath: string): Promise<void>;
}
