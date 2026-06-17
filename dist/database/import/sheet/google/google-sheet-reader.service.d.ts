export declare class GoogleSheetReaderService {
    private readonly sheets;
    constructor();
    getWorkbook(spreadsheetId: string): Promise<any>;
    getSheetNames(spreadsheetId: string): Promise<string[]>;
    getRows(spreadsheetId: string, sheetName: string): Promise<Record<string, any>[]>;
}
