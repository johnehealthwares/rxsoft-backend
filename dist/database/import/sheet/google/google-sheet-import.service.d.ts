import { GoogleSheetReaderService } from './google-sheet-reader.service';
import { EntityImportService } from '../../entity-import.service';
import { SchemaEvolverService } from '../../../../integration/schema-evolver-service';
export declare class GoogleSheetImportService {
    private readonly reader;
    private readonly entityImporter;
    private readonly schemaEvolver;
    constructor(reader: GoogleSheetReaderService, entityImporter: EntityImportService, schemaEvolver: SchemaEvolverService);
    importSpreadsheet(spreadsheetId: string): Promise<void>;
}
