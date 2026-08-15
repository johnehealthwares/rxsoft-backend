import 'dotenv/config';
import { DataSource } from 'typeorm';

import { ImportRegistryService } from '../database/import/import-registry.service';
import { DatabaseImportTarget } from '../database/import/import-targets/database-import-target';
import { ValidationService } from '../database/import/validation.service';
import { AttributeSyncService } from '../database/import/attribute-sync.service';
import { EntityImportService } from '../database/import/entity-import.service';
import { SchemaEvolverService } from './schema-evolver-service';

import { GoogleSheetReaderService } from '../database/import/sheet/google/google-sheet-reader.service';
import { GoogleSheetStatusWriter } from '../database/import/sheet/google/google-sheet-status-writer';
import { randomUUID } from 'crypto';
import { ImportContext } from '../database/import/types';

(async function main() {

  const dbFile = `${__dirname}/rxsoft.db`;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID env var is required');
  }

  console.log('DB:', dbFile);
  console.log('Spreadsheet:', spreadsheetId);

  // ---------------------------
  // DB setup
  // ---------------------------
  const dataSource = new DataSource({
    type: 'sqlite',
    database: dbFile,
    synchronize: false,
    entities: [],
  });

  await dataSource.initialize();

  await dataSource.query(`
    CREATE TABLE IF NOT EXISTS attribute (
      id TEXT PRIMARY KEY,
      code TEXT,
      name TEXT
    )
  `);

  await dataSource.query(`
    CREATE TABLE IF NOT EXISTS attribute_value (
      id TEXT PRIMARY KEY,
      entityType TEXT,
      entityUuid TEXT,
      attributeId INTEGER,
      value TEXT
    )
  `);

  // seed
  await dataSource.query(
    `INSERT INTO attribute (id, code, name) VALUES (?, ?, ?)`,
    [randomUUID(), 'color', 'Color'],
  );

  // ---------------------------
  // services
  // ---------------------------
  const registry = new ImportRegistryService();
  const validationService = new ValidationService();
  const schemaEvolver = new SchemaEvolverService(dataSource);

  const sheetReader = new GoogleSheetReaderService();

  const sheetNames = await sheetReader.getSheetNames(spreadsheetId);
  console.log('Sheets:', sheetNames);

  for (const sheetName of sheetNames) {
    const rows = await sheetReader.getRows(spreadsheetId, sheetName);

    await createTableFromRows(dataSource, sheetName, rows);

    registry.registerTarget(
      sheetName,
      new DatabaseImportTarget(dataSource, sheetName),
    );
  }

  registry.registerTarget(
    'attribute',
    new DatabaseImportTarget(dataSource, 'attribute'),
  );

  registry.registerTarget(
    'attribute_value',
    new DatabaseImportTarget(dataSource, 'attribute_value'),
  );

  // ---------------------------
  // import pipeline
  // ---------------------------
  const attributeRepo = {
    find: async () => dataSource.query('SELECT * FROM attribute'),
  };

  const valueRepo = {
    find: async () => dataSource.query('SELECT * FROM attribute_value'),
    save: async (vals: any[]) => vals,
  };

  const attributeSync = new AttributeSyncService(attributeRepo, valueRepo as any);

  const entityImporter = new EntityImportService(
    registry,
    validationService,
    attributeSync as any,
  );

  // Sort so dependencies come before dependents
  const priority = ['uom_category', 'uom', 'item_category', 'classification', 'drug', 'pharmaceutical_index', 'item'];
  const sheetsToImport = [...sheetNames].sort(
    (a, b) => priority.indexOf(a) - priority.indexOf(b),
  );

  const context = new ImportContext();

  for (const sheetName of sheetsToImport) {
    console.log(`\nImporting: ${sheetName}`);

    const rows = await sheetReader.getRows(spreadsheetId, sheetName);

    await schemaEvolver.ensureColumns(sheetName, rows);

    const report = await entityImporter.importSheet(sheetName, rows, context);

    console.log('Report:', report);

    const writer = new GoogleSheetStatusWriter(
      spreadsheetId,
      sheetName,
    );

    await writer.updateRows(context.results);
  }

  // ---------------------------
  // verify DB output
  // ---------------------------
  const categories = await dataSource.query('SELECT * FROM uom_category');
  const uoms = await dataSource.query('SELECT * FROM uom');

  console.log('\nCategories:', categories.length);
  console.log('UOMs:', uoms.length);

  if (categories.length === 0 || uoms.length === 0) {
    throw new Error('Import failed: missing DB records');
  }

  console.log('\n✅ Import completed successfully');

  await dataSource.destroy();
})().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});


// ---------------------------
// schema helper
// ---------------------------
async function createTableFromRows(
  dataSource: DataSource,
  sheetName: string,
  rows: Record<string, any>[],
  relationSheets: string[] = [],
) {
  if (!rows.length) return;

  const first = rows[0];

  const excludedColumns = new Set([
    'uuid',
    'idq',
    'sync_message',
    'sync_status',
    'sync_time',
  ]);

  const sourceColumns = Object.keys(first);
  const columns: string[] = [];

  for (const column of sourceColumns) {
    if (excludedColumns.has(column)) continue;

    // Skip ${relation}_name columns (display-only reference, not stored in DB)
    if (column.endsWith('_name')) continue;

    columns.push(`"${column}" TEXT`);

    // Detect relation_table_code -> relation_table_id
    const match = column.match(/^(.+)_code$/);

    if (match) {
      const relationTable = match[1];
      const relationIdColumn = `${relationTable}_id`;

      const isRelation =
        relationSheets.length === 0 ||
        relationSheets.includes(relationTable);

      if (
        isRelation &&
        !sourceColumns.includes(relationIdColumn)
      ) {
        columns.push(`"${relationIdColumn}" TEXT`);
      }
    }
  }

  const sql = `
    CREATE TABLE IF NOT EXISTS "${sheetName}" (
      id TEXT PRIMARY KEY,
      ${columns.join(',\n      ')}
    )
  `;

  console.log(sql);
  await dataSource.query(sql);
}