// google-sheet-reader.service.ts

import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetReaderService {
  private readonly sheets;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email:
          process.env.GOOGLE_CLIENT_EMAIL,
        private_key:
          process.env.GOOGLE_PRIVATE_KEY?.replace(
            /\\n/g,
            '\n',
          ),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets.readonly',
      ],
    });

    this.sheets = google.sheets({
      version: 'v4',
      auth,
    });
  }

  async getWorkbook(
    spreadsheetId: string,
  ) {
    const result =
      await this.sheets.spreadsheets.get({
        spreadsheetId,
      });

    return result.data;
  }

  async getSheetNames(
    spreadsheetId: string,
  ): Promise<string[]> {
    const workbook =
      await this.getWorkbook(
        spreadsheetId,
      );

    return (
      workbook.sheets?.map(
        (s) => s.properties?.title!,
      ) ?? []
    );
  }

  async getRows(
    spreadsheetId: string,
    sheetName: string,
  ): Promise<Record<string, any>[]> {
    const response =
      await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: sheetName,
      });

    const values =
      response.data.values ?? [];

    if (!values.length) {
      return [];
    }

    const headers =
      values[0];

    return values
      .slice(1)
      .map((row) => {
        const record: Record<
          string,
          any
        > = {};

        headers.forEach(
          (header, index) => {
            record[header] =
              row[index] ?? null;
          },
        );

        return record;
      });
  }
}