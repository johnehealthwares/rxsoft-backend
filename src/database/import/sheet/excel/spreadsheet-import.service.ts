// spreadsheet-import.service.ts

import * as XLSX from 'xlsx';
import { Injectable } from '@nestjs/common';
import { EntityImportService } from '../../entity-import.service';
import { ExcelStatusWriter } from './excel-status-writer';
import { ImportContext } from '../../types';
import { SchemaEvolverService } from '../../../../integration/schema-evolver-service';

@Injectable()
export class SpreadsheetImportService {
  constructor(
    private readonly entityImporter: EntityImportService,
    private readonly schemaEvolver: SchemaEvolverService,
  ) {}

  async import(filePath: string) {
    const workbook = XLSX.readFile(filePath);

    const context = new ImportContext();

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(
        sheet,
        {
          defval: null,
        },
      );
       await this.schemaEvolver.ensureColumns(sheetName, rows, [
        'sync_status',
        'sync_message',
        'sync_time',
      ]);

      await this.entityImporter.importSheet(
        sheetName,
        rows,
        context,
      );

      // write back statuses and uuids to the excel file
      const writer = new ExcelStatusWriter(
        filePath,
        sheetName,
      );

      await writer.updateRows(context.results.filter(r => r.sheet === sheetName));
    }
  }
}