import { DataSource } from 'typeorm';

const ORGANIZATION_ID = 'df3b4afd-9955-4617-9a82-264cc73dd8b2';

function quoteIdentifier(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function seedOrganization(dataSource: DataSource): Promise<void> {
  const candidateTables = ['organizations', 'organisation', 'organisations'];

  for (const table of candidateTables) {
    const columns: Array<{ column_name: string }> = await dataSource.query(
      `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
      `,
      [table],
    );

    if (!columns.length) {
      continue;
    }

    const columnNames = new Set(columns.map((item) => item.column_name));
    if (!columnNames.has('id')) {
      console.warn(`Organization table "${table}" found without "id" column. Skipping org seed.`);
      return;
    }

    const valuesByColumn = new Map<string, unknown>([
      ['id', ORGANIZATION_ID],
      ['code', 'DEFAULT_ORG'],
      ['name', 'Default Organization'],
      ['display_name', 'Default Organization'],
      ['is_active', true],
      ['active', true],
      ['status', 'active'],
      ['created_at', new Date()],
      ['updated_at', new Date()],
    ]);

    const insertColumns: string[] = [];
    const insertValues: unknown[] = [];
    const placeholders: string[] = [];

    for (const [column, value] of valuesByColumn.entries()) {
      if (!columnNames.has(column)) continue;
      insertColumns.push(quoteIdentifier(column));
      insertValues.push(value);
      placeholders.push(`$${insertValues.length}`);
    }

    await dataSource.query(
      `
        INSERT INTO ${quoteIdentifier(table)} (${insertColumns.join(', ')})
        VALUES (${placeholders.join(', ')})
        ON CONFLICT (id) DO NOTHING
      `,
      insertValues,
    );

    console.log(`Organization seed ensured in "${table}" with id ${ORGANIZATION_ID}`);
    return;
  }

  console.warn('No organization table found (checked: organizations, organisation, organisations). Skipping org seed.');
}
