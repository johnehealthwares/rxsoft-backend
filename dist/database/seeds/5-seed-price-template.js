"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPriceTemplates = seedPriceTemplates;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
const config_1 = require("@nestjs/config");
const google_sheet_reader_service_1 = require("../import/sheet/google/google-sheet-reader.service");
const google_sheet_status_writer_1 = require("../import/sheet/google/google-sheet-status-writer");
const persistence_scope_1 = require("../../shared/constants/persistence-scope");
process.env.GOOGLE_CLIENT_EMAIL =
    process.env.GOOGLE_CLIENT_EMAIL || 'forms-sheets-access@forms-490723.iam.gserviceaccount.com';
process.env.GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAQN5mnRlpfQxR\nKj8QZCMv8O8Rlga+kMjTeoEPn9Jvsxn7h/vBvYWI7F4PrgXKxdfJRidJjDVjOZKR\ngaUuniQhtvMppViycliehn3BbSXd4o8ToSLxGmyfgBAargE/lhCZfitRyBKl+KWD\nxY2uAyKeEvOH+m8qLExRD7aPVYLfHuArh4j5l7STLjFMkJLRraWlLrJWU9fOMaOu\n4rQKBoIZK9kn6wHXTKrkTE6jLnT5myarmUZIWFpL+7hmUnkJWMKugZcCEpjRwTQM\nWf/pe+9SdSxWi5g3YaLWF9JI1P7OMmz1kSzCKDgX92QNPPrYv9FF/JJTC+QDS4j0\nT2SmwuNBAgMBAAECggEABRvGcasCa9rfoumgwIFR0XgDeRkDKgJK4YhDgs+hOmzj\nnm1pKkvjM57I1H3Ut9rrrT3EQqBUkIz6zFS3kzZlraw8Q5UHwFPWpmsj4XMJT2hW\nmzhZwsSeaSRMABvF1m79hMjlMKP7fShhZGIfLe8aQBh4P5GYSOJPTx3SV7+Jpv7t\nPBwRD1HSCC9Rjd5FcDOhyT5KIK4BSa+4qPvLrBEJxQtvkkvZ7efj6dheQpO3sAep\nZget2o8V6P6+Oy4yU/niXMZLuANa8Rr6AY3gjvmnQ4W9BmSl2vpAKhU3S6QjWGHg\nISpkcXYF16zszmvu+Z2zEld0p7AoSkwDllzy0/zPYQKBgQDnDfZJfPByrEdQniyr\nV4HDv0tgeq9x3BxNhwO+vg4c76hkCR/WXlBsY9LsyaABi8gpcsNxGAPBtlQe+dUQ\nmkPJ1aLDTgGY2V5sA9qQ79COInAPFM+b1ViHFPWTGAPkWVJo+WzaVBZC+8KpyP8u\nvuwlb2PhjeB0FepW8sHDPB9gbQKBgQDVAn64qvpOVWtuY2am+ik89HOP1f6UnOG1\nJNJjJryGX492oTWnHn+RXjOPXd1qxZPG1U0M7pX3M9IifIN8hv3dB3q/n4mn/jxw\nQXgb0A6CqHWZJGxbMZeT/4NnbaJrpzk8XbgOqS6UNvlkeCFzauq2iup9O+o2O/ZG\nsw6xyRyRpQKBgQDhB4QaxogX5xn9tk+jALLtRl3PNS2yIsGd8CUBnHB6Vh8WbpyH\nV4vURNSksSoY1162n4MhnlXqT/1VvdR5OwVSibLfrBV6HBoN8SLpjeb8xyWESqx4\nBS0XQp56CCWiPCw6+NG/Qa38xt4sJgoCKQgs3XPVtSwpYz68N+nmj6OvcQKBgGuM\nwPL40T0v//hSlAgHEz9Fpfuf7tSWiZfuqZOKgXHPWh5psy9YRMzfJWVj3WIFtGGW\nXTsEVA/myFjFSZZcil1JY37RTK3Xvihnxf81A76Q1B+otlUtKv1865oTTwjP/CQw\npbgxT+ViBHXn+evOtgfJCDCHSfBsQiLcUbUOeDBJAoGAMKxJAeiOx90vuK0W8DIr\n29G5V6BTH4643JkgX8foOAIbYzKOdIp+KYBpvecPQtGJDHclVARERlpbAEuPnS/n\nuiZlatAXzqjXQUdQUS6Wy0NmxOZ72Qgb1Mi36mRKfdjjnIAmXUhJFyen2rov5ngk\nHvrwo/iCcTTGUV9gwCV158o=\n-----END PRIVATE KEY-----\n`;
const SPREADSHEET_ID = process.env.TEST_SPREADSHEET_ID || '1R-_kjNjgfNm2KNoeS1-40BX6WTJ_ODj-7m7E35S_vu4';
function newLookupMaps() {
    return {
        priceLists: new Map(),
        items: new Map(),
    };
}
function safeText(val) {
    if (typeof val !== 'string')
        return null;
    const trimmed = val.trim();
    return trimmed.length > 0 ? trimmed : null;
}
function toBool(val) {
    if (typeof val === 'boolean')
        return val;
    if (typeof val === 'string')
        return ['true', '1', 'yes', 'y'].includes(val.toLowerCase().trim());
    return false;
}
function toNum(val) {
    if (val == null)
        return null;
    if (typeof val === 'number')
        return val;
    const parsed = parseFloat(String(val));
    return isNaN(parsed) ? null : parsed;
}
async function loadLookupMap(dataSource, table, organizationId, map, codeField = 'code') {
    const rows = await dataSource.query(`SELECT id, ${codeField} AS code FROM ${table} WHERE organization_id = $1 AND ${codeField} IS NOT NULL`, [organizationId]);
    map.clear();
    for (const row of rows) {
        if (row.code)
            map.set(row.code, row.id);
    }
}
async function importPriceLists(dataSource, rows, organizationId, lookups, results) {
    const table = 'price_lists';
    let updated = 0, inserted = 0, skipped = 0;
    for (const row of rows) {
        const uuid = safeText(row.uuid);
        const code = safeText(row.code);
        if (!code) {
            skipped++;
            continue;
        }
        const rowNumber = row._rowNumber;
        try {
            let id = null;
            if (uuid) {
                const existing = await dataSource.query(`SELECT id FROM ${table} WHERE id = $1 LIMIT 1`, [uuid]);
                if (existing.length > 0)
                    id = existing[0].id;
            }
            if (!id) {
                const existing = await dataSource.query(`SELECT id FROM ${table} WHERE organization_id = $1 AND code = $2 LIMIT 1`, [organizationId, code]);
                if (existing.length > 0)
                    id = existing[0].id;
            }
            const name = safeText(row.name) || code;
            const isDefault = toBool(row.is_default ?? row.isDefault ?? false);
            const isActive = toBool(row.is_active ?? row.isActive ?? true);
            if (id) {
                await dataSource.query(`UPDATE ${table} SET name = $1, is_default = $2, is_active = $3, updated_at = $4 WHERE id = $5`, [name, isDefault, isActive, new Date().toISOString(), id]);
                updated++;
            }
            else {
                id = (0, crypto_1.randomUUID)();
                await dataSource.query(`INSERT INTO ${table} (id, organization_id, code, name, is_default, is_active) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (organization_id, code) DO UPDATE SET name = EXCLUDED.name, is_default = EXCLUDED.is_default, is_active = EXCLUDED.is_active`, [id, organizationId, code, name, isDefault, isActive]);
                inserted++;
            }
            lookups.priceLists.set(code, id);
            results.push({ rowNumber, uuid: id, code, sheet: 'price_list', status: 'SUCCESS' });
        }
        catch (err) {
            console.error(`    ERROR row ${rowNumber} [price_list] code="${code}": ${err instanceof Error ? err.message : err}`);
            results.push({ rowNumber, code, sheet: 'price_list', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
        }
    }
    console.log(`    price_list done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped`);
}
async function importPriceListItems(dataSource, rows, organizationId, lookups, results) {
    const table = 'price_list_items';
    let updated = 0, inserted = 0, skipped = 0;
    let notFoundList = 0, notFoundItem = 0;
    for (const row of rows) {
        const uuid = safeText(row.uuid);
        const code = safeText(row.code);
        const rowNumber = row._rowNumber;
        try {
            const listCode = safeText(row.price_list_code);
            let priceListId = null;
            if (listCode) {
                priceListId = lookups.priceLists.get(listCode) || null;
                if (!priceListId) {
                    console.warn(`    WARN row ${rowNumber}: price_list_code "${listCode}" not found, skipping`);
                    skipped++;
                    continue;
                }
            }
            else {
                skipped++;
                continue;
            }
            const itemCode = safeText(row.item_code);
            let itemId = null;
            if (itemCode) {
                itemId = lookups.items.get(itemCode) || null;
                if (!itemId) {
                    console.warn(`    WARN row ${rowNumber}: item_code "${itemCode}" not found, skipping`);
                    skipped++;
                    continue;
                }
            }
            else {
                skipped++;
                continue;
            }
            let id = null;
            if (uuid) {
                const existing = await dataSource.query(`SELECT id FROM ${table} WHERE id = $1 LIMIT 1`, [uuid]);
                if (existing.length > 0)
                    id = existing[0].id;
            }
            const unitPrice = toNum(row.unit_price);
            if (unitPrice === null) {
                console.warn(`    WARN row ${rowNumber}: invalid unit_price for item_code "${itemCode}", skipping`);
                skipped++;
                continue;
            }
            const currencyCode = safeText(row.currency_code) || 'NGN';
            if (id) {
                await dataSource.query(`UPDATE ${table} SET price_list_id = $1, item_id = $2, unit_price = $3, currency_code = $4, updated_at = $5 WHERE id = $6`, [priceListId, itemId, unitPrice, currencyCode, new Date().toISOString(), id]);
                updated++;
            }
            else {
                id = (0, crypto_1.randomUUID)();
                await dataSource.query(`INSERT INTO ${table} (id, price_list_id, item_id, unit_price, currency_code) VALUES ($1, $2, $3, $4, $5)`, [id, priceListId, itemId, unitPrice, currencyCode]);
                inserted++;
            }
            results.push({ rowNumber, uuid: id, code: itemCode, sheet: 'price_list_item', status: 'SUCCESS' });
        }
        catch (err) {
            console.error(`    ERROR row ${rowNumber} [price_list_item] code="${code || ''}": ${err instanceof Error ? err.message : err}`);
            results.push({ rowNumber, code: code || '', sheet: 'price_list_item', status: 'ERROR', message: `Exception: ${err instanceof Error ? err.message : String(err)}` });
        }
    }
    console.log(`    price_list_item done: ${inserted} inserted, ${updated} updated/refreshed, ${skipped} skipped`);
}
async function seedPriceTemplates(dataSource) {
    const organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID;
    const sheetReader = new google_sheet_reader_service_1.GoogleSheetReaderService();
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
    const allResults = [];
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
    const writeStart = Date.now();
    console.log(`\n─── Writing uuids back to sheets ───────────────`);
    for (const sheetName of orderedSheets) {
        const sheetWrites = allResults.filter(r => r.sheet === sheetName && r.uuid).length;
        if (sheetWrites === 0) {
            console.log(`  [${sheetName}] no rows to write`);
            continue;
        }
        const writer = new google_sheet_status_writer_1.GoogleSheetStatusWriter(SPREADSHEET_ID, sheetName);
        await writer.updateRows(allResults);
        console.log(`  [${sheetName}] wrote ${sheetWrites} uuids`);
    }
    console.log(`  Write-back completed in ${((Date.now() - writeStart) / 1000).toFixed(1)}s`);
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
async function mainStandalone() {
    const configService = new config_1.ConfigService();
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', '5432')),
        username: configService.get('DB_USER', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_NAME', 'rxsoft'),
    });
    await dataSource.initialize();
    console.log('Connected to PostgreSQL');
    try {
        await seedPriceTemplates(dataSource);
    }
    finally {
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
//# sourceMappingURL=5-seed-price-template.js.map