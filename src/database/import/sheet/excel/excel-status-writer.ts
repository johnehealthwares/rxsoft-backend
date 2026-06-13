import * as XLSX from 'xlsx';
import { RowSyncResult } from '../../types';
import { SpreadsheetStatusWriter } from '../spreadsheet-status-writer';

export class ExcelStatusWriter implements SpreadsheetStatusWriter {
  constructor(
    private readonly filePath: string,
    private readonly sheetName: string,
  ) {}

  async updateRows(results: RowSyncResult[]) {
    if (!results || !results.length) return;

    const workbook = XLSX.readFile(this.filePath);
    const sheet = workbook.Sheets[this.sheetName];

    if (!sheet) {
      throw new Error(`Sheet not found: ${this.sheetName}`);
    }

    // Read headers (first row)
    const rows = XLSX.utils.sheet_to_json<string[]>(sheet, {
      header: 1,
      defval: null,
    });

    const headers = (rows[0] || []) as string[];

    const colIndexOf = (name: string) => {
      const idx = headers.findIndex(
        (h) => String(h).trim() === name,
      );

      return idx >= 0 ? idx : -1;
    };

    const uuidCol = colIndexOf('uuid');
    const statusCol = colIndexOf('sync_status');
    const messageCol = colIndexOf('sync_message');
    const timeCol = colIndexOf('sync_time');

    const ensureCell = (r: number, c: number, value: any) => {
      const addr = XLSX.utils.encode_cell({ r, c });
      sheet[addr] = { v: value, t: 's' } as any;
    };

    for (const res of results) {
      const excelRow = (res.rowNumber ?? 0) - 1; // zero-based

      if (uuidCol >= 0 && res.uuid) {
        ensureCell(excelRow, uuidCol, res.uuid);
      }

      if (statusCol >= 0) {
        ensureCell(excelRow, statusCol, res.status);
      }

      if (messageCol >= 0) {
        ensureCell(excelRow, messageCol, res.message ?? '');
      }

      if (timeCol >= 0) {
        ensureCell(excelRow, timeCol, new Date().toISOString());
      }
    }

    XLSX.writeFile(workbook, this.filePath);
  }
}