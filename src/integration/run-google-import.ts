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

process.env.TEST_SPREADSHEET_ID='1R-_kjNjgfNm2KNoeS1-40BX6WTJ_ODj-7m7E35S_vu4';
process.env.GOOGLE_CLIENT_EMAIL='forms-sheets-access@forms-490723.iam.gserviceaccount.com'
process.env.GOOGLE_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAQN5mnRlpfQxR\nKj8QZCMv8O8Rlga+kMjTeoEPn9Jvsxn7h/vBvYWI7F4PrgXKxdfJRidJjDVjOZKR\ngaUuniQhtvMppViycliehn3BbSXd4o8ToSLxGmyfgBAargE/lhCZfitRyBKl+KWD\nxY2uAyKeEvOH+m8qLExRD7aPVYLfHuArh4j5l7STLjFMkJLRraWlLrJWU9fOMaOu\n4rQKBoIZK9kn6wHXTKrkTE6jLnT5myarmUZIWFpL+7hmUnkJWMKugZcCEpjRwTQM\nWf/pe+9SdSxWi5g3YaLWF9JI1P7OMmz1kSzCKDgX92QNPPrYv9FF/JJTC+QDS4j0\nT2SmwuNBAgMBAAECggEABRvGcasCa9rfoumgwIFR0XgDeRkDKgJK4YhDgs+hOmzj\nnm1pKkvjM57I1H3Ut9rrrT3EQqBUkIz6zFS3kzZlraw8Q5UHwFPWpmsj4XMJT2hW\nmzhZwsSeaSRMABvF1m79hMjlMKP7fShhZGIfLe8aQBh4P5GYSOJPTx3SV7+Jpv7t\nPBwRD1HSCC9Rjd5FcDOhyT5KIK4BSa+4qPvLrBEJxQtvkkvZ7efj6dheQpO3sAep\nZget2o8V6P6+Oy4yU/niXMZLuANa8Rr6AY3gjvmnQ4W9BmSl2vpAKhU3S6QjWGHg\nISpkcXYF16zszmvu+Z2zEld0p7AoSkwDllzy0/zPYQKBgQDnDfZJfPByrEdQniyr\nV4HDv0tgeq9x3BxNhwO+vg4c76hkCR/WXlBsY9LsyaABi8gpcsNxGAPBtlQe+dUQ\nmkPJ1aLDTgGY2V5sA9qQ79COInAPFM+b1ViHFPWTGAPkWVJo+WzaVBZC+8KpyP8u\nvuwlb2PhjeB0FepW8sHDPB9gbQKBgQDVAn64qvpOVWtuY2am+ik89HOP1f6UnOG1\nJNJjJryGX492oTWnHn+RXjOPXd1qxZPG1U0M7pX3M9IifIN8hv3dB3q/n4mn/jxw\nQXgb0A6CqHWZJGxbMZeT/4NnbaJrpzk8XbgOqS6UNvlkeCFzauq2iup9O+o2O/ZG\nsw6xyRyRpQKBgQDhB4QaxogX5xn9tk+jALLtRl3PNS2yIsGd8CUBnHB6Vh8WbpyH\nV4vURNSksSoY1162n4MhnlXqT/1VvdR5OwVSibLfrBV6HBoN8SLpjeb8xyWESqx4\nBS0XQp56CCWiPCw6+NG/Qa38xt4sJgoCKQgs3XPVtSwpYz68N+nmj6OvcQKBgGuM\nwPL40T0v//hSlAgHEz9Fpfuf7tSWiZfuqZOKgXHPWh5psy9YRMzfJWVj3WIFtGGW\nXTsEVA/myFjFSZZcil1JY37RTK3Xvihnxf81A76Q1B+otlUtKv1865oTTwjP/CQw\npbgxT+ViBHXn+evOtgfJCDCHSfBsQiLcUbUOeDBJAoGAMKxJAeiOx90vuK0W8DIr\n29G5V6BTH4643JkgX8foOAIbYzKOdIp+KYBpvecPQtGJDHclVARERlpbAEuPnS/n\nuiZlatAXzqjXQUdQUS6Wy0NmxOZ72Qgb1Mi36mRKfdjjnIAmXUhJFyen2rov5ngk\nHvrwo/iCcTTGUV9gwCV158o=\n-----END PRIVATE KEY-----\n'

  const dbFile = `${__dirname}/rxsoft.db`;
  const spreadsheetId = process.env.TEST_SPREADSHEET_ID!;

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