import {
  DataSource,
} from 'typeorm';
import { ImportTarget } from '../types';

export class QueryBuilderImportTarget
  implements ImportTarget
{
  constructor(
    private readonly dataSource: DataSource,
    private readonly tableName: string,
  ) {}

  async findAll() {
    return this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(
        this.tableName,
        this.tableName,
      )
      .getRawMany();
  }

  create() {
    return {};
  }

  async save(
    entities: any[],
  ) {
    for (const entity of entities) {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(
          this.tableName,
        )
        .values(entity)
        .orUpdate(
          Object.keys(
            entity,
          ),
          ['uuid'],
        )
        .execute();
    }

    return entities;
  }

  async getColumns() {
    const metadata =
      this.dataSource.getMetadata(
        this.tableName,
      );

    return metadata.columns.map(
      (c) =>
        c.propertyName,
    );
  }
}