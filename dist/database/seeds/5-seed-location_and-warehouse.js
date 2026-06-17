"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedWarehouseAndStockLocation = seedWarehouseAndStockLocation;
const ORGANIZATION_ID = 'df3b4afd-9955-4617-9a82-264cc73dd8b2';
const WAREHOUSE_ID = '7f5f4b63-2e7b-4f66-bf96-3f1c51a9d101';
const STOCK_LOCATION_ID = 'd0c9f8c4-3f6d-4f4d-8e5e-6a1d7e8b2201';
function quoteIdentifier(value) {
    return `"${value.replace(/"/g, '""')}"`;
}
async function tableExists(dataSource, table) {
    const result = await dataSource.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = $1
      ) as exists
    `, [table]);
    return result[0]?.exists ?? false;
}
async function getColumns(dataSource, table) {
    const columns = await dataSource.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name = $1
    `, [table]);
    return new Set(columns.map((item) => item.column_name));
}
async function seedWarehouseAndStockLocation(dataSource) {
    const warehouseTable = 'warehouses';
    if (!(await tableExists(dataSource, warehouseTable))) {
        console.warn(`Table "${warehouseTable}" not found. Skipping warehouse seed.`);
        return;
    }
    const warehouseColumns = await getColumns(dataSource, warehouseTable);
    const warehouseValues = new Map([
        ['id', WAREHOUSE_ID],
        ['organization_id', ORGANIZATION_ID],
        ['code', 'MAIN_WH'],
        ['name', 'Main Warehouse'],
        ['is_active', true],
        ['created_at', new Date()],
        ['updated_at', new Date()],
    ]);
    const warehouseInsertColumns = [];
    const warehouseInsertValues = [];
    const warehousePlaceholders = [];
    for (const [column, value] of warehouseValues.entries()) {
        if (!warehouseColumns.has(column))
            continue;
        warehouseInsertColumns.push(quoteIdentifier(column));
        warehouseInsertValues.push(value);
        warehousePlaceholders.push(`$${warehouseInsertValues.length}`);
    }
    await dataSource.query(`
      INSERT INTO ${quoteIdentifier(warehouseTable)}
      (${warehouseInsertColumns.join(', ')})
      VALUES (${warehousePlaceholders.join(', ')})
      ON CONFLICT (id) DO NOTHING
    `, warehouseInsertValues);
    console.log(`Warehouse seeded with id ${WAREHOUSE_ID}`);
    const stockLocationTable = 'stock_locations';
    if (!(await tableExists(dataSource, stockLocationTable))) {
        console.warn(`Table "${stockLocationTable}" not found. Skipping stock location seed.`);
        return;
    }
    const stockLocationColumns = await getColumns(dataSource, stockLocationTable);
    const stockLocationValues = new Map([
        ['id', STOCK_LOCATION_ID],
        ['organization_id', ORGANIZATION_ID],
        ['warehouse_id', WAREHOUSE_ID],
        ['code', 'MAIN_STOCK'],
        ['name', 'Main Stock Location'],
        ['location_type', 'internal'],
        ['is_active', true],
        ['created_at', new Date()],
        ['updated_at', new Date()],
    ]);
    const stockLocationInsertColumns = [];
    const stockLocationInsertValues = [];
    const stockLocationPlaceholders = [];
    for (const [column, value] of stockLocationValues.entries()) {
        if (!stockLocationColumns.has(column))
            continue;
        stockLocationInsertColumns.push(quoteIdentifier(column));
        stockLocationInsertValues.push(value);
        stockLocationPlaceholders.push(`$${stockLocationInsertValues.length}`);
    }
    await dataSource.query(`
      INSERT INTO ${quoteIdentifier(stockLocationTable)}
      (${stockLocationInsertColumns.join(', ')})
      VALUES (${stockLocationPlaceholders.join(', ')})
      ON CONFLICT (id) DO NOTHING
    `, stockLocationInsertValues);
    console.log(`Stock location seeded with id ${STOCK_LOCATION_ID}`);
}
//# sourceMappingURL=5-seed-location_and-warehouse.js.map