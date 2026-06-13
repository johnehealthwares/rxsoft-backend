import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as XLSX from 'xlsx';


import { ImportRegistryService } from '../database/import/import-registry.service';
import { DatabaseImportTarget } from '../database/import/import-targets/database-import-target';
import { ValidationService } from '../database/import/validation.service';
import { AttributeSyncService } from '../database/import/attribute-sync.service';
import { EntityImportService } from '../database/import/entity-import.service';
import { SpreadsheetImportService } from '../database/import/sheet/excel/spreadsheet-import.service';
import { ExcelStatusWriter } from '../database/import/sheet/excel/excel-status-writer';
import { SchemaEvolverService } from './schema-evolver-service';
import { GoogleSheetReaderService } from '../database/import/sheet/google/google-sheet-reader.service';
import { GoogleSheetStatusWriter } from '../database/import/sheet/google/google-sheet-status-writer';
(global as any).fetch = require('cross-fetch');

jest.setTimeout(200000);

process.env.TEST_SPREADSHEET_ID = '1R-_kjNjgfNm2KNoeS1-40BX6WTJ_ODj-7m7E35S_vu4';
process.env.GOOGLE_CLIENT_EMAIL = 'forms-sheets-access@forms-490723.iam.gserviceaccount.com'
process.env.GOOGLE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAQN5mnRlpfQxR\nKj8QZCMv8O8Rlga+kMjTeoEPn9Jvsxn7h/vBvYWI7F4PrgXKxdfJRidJjDVjOZKR\ngaUuniQhtvMppViycliehn3BbSXd4o8ToSLxGmyfgBAargE/lhCZfitRyBKl+KWD\nxY2uAyKeEvOH+m8qLExRD7aPVYLfHuArh4j5l7STLjFMkJLRraWlLrJWU9fOMaOu\n4rQKBoIZK9kn6wHXTKrkTE6jLnT5myarmUZIWFpL+7hmUnkJWMKugZcCEpjRwTQM\nWf/pe+9SdSxWi5g3YaLWF9JI1P7OMmz1kSzCKDgX92QNPPrYv9FF/JJTC+QDS4j0\nT2SmwuNBAgMBAAECggEABRvGcasCa9rfoumgwIFR0XgDeRkDKgJK4YhDgs+hOmzj\nnm1pKkvjM57I1H3Ut9rrrT3EQqBUkIz6zFS3kzZlraw8Q5UHwFPWpmsj4XMJT2hW\nmzhZwsSeaSRMABvF1m79hMjlMKP7fShhZGIfLe8aQBh4P5GYSOJPTx3SV7+Jpv7t\nPBwRD1HSCC9Rjd5FcDOhyT5KIK4BSa+4qPvLrBEJxQtvkkvZ7efj6dheQpO3sAep\nZget2o8V6P6+Oy4yU/niXMZLuANa8Rr6AY3gjvmnQ4W9BmSl2vpAKhU3S6QjWGHg\nISpkcXYF16zszmvu+Z2zEld0p7AoSkwDllzy0/zPYQKBgQDnDfZJfPByrEdQniyr\nV4HDv0tgeq9x3BxNhwO+vg4c76hkCR/WXlBsY9LsyaABi8gpcsNxGAPBtlQe+dUQ\nmkPJ1aLDTgGY2V5sA9qQ79COInAPFM+b1ViHFPWTGAPkWVJo+WzaVBZC+8KpyP8u\nvuwlb2PhjeB0FepW8sHDPB9gbQKBgQDVAn64qvpOVWtuY2am+ik89HOP1f6UnOG1\nJNJjJryGX492oTWnHn+RXjOPXd1qxZPG1U0M7pX3M9IifIN8hv3dB3q/n4mn/jxw\nQXgb0A6CqHWZJGxbMZeT/4NnbaJrpzk8XbgOqS6UNvlkeCFzauq2iup9O+o2O/ZG\nsw6xyRyRpQKBgQDhB4QaxogX5xn9tk+jALLtRl3PNS2yIsGd8CUBnHB6Vh8WbpyH\nV4vURNSksSoY1162n4MhnlXqT/1VvdR5OwVSibLfrBV6HBoN8SLpjeb8xyWESqx4\nBS0XQp56CCWiPCw6+NG/Qa38xt4sJgoCKQgs3XPVtSwpYz68N+nmj6OvcQKBgGuM\nwPL40T0v//hSlAgHEz9Fpfuf7tSWiZfuqZOKgXHPWh5psy9YRMzfJWVj3WIFtGGW\nXTsEVA/myFjFSZZcil1JY37RTK3Xvihnxf81A76Q1B+otlUtKv1865oTTwjP/CQw\npbgxT+ViBHXn+evOtgfJCDCHSfBsQiLcUbUOeDBJAoGAMKxJAeiOx90vuK0W8DIr\n29G5V6BTH4643JkgX8foOAIbYzKOdIp+KYBpvecPQtGJDHclVARERlpbAEuPnS/n\nuiZlatAXzqjXQUdQUS6Wy0NmxOZ72Qgb1Mi36mRKfdjjnIAmXUhJFyen2rov5ngk\nHvrwo/iCcTTGUV9gwCV158o=\n-----END PRIVATE KEY-----\n'

