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
  process.env.GOOGLE_CLIENT_EMAIL || 'forms-sheets-access@forms-490723.iam.gserviceaccount.com';
process.env.GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAQN5mnRlpfQxR\nKj8QZCMv8O8Rlga+kMjTeoEPn9Jvsxn7h/vBvYWI7F4PrgXKxdfJRidJjDVjOZKR\ngaUuniQhtvMppViycliehn3BbSXd4o8ToSLxGmyfgBAargE/lhCZfitRyBKl+KWD\nxY2uAyKeEvOH+m8qLExRD7aPVYLfHuArh4j5l7STLjFMkJLRraWlLrJWU9fOMaOu\n4rQKBoIZK9kn6wHXTKrkTE6jLnT5myarmUZIWFpL+7hmUnkJWMKugZcCEpjRwTQM\nWf/pe+9SdSxWi5g3YaLWF9JI1P7OMmz1kSzCKDgX92QNPPrYv9FF/JJTC+QDS4j0\nT2SmwuNBAgMBAAECggEABRvGcasCa9rfoumgwIFR0XgDeRkDKgJK4YhDgs+hOmzj\nnm1pKkvjM57I1H3Ut9rrrT3EQqBUkIz6zFS3kzZlraw8Q5UHwFPWpmsj4XMJT2hW\nmzhZwsSeaSRMABvF1m79hMjlMKP7fShhZGIfLe8aQBh4P5GYSOJPTx3SV7+Jpv7t\nPBwRD1HSCC9Rjd5FcDOhyT5KIK4BSa+4qPvLrBEJxQtvkkvZ7efj6dheQpO3sAep\nZget2o8V6P6+Oy4yU/niXMZLuANa8Rr6AY3gjvmnQ4W9BmSl2vpAKhU3S6QjWGHg\nISpkcXYF16zszmvu+Z2zEld0p7AoSkwDllzy0/zPYQKBgQDnDfZJfPByrEdQniyr\nV4HDv0tgeq9x3BxNhwO+vg4c76hkCR/WXlBsY9LsyaABi8gpcsNxGAPBtlQe+dUQ\nmkPJ1aLDTgGY2V5sA9qQ79COInAPFM+b1ViHFPWTGAPkWVJo+WzaVBZC+8KpyP8u\nvuwlb2PhjeB0FepW8sHDPB9gbQKBgQDVAn64qvpOVWtuY2am+ik89HOP1f6UnOG1\nJNJjJryGX492oTWnHn+RXjOPXd1qxZPG1U0M7pX3M9IifIN8hv3dB3q/n4mn/jxw\nQXgb0A6CqHWZJGxbMZeT/4NnbaJrpzk8XbgOqS6UNvlkeCFzauq2iup9O+o2O/ZG\nsw6xyRyRpQKBgQDhB4QaxogX5xn9tk+jALLtRl3PNS2yIsGd8CUBnHB6Vh8WbpyH\nV4vURNSksSoY1162n4MhnlXqT/1VvdR5OwVSibLfrBV6HBoN8SLpjeb8xyWESqx4\nBS0XQp56CCWiPCw6+NG/Qa38xt4sJgoCKQgs3XPVtSwpYz68N+nmj6OvcQKBgGuM\nwPL40T0v//hSlAgHEz9Fpfuf7tSWiZfuqZOKgXHPWh5psy9YRMzfJWVj3WIFtGGW\nXTsEVA/myFjFSZZcil1JY37RTK3Xvihnxf81A76Q1B+otlUtKv1865oTTwjP/CQw\npbgxT+ViBHXn+evOtgfJCDCHSfBsQiLcUbUOeDBJAoGAMKxJAeiOx90vuK0W8DIr\n29G5V6BTH4643JkgX8foOAIbYzKOdIp+KYBpvecPQtGJDHclVARERlpbAEuPnS/n\nuiZlatAXzqjXQUdQUS6Wy0NmxOZ72Qgb1Mi36mRKfdjjnIAmXUhJFyen2rov5ngk\nHvrwo/iCcTTGUV9gwCV158o=\n-----END PRIVATE KEY-----\n`;

const SPREADSHEET_ID = process.env.TEST_SPREADSHEET_ID || '1R-_kjNjgfNm2KNoeS1-40BX6WTJ_ODj-7m7E35S_vu4';

