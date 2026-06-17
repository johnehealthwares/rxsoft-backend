import { RowSyncResult } from '../../types';
import { SpreadsheetStatusWriter } from '../spreadsheet-status-writer';
export declare class GoogleSheetStatusWriter implements SpreadsheetStatusWriter {
    private readonly spreadsheetId;
    private readonly sheetName;
    private readonly sheets;
    constructor(spreadsheetId: string, sheetName: string);
    updateRows(results: RowSyncResult[]): Promise<void>;
    private ensureStatusColumns;
    private getColumnIndex;
    private columnLetter;
}
