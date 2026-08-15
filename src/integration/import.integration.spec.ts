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

// Legacy import-engine integration test. Requires live Google Sheets config and
// the local rxsoft.xlsx fixture. Skip when either is unavailable (no hardcoded creds).
const hasGoogleConfig = Boolean(
  process.env.GOOGLE_SHEET_ID &&
  process.env.GOOGLE_CLIENT_EMAIL &&
  process.env.GOOGLE_PRIVATE_KEY,
);
const FIXTURE_PATH = path.resolve(__dirname, '../database/import/rxsoft.xlsx');
const hasFixture = fs.existsSync(FIXTURE_PATH);
const legacyImportEnabled = hasGoogleConfig && hasFixture;

describe('Spreadsheet Import Integration', () => {
    let dataSource: DataSource;
    let registry: ImportRegistryService;
    let validationService: ValidationService;
    let schemaEvolver: SchemaEvolverService;
    let sheetReader: GoogleSheetReaderService;


    const fixture = FIXTURE_PATH;

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
            await sheetReader.getSheetNames(process.env.GOOGLE_SHEET_ID!);


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
        if (!legacyImportEnabled) {
            console.warn('Skipping legacy import spec (no Google config or rxsoft.xlsx fixture)');
            return;
        }
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
            const rows = await sheetReader.getRows(process.env.GOOGLE_SHEET_ID!, sheetName)

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
                process.env.GOOGLE_SHEET_ID!,
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
        if (!hasFixture) {
            console.warn('Skipping mocked Google import spec (no rxsoft.xlsx fixture)');
            return;
        }
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
        process.env.GOOGLE_SHEET_ID!,
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