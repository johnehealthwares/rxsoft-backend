import { RowSyncResult } from '../../types';
import { SpreadsheetStatusWriter } from '../spreadsheet-status-writer';
export declare class ExcelStatusWriter implements SpreadsheetStatusWriter {
    private readonly filePath;
    private readonly sheetName;
    constructor(filePath: string, sheetName: string);
    updateRows(results: RowSyncResult[]): Promise<void>;
}
