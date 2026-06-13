// google-sheet-import.service.ts

import { Injectable } from '@nestjs/common';

import { GoogleSheetReaderService } from './google-sheet-reader.service';
import { EntityImportService } from '../../entity-import.service';
import { GoogleSheetStatusWriter } from './google-sheet-status-writer';
import { ImportContext } from '../../types';
import { SchemaEvolverService } from '../../../../integration/schema-evolver-service';

@Injectable()
export class GoogleSheetImportService {
  constructor(
    private readonly reader: GoogleSheetReaderService,
    private readonly entityImporter: EntityImportService,
    private readonly schemaEvolver: SchemaEvolverService,
  ) { }

  async importSpreadsheet(spreadsheetId: string) {
    const sheetNames = await this.reader.getSheetNames(spreadsheetId);

    const context = new ImportContext();

    for (const sheetName of sheetNames) {
      const rows = await this.reader.getRows(spreadsheetId, sheetName);
      await this.schemaEvolver.ensureColumns(sheetName, rows, [
        'sync_status',
        'sync_message',
        'sync_time',
      ]);
      if (!rows.length) {
        continue;
      }

      await this.entityImporter.importSheet(sheetName, rows, context);

      const writer = new GoogleSheetStatusWriter(spreadsheetId, sheetName);

      await writer.updateRows(context.results.filter((r) => r.rowNumber > 0));
    }
  }
}