describe('Spreadsheet Import Integration', () => {
    let dataSource: DataSource;
    let registry: ImportRegistryService;
    let validationService: ValidationService;
    let schemaEvolver: SchemaEvolverService;
    let sheetReader: GoogleSheetReaderService;


    const fixture = path.resolve(__dirname, '../database/import/rxsoft.xlsx');

    beforeAll(async () => {
        const dbFile = path.join(__dirname, '../database/import/rxsoft.db');
        console.log({ dbFile })


        dataSource = new DataSource({
            type: 'sqlite',
            database: dbFile,
            synchronize: false,
            entities: [],
        });

        await dataSource.initialize();

        // create tables per spec
        //     await dataSource.query(`
        //   create table uom_category (
        //     id integer primary key autoincrement,
        //     uuid text unique,
        //     code text,
        //     name text,
        //     active boolean default 1
        //   )
        // `);

        //     await dataSource.query(`
        //   create table uom (
        //     id integer primary key autoincrement,
        //     uuid text unique,
        //     code text,
        //     name text,
        //     uom_category_code,
        //     uom_category_name,
        // create tables per spec; `id` is text primary key so sheet `uuid` can be used as the DB id
        await dataSource.query(`
          create table  if not EXISTS uom_category (
            id text primary key,
            uuid text,
            code text,
            name text,
            active boolean default 1
          )
        `);
        //     name text,
        //     active boolean default 1
        //   )
        // `);

        await dataSource.query(`
      create table if not EXISTS attribute (
        id integer primary key autoincrement,
        uuid text unique,
        code text,
        name text
      )
    `);

        await dataSource.query(`
      create table if not EXISTS attribute_value (
        id integer primary key autoincrement,
        entityType text,
        entityUuid text,
        attributeId integer,
        value text
      )
    `);

        registry = new ImportRegistryService();
        validationService = new ValidationService();
        schemaEvolver = new SchemaEvolverService(dataSource)
        sheetReader = new GoogleSheetReaderService();
        const sheetNames =
            await sheetReader.getSheetNames(process.env.TEST_SPREADSHEET_ID!);


        for (const sheetName of sheetNames) {
            await createTableFromSheet(dataSource, sheetReader, sheetName);
            registry.registerTarget(
                sheetName,
                new DatabaseImportTarget(dataSource, sheetName),
            );
        }

        // also ensure attribute and attribute_value are registered (they may be sheets too)
        registry.registerTarget('attribute', new DatabaseImportTarget(dataSource, 'attribute'));
        registry.registerTarget('attribute_value', new DatabaseImportTarget(dataSource, 'attribute_value'));
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    test('Excel import creates records, resolves relations and writes uuids/status', async () => {
        // simple repo wrappers for attribute/value used by AttributeSyncService
        const attributeRepo = {
            find: async () => {
                return await dataSource.query('select * from attribute');
            },
        };

        const valueRepo = {
            find: async (opts: any) => {
                // opts.where may include entityUuid: In([...])
                if (opts?.where?.entityType && opts?.where?.entityUuid) {
                    const uuids = Array.isArray(opts.where.entityUuid) ? opts.where.entityUuid : opts.where.entityUuid;
                    const placeholders = uuids.map(() => '?').join(',');
                    return await dataSource.query(`select * from attribute_value where entityType = ? and entityUuid in (${placeholders})`, [opts.where.entityType, ...uuids]);
                }

                return await dataSource.query('select * from attribute_value');
            },

            save: async (values: any[]) => {
                for (const v of values) {
                    if (v.id) {
                        await dataSource.query('update attribute_value set value = ? where id = ?', [v.value, v.id]);
                    } else {
                        await dataSource.query('insert into attribute_value (entityType, entityUuid, attributeId, value) values (?, ?, ?, ?)', [v.entityType, v.entityUuid, v.attributeId, v.value]);
                    }
                }

                return values;
            },
        };

        // seed attributes (for EAV)
        await dataSource.query('insert into attribute (uuid, code, name) values (?, ?, ?)', ['attr-1', 'color', 'Color']);

        // use a lenient validation for integration test to allow importing fixtures with duplicates
        // const validation = {
        //   validateSheet: (_entityName: string, _rows: any[], _config: any) => ({ valid: true, errors: [] }),
        //   validateRelations: (_rows: any[], _caches: any) => [],
        //   validateUnknownColumns: (_rows: any[], _physical: any[], _config: any) => [],
        //   validateAttributes: (_a: any[], _b: any[]) => [],
        // } as any;
        const attributeSync = new AttributeSyncService(attributeRepo, valueRepo);

        const entityImporter = new EntityImportService(registry, validationService, attributeSync as any);
        const schemaEvolver = new SchemaEvolverService(dataSource);

        const spreadsheetImporter = new SpreadsheetImportService(entityImporter, schemaEvolver);

        // copy fixture to tmp file so we can write uuids/status without modifying original
        const tmp = path.join(os.tmpdir(), `rxsoft-${Date.now()}.xlsx`);
        fs.copyFileSync(fixture, tmp);

        // perform import for only the two sheets we care about (uom_category then uom)
        const sheetsToImport = ['uom_category', 'uom'];

        // use a single ImportContext for the workbook so caches persist across sheets
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { ImportContext } = require('../database/import/types');
        const context = new ImportContext();

        for (const sheetName of sheetsToImport) {
            const rows = await sheetReader.getRows(process.env.TEST_SPREADSHEET_ID!, sheetName)

            // debug: inspect headers
            await schemaEvolver.ensureColumns(sheetName, rows, [
                'sync_status',
                'sync_message',
                'sync_time',
            ]);
            console.log('Importing sheet', sheetName, 'columns=', Object.keys(rows[0] || {}));

            const report = await entityImporter.importSheet(sheetName, rows, context);
            console.log('Report for', sheetName, report);

            // write actual results back to the excel file (only the combined context results so far)
            const writer = new GoogleSheetStatusWriter(
                process.env.TEST_SPREADSHEET_ID!,
                sheetName,
            );

            await writer.updateRows(context.results);
            console.log("Result written to === " + tmp)
        }
        // verify database rows
        const categories = await dataSource.query('select * from uom_category');
        expect(categories.length).toBeGreaterThan(0);

        const uoms = await dataSource.query('select * from uom');
        expect(uoms.length).toBeGreaterThan(0);

        // verify Excel file was written back with uuids and statuses
        const outWorkbook = XLSX.readFile(tmp);
        const sheet = outWorkbook.Sheets['uom'];
        const rows2 = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: null });

        expect(rows2.length).toBeGreaterThanOrEqual(3);
        expect(rows2[0].uuid).toBeTruthy();
        expect(rows2[0].sync_status).toMatch(/SUCCESS|ERROR/);

        // cleanup tmp
        fs.unlinkSync(tmp);
    });

    test('Google Sheets import uses reader and writes statuses (mocked)', async () => {
        // Read same excel fixture to produce mock rows
        const wb = XLSX.readFile(fixture);
        const sheetNames = wb.SheetNames;

        const reader = {
            getSheetNames: async (id: string) => sheetNames,
            getRows: async (id: string, sheetName: string) => XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { defval: null }),
        } as any;

        // mock GoogleSheetStatusWriter to capture calls
        const statusCalls: any[] = [];

        jest.mock('../database/import/sheet/google/google-sheet-status-writer', () => {
            return {
                GoogleSheetStatusWriter: class {
                    constructor(spreadsheetId: string, sheetName: string) { }
                    async updateRows(results: any[]) {
                        statusCalls.push(results);
                    }
                },
            };
        });

        const validation = new ValidationService();
        const attributeRepo = {
            find: async () => await dataSource.query('select * from attribute'),
        };

        const valueRepo = {
            find: async () => await dataSource.query('select * from attribute_value'),
            save: async (vals: any[]) => vals,
        };

        const attributeSync = new AttributeSyncService(attributeRepo, valueRepo as any);

        const entityImporter = new EntityImportService(registry, validationService, attributeSync as any);

        // require the module after mocking the status writer
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const GoogleModule = require('../database/import/sheet/google/google-sheet-import.service');
        const GoogleSheetImportServiceCtor = GoogleModule.GoogleSheetImportService as any;

        const googleImporter = new GoogleSheetImportServiceCtor(reader, entityImporter, schemaEvolver);

        await googleImporter.importSpreadsheet('dummy-id');

        expect(statusCalls.length).toBeGreaterThanOrEqual(1);
        // each sheet should have an updateRows call
        expect(statusCalls[0]).toBeInstanceOf(Array);
    });
});

async function createTableFromSheet(
    dataSource: DataSource,
    sheetReader: GoogleSheetReaderService,
    sheetName: string,
) {
    const rows = await sheetReader.getRows(
        process.env.TEST_SPREADSHEET_ID!,
        sheetName,
    );

    if (!rows.length) {
        console.warn(`Sheet '${sheetName}' is empty`);
        return;
    }

    const firstRow = rows[0];

    const columns = Object.keys(firstRow).map((columnName) => {
        const unique = columnName === 'uuid' ? ' UNIQUE' : '';

        return `"${columnName}" TEXT${unique}`;
    });

    const sql = `
    CREATE TABLE IF NOT EXISTS "${sheetName}" (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${columns.join(',\n')}
    )
  `;

    console.log(sql);

    await dataSource.query(sql);
}