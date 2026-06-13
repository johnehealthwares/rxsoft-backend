import {
  DataSource,
} from 'typeorm';
import { ImportTarget } from '../types';
import { randomUUID } from 'crypto';

export class DatabaseImportTarget
  implements ImportTarget {
  constructor(
    private readonly dataSource: DataSource,
    private readonly tableName: string,
  ) { }

  async findAll() {
    return this.dataSource.query(
      `select * from ${this.tableName}`,
    );
  }

  create() {
    return {};
  }

  async save(
    entities: any[],
  ) {
    for (const entity of entities) {
      // entity.id = entity.uuid; // or map via lookup if different systems
      if (!entity.id || entity.id === '') {
        entity.id = randomUUID();
      }
      if (entity.uuid && entity.id !== '' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(entity.uuid)) {
        entity.id = randomUUID();
      }
      delete entity.uuid

      const cols = Object.keys(entity);

      const placeholders = cols.map((_, i) => `$${i + 1}`).join(',');
      const colList = cols.map(c => `"${c === 'uuid' ? 'id' : c}"`).join(',');

      const updates = cols
        .filter((c) => c !== 'uuid')
        .map((c) => `"${c}" = excluded."${c}"`)
        .join(', ');

      const values = cols.map((c) => entity[c]);

      // choose conflict column: prefer id if present, else uuid
      const conflictColumn = 'id';

      // build updates excluding the conflict column

      const updatesExcludingConflict = cols
        .filter((c) => c !== 'uuid' && c !== 'id')
        .map((c) => `"${c}" = excluded."${c}"`)
        .join(', ');

      // Use parameterized upsert; works for Postgres and SQLite (ON CONFLICT)
      const sql = `INSERT INTO ${this.tableName} (${colList}) VALUES (${placeholders}) ON CONFLICT (${conflictColumn}) DO UPDATE SET ${updatesExcludingConflict}`;

      await this.dataSource.query(sql, values);
    }

    return entities;
  }

  async getColumns() {
    try {
      const result = await this.dataSource.query(
        `select column_name from information_schema.columns where table_name = $1`,
        [this.tableName],
      );

      if (result && result.length) {
        return result.map((r: any) => r.column_name);
      }
    } catch (e) {
      // ignore and try sqlite pragma
    }

    // sqlite fallback
    try {
      const rows = await this.dataSource.query(`PRAGMA table_info(${this.tableName})`);
      return rows.map((r: any) => r.name);
    } catch (e) {
      return [];
    }
  }
}