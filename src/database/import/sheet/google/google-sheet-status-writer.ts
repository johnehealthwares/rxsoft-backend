import { google, sheets_v4 } from 'googleapis';
import { RowSyncResult } from '../../types';
import { SpreadsheetStatusWriter } from '../spreadsheet-status-writer';

export class GoogleSheetStatusWriter
  implements SpreadsheetStatusWriter
{
  private readonly sheets: sheets_v4.Sheets;

  constructor(
    private readonly spreadsheetId: string,
    private readonly sheetName: string,
  ) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key:
          process.env.GOOGLE_PRIVATE_KEY?.replace(
            /\\n/g,
            '\n',
          ),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    this.sheets = google.sheets({
      version: 'v4',
      auth,
    });
  }

  async updateRows(
    results: RowSyncResult[],
  ): Promise<void> {
    const ownResults = results.filter(r => r.sheet === this.sheetName);

    if (!ownResults.length) {
      return;
    }

    const headers =
      await this.ensureStatusColumns();

    const uuidCol =
      this.getColumnIndex(headers, 'uuid');
    const statusCol =
      this.getColumnIndex(
        headers,
        'sync_status',
      );
    const messageCol =
      this.getColumnIndex(
        headers,
        'sync_message',
      );
    const timeCol =
      this.getColumnIndex(
        headers,
        'sync_time',
      );

    const data: sheets_v4.Schema$ValueRange[] =
      [];

    for (const result of ownResults) {
      if (!result.rowNumber) {
        continue;
      }

      const row =
        Number(result.rowNumber);

      if (Number.isNaN(row) || row < 2) {
        continue;
      }

      if (
        uuidCol >= 0 &&
        result.uuid
      ) {
        data.push({
          range: `${this.sheetName}!${this.columnLetter(
            uuidCol,
          )}${row}`,
          values: [[result.uuid]],
        });
      }

      if (statusCol >= 0) {
        data.push({
          range: `${this.sheetName}!${this.columnLetter(
            statusCol,
          )}${row}`,
          values: [[result.status]],
        });
      }

      if (messageCol >= 0) {
        data.push({
          range: `${this.sheetName}!${this.columnLetter(
            messageCol,
          )}${row}`,
          values: [
            [result.message ?? ''],
          ],
        });
      }

      if (timeCol >= 0) {
        data.push({
          range: `${this.sheetName}!${this.columnLetter(
            timeCol,
          )}${row}`,
          values: [
            [
              new Date().toISOString(),
            ],
          ],
        });
      }
    }

    if (!data.length) {
      return;
    }

    await this.sheets.spreadsheets.values.batchUpdate(
      {
        spreadsheetId:
          this.spreadsheetId,
        requestBody: {
          valueInputOption: 'RAW',
          data,
        },
      },
    );
  }

  private async ensureStatusColumns(): Promise<
    string[]
  > {
    const response =
      await this.sheets.spreadsheets.values.get(
        {
          spreadsheetId:
            this.spreadsheetId,
          range: `${this.sheetName}!1:1`,
        },
      );

    const headers: string[] = (
      response.data.values?.[0] ?? []
    ).map(String);

    const requiredColumns = [
      'uuid',
      'sync_status',
      'sync_message',
      'sync_time',
    ];

    const missingColumns =
      requiredColumns.filter(
        (column) =>
          !headers.includes(column),
      );

    if (!missingColumns.length) {
      return headers;
    }

    const updatedHeaders = [
      ...headers,
      ...missingColumns,
    ];

    await this.sheets.spreadsheets.values.update(
      {
        spreadsheetId:
          this.spreadsheetId,
        range: `${this.sheetName}!1:1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [updatedHeaders],
        },
      },
    );

    return updatedHeaders;
  }

  private getColumnIndex(
    headers: string[],
    columnName: string,
  ): number {
    return headers.findIndex(
      (header) =>
        header.trim() ===
        columnName,
    );
  }

  /**
   * 0 => A
   * 1 => B
   * 25 => Z
   * 26 => AA
   */
  private columnLetter(
    zeroBasedIndex: number,
  ): string {
    let dividend =
      zeroBasedIndex + 1;

    let columnName = '';

    while (dividend > 0) {
      const modulo =
        (dividend - 1) % 26;

      columnName =
        String.fromCharCode(
          65 + modulo,
        ) + columnName;

      dividend = Math.floor(
        (dividend - modulo) / 26,
      );
    }

    return columnName;
  }
}