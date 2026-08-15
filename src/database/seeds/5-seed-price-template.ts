import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { GoogleSheetReaderService } from '../import/sheet/google/google-sheet-reader.service';
import { GoogleSheetStatusWriter } from '../import/sheet/google/google-sheet-status-writer';
import { RowSyncResult } from '../import/types';
import { DEFAULT_ORGANIZATION_ID } from '../../shared/constants/persistence-scope';

process.env.GOOGLE_CLIENT_EMAIL =
  process.env.GOOGLE_CLIENT_EMAIL || '';
process.env.GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || '';

const SPREADSHEET_ID: string = process.env.TEST_SPREADSHEET_ID || process.env.GOOGLE_SHEET_ID || '';

// if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
//   throw new Error('GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID env vars are required');
// }

type LookupMaps = {
  priceLists: Map<string, string>;
  items: Map<string, string>;
};

function newLookupMaps(): LookupMaps {
  return {
    priceLists: new Map(),
    items: new Map(),
  };
}

function safeText(val: unknown): string | null {
  if (typeof val !== 'string') return null;
  const trimmed = val.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toBool(val: unknown): boolean {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') return ['true', '1', 'yes', 'y'].includes(val.toLowerCase().trim());
  return false;
}

function toNum(val: unknown): number | null {
  if (val == null) return null;
  if (typeof val === 'number') return val;
  const parsed = parseFloat(String(val));
  return isNaN(parsed) ? null : parsed;
}

async function loadLookupMap(
  dataSource: DataSource,
  table: string,
  organizationId: string,
  map: Map<string, string>,
  codeField: string = 'code',
): Promise<void> {
  const rows: Array<{ id: string; code: string | null }> = await dataSource.query(
    `SELECT id, ${codeField} AS code FROM ${table} WHERE organization_id = $1 AND ${codeField} IS NOT NULL`,
    [organizationId],
  );
  map.clear();
  for (const row of rows) {
    if (row.code) map.set(row.code, row.id);
  }
}

// ─── Sheet Importers ────────────────────────────────────────────────────────

async function importPriceLists(
  dataSource: DataSource,
  rows: Record<string, any>[],
  organizationId: string,
  lookups: LookupMaps,
  results: RowSyncResult[],
): Promise<void> {
  const table = 'price_lists';
  let updated = 0, inserted = 0, skipped = 0;

  for (const row of rows) {
    const uuid = safeText(row.uuid);
    const code = safeText(row.code);
    if (!code) { skipped++; continue; }
    const rowNumber = row._rowNumber;

    try {
      let id: string | null = null;

      if (uuid) {
        const existing: Array<{ id: string }> = await dataSource.query(
          `SELECT id FROM ${table} WHERE id = $1 LIMIT 1`,
          [uuid],
        );
        if (existing.length > 0) id = existing[0].id;
      }

      if (!id) {
        const existing: Array<{ id: string }> = await dataSource.query(
          `SELECT id FROM ${table} WHERE organization_id = $1 AND code = $2 LIMIT 1`,
          [organizationId, code],
        );
        if (existing.length > 0) id = existing[0].id;
      }

      const name = safeText(row.name) || code;
      const isDefault = toBool(row.is_default ?? row.isDefault ?? false);
      const isActive = toBool(row.is_active ?? row.isActive ?? true);

      if (id) {
        await dataSource.query(
          `UPDATE ${table} SET name = $1, is_default = $2, is_active = $3, updated_at = $4 WHERE id = $5`,
          [name, isDefault, isActive, new Date().toISOString(), id],
        );
        updated++;
      } else {
        id = randomUUID();
        await dataSource.query(
          `INSERT INTO ${table} (id, organization_id, code, name, is_default, is_active) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (organization_id, code) DO UPDATE SET name = EXCLUDED.name, is_default = EXCLUDED.is_default, is_active = EXCLUDED.is_active`,
          [id, organizationId, code, name, isDefault, isActive],
        );
        inserted++;
      }

      lookups.priceLists.set(code, id);
      results.push({ rowNumber, uuid: id, code, sheet: 'price_list', status: 'SUCCESS' });
    } catch (err) {
      console.error(`    ERROR row ${rowNumber} [price_list] code="${code}": ${err instanceof Error ? err.message : err}`);
      results.push({ rowNumber, code, sheet: 'price_list', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  console.log(`    price_list done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped`);
}

async function importPriceListItems(
  dataSource: DataSource,
  rows: Record<string, any>[],
  organizationId: string,
  lookups: LookupMaps,
  results: RowSyncResult[],
): Promise<void> {
  const table = 'price_list_items';
  let updated = 0, inserted = 0, skipped = 0;
  let notFoundList = 0, notFoundItem = 0;

  for (const row of rows) {
    const uuid = safeText(row.uuid);
    const code = safeText(row.code);
    const rowNumber = row._rowNumber;

    try {
      // Resolve price_list FK
      const listCode = safeText(row.price_list_code);
      let priceListId: string | null = null;
      if (listCode) {
        priceListId = lookups.priceLists.get(listCode) || null;
        if (!priceListId) {
          console.warn(`    WARN row ${rowNumber}: price_list_code "${listCode}" not found, skipping`);
          skipped++;
          continue;
        }
      } else {
        skipped++;
        continue;
      }

      // Resolve item FK
      const itemCode = safeText(row.item_code);
      let itemId: string | null = null;
      if (itemCode) {
        itemId = lookups.items.get(itemCode) || null;
        if (!itemId) {
          console.warn(`    WARN row ${rowNumber}: item_code "${itemCode}" not found, skipping`);
          skipped++;
          continue;
        }
      } else {
        skipped++;
        continue;
      }

      // Check by uuid
      let id: string | null = null;
      if (uuid) {
        const existing: Array<{ id: string }> = await dataSource.query(
          `SELECT id FROM ${table} WHERE id = $1 LIMIT 1`,
          [uuid],
        );
        if (existing.length > 0) id = existing[0].id;
      }

      const unitPrice = toNum(row.unit_price);
      if (unitPrice === null) {
        console.warn(`    WARN row ${rowNumber}: invalid unit_price for item_code "${itemCode}", skipping`);
        skipped++;
        continue;
      }

      const currencyCode = safeText(row.currency_code) || 'NGN';

      if (id) {
        await dataSource.query(
          `UPDATE ${table} SET price_list_id = $1, item_id = $2, unit_price = $3, currency_code = $4, updated_at = $5 WHERE id = $6`,
          [priceListId, itemId, unitPrice, currencyCode, new Date().toISOString(), id],
        );
        updated++;
      } else {
        id = randomUUID();
        await dataSource.query(
          `INSERT INTO ${table} (id, price_list_id, item_id, unit_price, currency_code) VALUES ($1, $2, $3, $4, $5)`,
          [id, priceListId, itemId, unitPrice, currencyCode],
        );
        inserted++;
      }

      results.push({ rowNumber, uuid: id, code: itemCode, sheet: 'price_list_item', status: 'SUCCESS' });
    } catch (err) {
      console.error(`    ERROR row ${rowNumber} [price_list_item] code="${code || ''}": ${err instanceof Error ? err.message : err}`);
      results.push({ rowNumber, code: code || '', sheet: 'price_list_item', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  console.log(`    price_list_item done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped`);
}

// ─── Main Export ────────────────────────────────────────────────────────────

export async function seedPriceTemplates(
  dataSource: DataSource,
): Promise<void> {
  const organizationId = DEFAULT_ORGANIZATION_ID;
  const sheetReader = new GoogleSheetReaderService();

  const startTime = Date.now();
  console.log('═'.repeat(60));
  console.log('GOOGLE SHEETS SEED — PRICE TEMPLATES');
  console.log('═'.repeat(60));
  console.log(`  Spreadsheet ID: ${SPREADSHEET_ID}`);
  console.log(`  Organization ID: ${organizationId}`);

  console.log(`\nReading sheet names...`);
  const sheetNames = await sheetReader.getSheetNames(SPREADSHEET_ID);
  console.log(`  Sheets found: ${sheetNames.join(', ')}`);

  const priority = ['price_list', 'price_list_item'];
  const orderedSheets = [...sheetNames].sort((a, b) => {
    const ia = priority.indexOf(a);
    const ib = priority.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  console.log(`\nProcessing order: ${orderedSheets.join(' → ')}`);

  const lookups = newLookupMaps();
  const allResults: RowSyncResult[] = [];

  // Pre-load items lookup (items must already be seeded)
  await loadLookupMap(dataSource, 'items', organizationId, lookups.items);

  for (const sheetName of orderedSheets) {
    console.log(`\n─── [${sheetName}] ────────────────────────────────`);
    const sheetStart = Date.now();

    const rows = await sheetReader.getRows(SPREADSHEET_ID, sheetName);
    if (!rows.length) {
      console.log(`  0 rows, skipping`);
      continue;
    }

    for (let i = 0; i < rows.length; i++) {
      rows[i]._rowNumber = i + 2;
    }

    console.log(`  Rows: ${rows.length}, Columns: ${Object.keys(rows[0]).join(', ')}`);

    switch (sheetName) {
      case 'price_list':
        await importPriceLists(dataSource, rows, organizationId, lookups, allResults);
        await loadLookupMap(dataSource, 'price_lists', organizationId, lookups.priceLists);
        break;
      case 'price_list_item':
        await importPriceListItems(dataSource, rows, organizationId, lookups, allResults);
        break;
      default:
        console.log(`  unknown sheet, skipping`);
        break;
    }

    const sheetElapsed = ((Date.now() - sheetStart) / 1000).toFixed(1);
    const sheetResults = allResults.filter(r => r.sheet === sheetName);
    const sheetOk = sheetResults.filter(r => r.status === 'SUCCESS').length;
    const sheetErr = sheetResults.filter(r => r.status === 'ERROR').length;
    console.log(`  ── ${sheetName} finished in ${sheetElapsed}s — ${sheetOk} ok, ${sheetErr} errors`);
  }

  // Write uuids back to sheets
  const writeStart = Date.now();
  console.log(`\n─── Writing uuids back to sheets ───────────────`);
  for (const sheetName of orderedSheets) {
    const sheetWrites = allResults.filter(r => r.sheet === sheetName && r.uuid).length;
    if (sheetWrites === 0) {
      console.log(`  [${sheetName}] no rows to write`);
      continue;
    }
    const writer = new GoogleSheetStatusWriter(SPREADSHEET_ID, sheetName);
    await writer.updateRows(allResults);
    console.log(`  [${sheetName}] wrote ${sheetWrites} uuids`);
  }
  console.log(`  Write-back completed in ${((Date.now() - writeStart) / 1000).toFixed(1)}s`);

  // Final summary
  const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalRows = allResults.length;
  const totalOk = allResults.filter(r => r.status === 'SUCCESS').length;
  const totalErr = allResults.filter(r => r.status === 'ERROR').length;
  const errors = allResults.filter(r => r.status === 'ERROR');

  console.log('\n' + '═'.repeat(60));
  console.log('SEED COMPLETE');
  console.log('═'.repeat(60));
  console.log(`  Total time:  ${totalElapsed}s`);
  console.log(`  Rows processed: ${totalRows}`);
  console.log(`  Succeeded:   ${totalOk}`);
  console.log(`  Failed:      ${totalErr}`);

  if (errors.length > 0) {
    console.log('\n  Failures:');
    for (const e of errors.slice(0, 10)) {
      console.log(`    • [${e.sheet}] row ${e.rowNumber} code="${e.code}": ${e.message}`);
    }
    if (errors.length > 10) {
      console.log(`    ... and ${errors.length - 10} more failures`);
    }
  }

  console.log('');
}

// ─── Standalone CLI Entry Point ────────────────────────────────────────────

async function mainStandalone(): Promise<void> {
  const configService = new ConfigService();

  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: Number(configService.get<string>('DB_PORT', '5432')),
    username: configService.get<string>('DB_USER', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'postgres'),
    database: configService.get<string>('DB_NAME', 'rxsoft'),
  });

  await dataSource.initialize();
  console.log('Connected to PostgreSQL');

  try {
    await seedPriceTemplates(dataSource);
  } finally {
    await dataSource.destroy();
    console.log('Disconnected from PostgreSQL');
  }
}

if (require.main === module) {
  mainStandalone().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
}
