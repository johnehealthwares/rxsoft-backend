// schema-evolver.service.ts

import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SchemaEvolverService {
  constructor(private readonly dataSource: DataSource) {}

  async ensureColumns(
    table: string,
    rows: Record<string, any>[],
    systemColumns: string[] = [],
  ) {
    if (!rows.length) return;

    const existingCols = await this.getColumns(table);

    const sampleRow = rows[0];
    const incomingCols = Object.keys(sampleRow);

    const allRequired = new Set([
      ...incomingCols,
      ...systemColumns,
    ]);

    for (const col of allRequired) {
      if (existingCols.includes(col)) continue;

      await this.dataSource.query(
        `ALTER TABLE "${table}" ADD COLUMN "${col}" TEXT`,
      );
    }
  }

  private async getColumns(table: string): Promise<string[]> {
    const result = await this.dataSource.query(
      `PRAGMA table_info("${table}")`,
    );

    return result.map((r: any) => r.name);
  }
}