type LookupMaps = {
  uomCategories: Map<string, string>;
  uoms: Map<string, string>;
  itemCategories: Map<string, string>;
  classifications: Map<string, string>;
  pharmaceutics: Map<string, string>;
  generics: Map<string, string>;
  drugComponents: Map<string, string>;
};

function newLookupMaps(): LookupMaps {
  return {
    uomCategories: new Map(),
    uoms: new Map(),
    itemCategories: new Map(),
    classifications: new Map(),
    pharmaceutics: new Map(),
    generics: new Map(),
    drugComponents: new Map(),
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

async function ensureNotFound(
  dataSource: DataSource,
  table: string,
  organizationId: string,
  codeField: string,
  extraFields: Record<string, any>,
  conflictClause?: string,
): Promise<string> {
  const rows: Array<{ id: string }> = await dataSource.query(
    `SELECT id FROM ${table} WHERE organization_id = $1 AND ${codeField} = $2 LIMIT 1`,
    [organizationId, 'Not Found'],
  );
  if (rows.length > 0) return rows[0].id;

  const columns = ['id', 'organization_id', codeField];
  const values: any[] = [randomUUID(), organizationId, 'Not Found'];
  for (const [field, val] of Object.entries(extraFields)) {
    columns.push(field);
    values.push(val);
  }
  const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

  if (conflictClause === '') {
    await dataSource.query(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
      values,
    );
  } else {
    const conflict = conflictClause || `(organization_id, ${codeField})`;
    await dataSource.query(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders}) ON CONFLICT ${conflict} DO NOTHING`,
      values,
    );
  }

  const rows2: Array<{ id: string }> = await dataSource.query(
    `SELECT id FROM ${table} WHERE organization_id = $1 AND ${codeField} = $2 LIMIT 1`,
    [organizationId, 'Not Found'],
  );
  return rows2[0].id;
}

async function upsertByCode(
  dataSource: DataSource,
  table: string,
  organizationId: string,
  row: Record<string, any>,
  code_to_column: Record<string, string>,
  extra: string[],
): Promise<{ id: string; result: RowSyncResult }> {
  const uuid = safeText(row.uuid);
  const code = safeText(row.code);
  const rowNumber = row._rowNumber;

  if (!code) {
    return { id: '', result: { rowNumber, code: '', sheet: table, status: 'ERROR', message: 'No code' } };
  }

  let id: string | null = null;

  // Try by uuid first
  if (uuid) {
    const rows: Array<{ id: string }> = await dataSource.query(
      `SELECT id FROM ${table} WHERE id = $1 LIMIT 1`,
      [uuid],
    );
    if (rows.length > 0) {
      id = rows[0].id;
    }
  }

  // Try by (org, code)
  if (!id) {
    const rows: Array<{ id: string }> = await dataSource.query(
      `SELECT id FROM ${table} WHERE organization_id = $1 AND code = $2 LIMIT 1`,
      [organizationId, code],
    );
    if (rows.length > 0) {
      id = rows[0].id;
    }
  }

  const now = new Date().toISOString();
  const setClauses: string[] = [];
  const setValues: any[] = [];
  let paramIdx = 1;

  for (const [field, col] of Object.entries(code_to_column)) {
    const val = row[col];
    if (val !== undefined && val !== null && val !== '') {
      setClauses.push(`${field} = $${paramIdx++}`);
      setValues.push(val);
    }
  }

  if (uuid && (!id || id !== uuid)) {
    setClauses.push(`id = $${paramIdx++}`);
    setValues.push(uuid);
  }

  setClauses.push(`updated_at = $${paramIdx++}`);
  setValues.push(now);

  if (id) {
    if (setClauses.length > 1) {
      // Remove the updated_at we just added to figure out if there are other clauses
      setValues.pop();
      paramIdx--;
      // Only update if there's something beyond updated_at
      if (setClauses.length > 1) {
        setClauses.push(`updated_at = $${paramIdx++}`);
        setValues.push(now);
        setValues.push(id);
        await dataSource.query(
          `UPDATE ${table} SET ${setClauses.join(', ')} WHERE id = $${paramIdx}`,
          setValues,
        );
      }
    }
  } else {
    id = randomUUID();
    const columns = ['id', 'organization_id', 'code'];
    const insertValues: any[] = [id, organizationId, code];

    for (const [field, col] of Object.entries(code_to_column)) {
      const val = row[col];
      if (val !== undefined && val !== null && val !== '') {
        columns.push(field);
        insertValues.push(val);
      }
    }

    const placeholders = insertValues.map((_, i) => `$${i + 1}`).join(', ');
    await dataSource.query(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders}) ON CONFLICT (organization_id, code) DO UPDATE SET ${Object.entries(code_to_column).map(([field, col], i) => `${field} = EXCLUDED.${field}`).join(', ')}`,
      insertValues,
    );
  }

  return {
    id,
    result: {
      rowNumber,
      uuid: id,
      code,
      sheet: table,
      status: 'SUCCESS',
    
    },
  };
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

async function importUomCategories(
  dataSource: DataSource,
  rows: Record<string, any>[],
  organizationId: string,
  lookups: LookupMaps,
  results: RowSyncResult[],
): Promise<void> {
  const table = 'uom_categories';
  let updated = 0, inserted = 0, skipped = 0;

  for (const row of rows) {
    const uuid = safeText(row.uuid);
    const code = safeText(row.code);
    if (!code) { skipped++; continue; }

    const rowNumber = row._rowNumber;

    try {
      // Check by uuid
      if (uuid) {
        const existing: Array<{ id: string }> = await dataSource.query(
          `SELECT id FROM ${table} WHERE id = $1 LIMIT 1`,
          [uuid],
        );
        if (existing.length > 0) {
          await dataSource.query(
            `UPDATE ${table} SET name = $1, updated_at = $2 WHERE id = $3`,
            [safeText(row.name) || code, new Date().toISOString(), uuid],
          );
          lookups.uomCategories.set(code, uuid);
          results.push({ rowNumber, uuid, code, sheet: 'uom_category', status: 'SUCCESS' });
          updated++;
          continue;
        }
      }

      // Check by (org, code)
      const existing: Array<{ id: string }> = await dataSource.query(
        `SELECT id FROM ${table} WHERE organization_id = $1 AND code = $2 LIMIT 1`,
        [organizationId, code],
      );
      if (existing.length > 0) {
        const existingId = existing[0].id;
        lookups.uomCategories.set(code, existingId);
        results.push({ rowNumber, uuid: existingId, code, sheet: 'uom_category', status: 'SUCCESS' });
        updated++;
        continue;
      }

    // Insert — unique constraint is (org, name)
    const id = uuid || randomUUID();
    await dataSource.query(
      `INSERT INTO ${table} (id, organization_id, code, name) VALUES ($1, $2, $3, $4) ON CONFLICT (organization_id, name) DO UPDATE SET code = EXCLUDED.code`,
      [id, organizationId, code, safeText(row.name) || code],
    );
      lookups.uomCategories.set(code, id);
      results.push({ rowNumber, uuid: id, code, sheet: 'uom_category', status: 'SUCCESS' });
      inserted++;
    } catch (err) {
      console.error(`    ERROR row ${rowNumber} [uom_category] code="${code}": ${err instanceof Error ? err.message : err}`);
      results.push({ rowNumber, code, sheet: 'uom_category', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  console.log(`    uom_category done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped`);
}

async function importUoms(
  dataSource: DataSource,
  rows: Record<string, any>[],
  organizationId: string,
  lookups: LookupMaps,
  results: RowSyncResult[],
): Promise<void> {
  const table = 'uoms';
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

      const categoryCode = safeText(row.uom_category_code);
      let categoryId: string | null = null;
      if (categoryCode) {
        categoryId = lookups.uomCategories.get(categoryCode) || null;
        if (!categoryId) console.warn(`    WARN row ${rowNumber}: uom_category_code "${categoryCode}" not found in lookup for UOM "${code}"`);
      }

      const name = safeText(row.name) || code;
      const uomType = (safeText(row.uomType) || 'reference') as 'reference' | 'bigger' | 'smaller';
      const factor = toNum(row.factor) ?? 1;
      const rounding = toNum(row.rounding) ?? 0.01;
      const isActive = toBool(row.active);

      if (id) {
        const sets: string[] = [];
        const vals: any[] = [];
        let idx = 1;

        sets.push(`code = $${idx++}`); vals.push(code);
        sets.push(`name = $${idx++}`); vals.push(name);
        sets.push(`category_id = $${idx++}`); vals.push(categoryId);
        sets.push(`uom_type = $${idx++}`); vals.push(uomType);
        sets.push(`factor = $${idx++}`); vals.push(factor);
        sets.push(`rounding = $${idx++}`); vals.push(rounding);
        sets.push(`is_active = $${idx++}`); vals.push(isActive);
        sets.push(`updated_at = $${idx++}`); vals.push(new Date().toISOString());
        vals.push(id);

        await dataSource.query(
          `UPDATE ${table} SET ${sets.join(', ')} WHERE id = $${idx}`,
          vals,
        );
        updated++;
    } else {
        id = randomUUID();
        await dataSource.query(
        `INSERT INTO ${table} (id, organization_id, code, name, category_id, uom_type, factor, rounding, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [id, organizationId, code, name, categoryId, uomType, factor, rounding, isActive],
      );
      inserted++;
    }

      lookups.uoms.set(code, id);
      results.push({ rowNumber, uuid: id, code, sheet: 'uom', status: 'SUCCESS' });
    } catch (err) {
      console.error(`    ERROR row ${rowNumber} [uom] code="${code}": ${err instanceof Error ? err.message : err}`);
      results.push({ rowNumber, code, sheet: 'uom', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  console.log(`    uom done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped`);
}

async function importItemCategories(
  dataSource: DataSource,
  rows: Record<string, any>[],
  organizationId: string,
  lookups: LookupMaps,
  results: RowSyncResult[],
): Promise<void> {
  const table = 'item_categories';
  let updated = 0, inserted = 0, skipped = 0, parentSet = 0;

  // First pass: insert/update all categories without parent
  for (const row of rows) {
    const uuid = safeText(row.uuid);
    const code = safeText(row.code);
    if (!code) { skipped++; continue; }
    const rowNumber = row._rowNumber;
    const name = safeText(row.name) || code;

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

      if (id) {
        await dataSource.query(
          `UPDATE ${table} SET name = $1, updated_at = $2 WHERE id = $3`,
          [name, new Date().toISOString(), id],
        );
        updated++;
      } else {
        id = randomUUID();
        await dataSource.query(
          `INSERT INTO ${table} (id, organization_id, code, name) VALUES ($1, $2, $3, $4) ON CONFLICT (organization_id, code) DO UPDATE SET name = EXCLUDED.name`,
          [id, organizationId, code, name],
        );
        inserted++;
      }

      lookups.itemCategories.set(code, id);
      results.push({ rowNumber, uuid: id, code, sheet: 'item_category', status: 'SUCCESS' });
    } catch (err) {
      console.error(`    ERROR row ${rowNumber} [item_category] code="${code}": ${err instanceof Error ? err.message : err}`);
      results.push({ rowNumber, code, sheet: 'item_category', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  // Second pass: set parent_id based on parent_code
  for (const row of rows) {
    const code = safeText(row.code);
    const parentCode = safeText(row.parent_code);
    if (!code || !parentCode) continue;

    const childId = lookups.itemCategories.get(code);
    const parentId = lookups.itemCategories.get(parentCode);
    if (childId && parentId) {
      await dataSource.query(
        `UPDATE ${table} SET parent_id = $1, updated_at = $2 WHERE id = $3 AND (parent_id IS NULL OR parent_id <> $1)`,
        [parentId, new Date().toISOString(), childId],
      );
      parentSet++;
    } else if (childId && !parentId) {
      console.warn(`    WARN: parent_code "${parentCode}" not found for item_category "${code}" — parent not set`);
    }
  }

  console.log(`    item_category done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped, ${parentSet} parent links set`);
}

async function importClassifications(
  dataSource: DataSource,
  rows: Record<string, any>[],
  organizationId: string,
  lookups: LookupMaps,
  results: RowSyncResult[],
): Promise<void> {
  const table = 'classifications';
  let updated = 0, inserted = 0, skipped = 0;

  for (const row of rows) {
    const uuid = safeText(row.uuid);
    const code = safeText(row.code);
    if (!code) { skipped++; continue; }
    const rowNumber = row._rowNumber;
    const name = safeText(row.name) || code;

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

      if (id) {
        await dataSource.query(
          `UPDATE ${table} SET name = $1, updated_at = $2 WHERE id = $3`,
          [name, new Date().toISOString(), id],
        );
        updated++;
      } else {
        id = randomUUID();
        await dataSource.query(
          `INSERT INTO ${table} (id, organization_id, code, name) VALUES ($1, $2, $3, $4) ON CONFLICT (organization_id, code) DO UPDATE SET name = EXCLUDED.name`,
          [id, organizationId, code, name],
        );
        inserted++;
      }

      lookups.classifications.set(code, id);
      results.push({ rowNumber, uuid: id, code, sheet: 'classification', status: 'SUCCESS' });
    } catch (err) {
      console.error(`    ERROR row ${rowNumber} [classification] code="${code}": ${err instanceof Error ? err.message : err}`);
      results.push({ rowNumber, code, sheet: 'classification', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  console.log(`    classification done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped`);
}

async function importPharmaceutics(
  dataSource: DataSource,
  rows: Record<string, any>[],
  organizationId: string,
  lookups: LookupMaps,
  results: RowSyncResult[],
): Promise<void> {
  const table = 'pharmaceutics';
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

      const clinicalName = safeText(row.clinicalName);
      const drugClass = safeText(row.drugClass);
      const pharmacology = safeText(row.pharmacology);
      const indications = safeText(row.indications);
      const contraindications = safeText(row.contraindications);
      const mechanism = safeText(row.mechanism);

      if (id) {
        const sets = [
          `clinical_name = $1`,
          `drug_class = $2`,
          `pharmaceutics = $3`,
          `indications = $4`,
          `contraindications = $5`,
          `mechanism = $6`,
          `updated_at = $7`,
        ];
        const vals = [clinicalName, drugClass, pharmacology, indications, contraindications, mechanism, new Date().toISOString(), id];
        await dataSource.query(
          `UPDATE ${table} SET ${sets.join(', ')} WHERE id = $8`,
          vals,
        );
        updated++;
      } else {
        id = randomUUID();
        await dataSource.query(
          `INSERT INTO ${table} (id, organization_id, code, clinical_name, drug_class, pharmaceutics, indications, contraindications, mechanism) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (organization_id, code) DO UPDATE SET clinical_name = EXCLUDED.clinical_name, drug_class = EXCLUDED.drug_class, pharmaceutics = EXCLUDED.pharmaceutics, indications = EXCLUDED.indications, contraindications = EXCLUDED.contraindications, mechanism = EXCLUDED.mechanism`,
          [id, organizationId, code, clinicalName, drugClass, pharmacology, indications, contraindications, mechanism],
        );
        inserted++;
      }

      lookups.pharmaceutics.set(code, id);
      results.push({ rowNumber, uuid: id, code, sheet: 'pharmaceutical_index', status: 'SUCCESS' });
    } catch (err) {
      console.error(`    ERROR row ${rowNumber} [pharmaceutical_index] code="${code}": ${err instanceof Error ? err.message : err}`);
      results.push({ rowNumber, code, sheet: 'pharmaceutical_index', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  console.log(`    pharmaceutical_index done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped`);
}

async function importDrugs(
  dataSource: DataSource,
  rows: Record<string, any>[],
  organizationId: string,
  lookups: LookupMaps,
  results: RowSyncResult[],
): Promise<void> {
  const genericTable = 'generic_products';
  const componentTable = 'drug_components';

  // Collect all unique drug component names from all rows
  const allComponentNames = new Set<string>();
  for (const row of rows) {
    const namesStr = safeText(row.drugComponentNames);
    if (namesStr) {
      for (const name of namesStr.split(',').map(s => s.trim()).filter(Boolean)) {
        allComponentNames.add(name);
      }
    }
  }

  console.log(`    Parsed ${allComponentNames.size} unique drug component names across ${rows.length} drug rows`);

  // Ensure "Not Found" component exists (constraint is (org, name))
  await ensureNotFound(dataSource, componentTable, organizationId, 'name', {});

  // Upsert all drug components
  let compInserted = 0, compExisting = 0;
  for (const name of allComponentNames) {
    const existing: Array<{ id: string }> = await dataSource.query(
      `SELECT id FROM ${componentTable} WHERE organization_id = $1 AND name = $2 LIMIT 1`,
      [organizationId, name],
    );
    if (existing.length > 0) {
      lookups.drugComponents.set(name, existing[0].id);
      compExisting++;
    } else {
      const id = randomUUID();
      await dataSource.query(
        `INSERT INTO ${componentTable} (id, organization_id, name) VALUES ($1, $2, $3) ON CONFLICT (organization_id, name) DO NOTHING`,
        [id, organizationId, name],
      );
      lookups.drugComponents.set(name, id);
      compInserted++;
    }
  }
  console.log(`    Drug components: ${compInserted} created, ${compExisting} existing`);

  // Upsert generic products
  let updated = 0, inserted = 0, skipped = 0, linksSet = 0, notFoundPharm = 0;

  for (const row of rows) {
    const uuid = safeText(row.uuid);
    const code = safeText(row.code);
    if (!code) { skipped++; continue; }
    const rowNumber = row._rowNumber;

    try {
      let id: string | null = null;

      if (uuid) {
        const existing: Array<{ id: string }> = await dataSource.query(
          `SELECT id FROM ${genericTable} WHERE id = $1 LIMIT 1`,
          [uuid],
        );
        if (existing.length > 0) id = existing[0].id;
      }

      if (!id) {
        const existing: Array<{ id: string }> = await dataSource.query(
          `SELECT id FROM ${genericTable} WHERE organization_id = $1 AND code = $2 LIMIT 1`,
          [organizationId, code],
        );
        if (existing.length > 0) id = existing[0].id;
      }

      const name = safeText(row.name) || code;
      const therapeuticClass = safeText(row.therapeuticClass);
      const generalUse = safeText(row.generalUse) || '';
      const adultDosage = safeText(row.adultDosage) || '';
      const pediatricDosage = safeText(row.pediatricDosage) || '';

      // Resolve pharmaceutics FK
      const pharmCode = safeText(row.pharmaceuticsCode);
      let pharmId: string | null = null;
      if (pharmCode) {
        pharmId = lookups.pharmaceutics.get(pharmCode) || null;
        if (!pharmId) {
          pharmId = await ensureNotFound(dataSource, 'pharmaceutics', organizationId, 'code', {});
          notFoundPharm++;
          console.warn(`    WARN row ${rowNumber}: pharmaceuticsCode "${pharmCode}" not found, using "Not Found" fallback for "${code}"`);
        }
      }

      if (id) {
        const sets = [
          `name = $1`,
          `therapeutic_class = $2`,
          `general_use = $3`,
          `adult_dosage = $4`,
          `pediatric_dosage = $5`,
          `pharmaceutics_id = $6`,
          `updated_at = $7`,
        ];
        const vals = [name, therapeuticClass, generalUse, adultDosage, pediatricDosage, pharmId, new Date().toISOString(), id];
        await dataSource.query(
          `UPDATE ${genericTable} SET ${sets.join(', ')} WHERE id = $8`,
          vals,
        );
        updated++;
      } else {
        id = randomUUID();
        await dataSource.query(
          `INSERT INTO ${genericTable} (id, organization_id, code, name, therapeutic_class, general_use, adult_dosage, pediatric_dosage, pharmaceutics_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (organization_id, code) DO UPDATE SET name = EXCLUDED.name, therapeutic_class = EXCLUDED.therapeutic_class, general_use = EXCLUDED.general_use, adult_dosage = EXCLUDED.adult_dosage, pediatric_dosage = EXCLUDED.pediatric_dosage, pharmaceutics_id = EXCLUDED.pharmaceutics_id`,
          [id, organizationId, code, name, therapeuticClass, generalUse, adultDosage, pediatricDosage, pharmId],
        );
        inserted++;
      }

      lookups.generics.set(code, id);
      results.push({ rowNumber, uuid: id, code, sheet: 'drug', status: 'SUCCESS' });

      // Link drug components to pharmaceutics via join table
      if (pharmId) {
        const namesStr = safeText(row.drugComponentNames);
        if (namesStr) {
          await dataSource.query(
            `DELETE FROM pharmaceutics_drug_components WHERE pharmaceutics_id = $1`,
            [pharmId],
          );
          for (const compName of namesStr.split(',').map(s => s.trim()).filter(Boolean)) {
            const compId = lookups.drugComponents.get(compName);
            if (compId) {
              await dataSource.query(
                `INSERT INTO pharmaceutics_drug_components (pharmaceutics_id, drug_component_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
                [pharmId, compId],
              );
              linksSet++;
            }
          }
        }
      }
    } catch (err) {
      console.error(`    ERROR row ${rowNumber} [drug] code="${code}": ${err instanceof Error ? err.message : err}`);
      results.push({ rowNumber, code, sheet: 'drug', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  console.log(`    drug done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped, ${linksSet} component links, ${notFoundPharm} "Not Found" pharmaceutics fallbacks`);
}

async function importItems(
  dataSource: DataSource,
  rows: Record<string, any>[],
  organizationId: string,
  lookups: LookupMaps,
  results: RowSyncResult[],
): Promise<void> {
  const table = 'items';
  let updated = 0, inserted = 0, skipped = 0;
  let notFoundCat = 0, notFoundGen = 0, notFoundUom = 0;

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
      const isActive = toBool(row.active);
      const trackLot = row.tracking ? row.tracking.toLowerCase() === 'lot' : false;
      const barcode = safeText(row.barcode);

      // Resolve FKs
      const catCode = safeText(row.category_code);
      let catId: string | null = null;
      if (catCode) {
        catId = lookups.itemCategories.get(catCode) || null;
        if (!catId) {
          catId = await ensureNotFound(dataSource, 'item_categories', organizationId, 'code', { name: 'Not Found' });
          notFoundCat++;
          console.warn(`    WARN row ${rowNumber}: category_code "${catCode}" not found for item "${code}", using "Not Found" fallback`);
        }
      }

      const drugCode = safeText(row.drug_code);
      let genId: string | null = null;
      if (drugCode) {
        genId = lookups.generics.get(drugCode) || null;
        if (!genId) {
          const notFoundPharmId = await ensureNotFound(dataSource, 'pharmaceutics', organizationId, 'code', {});
          genId = await ensureNotFound(dataSource, 'generic_products', organizationId, 'code', { name: 'Not Found', general_use: '', adult_dosage: '', pediatric_dosage: '', pharmaceutics_id: notFoundPharmId });
          notFoundGen++;
          console.warn(`    WARN row ${rowNumber}: drug_code "${drugCode}" not found for item "${code}", using "Not Found" fallback`);
        }
      }

      const uomCode = safeText(row.uomCode);
      let baseUomId: string | null = null;
      if (uomCode) {
        baseUomId = lookups.uoms.get(uomCode) || null;
        if (!baseUomId) {
          baseUomId = await ensureNotFound(dataSource, 'uoms', organizationId, 'code', { name: 'Not Found', category_id: null }, '');
          notFoundUom++;
          console.warn(`    WARN row ${rowNumber}: uomCode "${uomCode}" not found for item "${code}", using "Not Found" fallback`);
        }
      }

      const purchaseUomCode = safeText(row.purchase_uom_code);
      let purchaseUomId: string | null = null;
      if (purchaseUomCode) {
        purchaseUomId = lookups.uoms.get(purchaseUomCode) || null;
        if (!purchaseUomId) {
          purchaseUomId = baseUomId;
          console.warn(`    WARN row ${rowNumber}: purchase_uom_code "${purchaseUomCode}" not found for item "${code}", defaulting to baseUom`);
        }
      }

      const saleUomId = baseUomId; // Default saleUomId to baseUomId

      if (id) {
        const sets = [
          `name = $1`,
          `category_id = $2`,
          `generic_product_id = $3`,
          `base_uom_id = $4`,
          `purchase_uom_id = $5`,
          `sale_uom_id = $6`,
          `barcode = $7`,
          `track_lot = $8`,
          `is_active = $9`,
          `updated_at = $10`,
        ];
        const vals = [name, catId, genId, baseUomId, purchaseUomId, saleUomId, barcode, trackLot, isActive, new Date().toISOString(), id];
        await dataSource.query(
          `UPDATE ${table} SET ${sets.join(', ')} WHERE id = $11`,
          vals,
        );
        updated++;
      } else {
        id = randomUUID();
        await dataSource.query(
          `INSERT INTO ${table} (id, organization_id, code, name, category_id, generic_product_id, base_uom_id, purchase_uom_id, sale_uom_id, barcode, track_lot, track_expiry, shelf_life_days, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) ON CONFLICT (organization_id, code) DO UPDATE SET name = EXCLUDED.name, category_id = EXCLUDED.category_id, generic_product_id = EXCLUDED.generic_product_id, base_uom_id = EXCLUDED.base_uom_id, purchase_uom_id = EXCLUDED.purchase_uom_id, sale_uom_id = EXCLUDED.sale_uom_id, barcode = EXCLUDED.barcode, track_lot = EXCLUDED.track_lot, is_active = EXCLUDED.is_active`,
          [id, organizationId, code, name, catId, genId, baseUomId, purchaseUomId, saleUomId, barcode, trackLot, true, 730, isActive],
        );
        inserted++;
      }

      results.push({ rowNumber, uuid: id, code, sheet: 'item', status: 'SUCCESS' });
    } catch (err) {
      console.error(`    ERROR row ${rowNumber} [item] code="${code}": ${err instanceof Error ? err.message : err}`);
      results.push({ rowNumber, code, sheet: 'item', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  console.log(`    item done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped`);
  if (notFoundCat > 0) console.log(`      "Not Found" fallbacks — category: ${notFoundCat}, generic: ${notFoundGen}, uom: ${notFoundUom}`);
}

// ─── Main Export ────────────────────────────────────────────────────────────

export async function seedItemsTemplates(
  dataSource: DataSource,
  _genericMap?: Record<string, string>,
): Promise<void> {
  const organizationId = DEFAULT_ORGANIZATION_ID;
  const sheetReader = new GoogleSheetReaderService();

  const startTime = Date.now();
  console.log('═'.repeat(60));
  console.log('GOOGLE SHEETS SEED — ITEMS TEMPLATES');
  console.log('═'.repeat(60));
  console.log(`  Spreadsheet ID: ${SPREADSHEET_ID}`);
  console.log(`  Organization ID: ${organizationId}`);

  console.log(`\nReading sheet names...`);
  const sheetNames = await sheetReader.getSheetNames(SPREADSHEET_ID);
  console.log(`  Sheets found: ${sheetNames.join(', ')}`);

  const priority = ['uom_category', 'uom', 'item_category', 'classification', 'pharmaceutical_index', 'drug', 'item'];
  const orderedSheets = [...sheetNames].sort((a, b) => {
    const ia = priority.indexOf(a);
    const ib = priority.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  console.log(`\nProcessing order: ${orderedSheets.join(' → ')}`);

  const lookups = newLookupMaps();
  const allResults: RowSyncResult[] = [];

  for (const sheetName of orderedSheets) {
    console.log(`\n─── [${sheetName}] ────────────────────────────────`);
    const sheetStart = Date.now();

    const rows = await sheetReader.getRows(SPREADSHEET_ID, sheetName);
    if (!rows.length) {
      console.log(`  0 rows, skipping`);
      continue;
    }

    // Attach 1-indexed row numbers (header is row 1, data starts at row 2)
    for (let i = 0; i < rows.length; i++) {
      rows[i]._rowNumber = i + 2;
    }

    console.log(`  Rows: ${rows.length}, Columns: ${Object.keys(rows[0]).join(', ')}`);

    switch (sheetName) {
      case 'uom_category':
        await importUomCategories(dataSource, rows, organizationId, lookups, allResults);
        await loadLookupMap(dataSource, 'uom_categories', organizationId, lookups.uomCategories);
        break;
      case 'uom':
        await importUoms(dataSource, rows, organizationId, lookups, allResults);
        await loadLookupMap(dataSource, 'uoms', organizationId, lookups.uoms);
        break;
      case 'item_category':
        await importItemCategories(dataSource, rows, organizationId, lookups, allResults);
        await loadLookupMap(dataSource, 'item_categories', organizationId, lookups.itemCategories);
        break;
      case 'classification':
        await importClassifications(dataSource, rows, organizationId, lookups, allResults);
        await loadLookupMap(dataSource, 'classifications', organizationId, lookups.classifications);
        break;
      case 'pharmaceutical_index':
        await importPharmaceutics(dataSource, rows, organizationId, lookups, allResults);
        await loadLookupMap(dataSource, 'pharmaceutics', organizationId, lookups.pharmaceutics);
        break;
      case 'drug':
        await importDrugs(dataSource, rows, organizationId, lookups, allResults);
        await loadLookupMap(dataSource, 'generic_products', organizationId, lookups.generics);
        break;
      case 'item':
        await importItems(dataSource, rows, organizationId, lookups, allResults);
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
      console.log(`    ... and ${errors.length - 10} more failures (see results for details)`);
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
    await seedItemsTemplates(dataSource, {});
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
