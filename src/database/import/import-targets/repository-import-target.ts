import {
  Repository,
} from 'typeorm';
import { ImportTarget } from '../types';

export class RepositoryImportTarget
  implements ImportTarget
{
  constructor(
    private readonly repository: Repository<any>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  create() {
    return this.repository.create();
  }

  async save(
    entities: any[],
  ) {
    return this.repository.save(
      entities,
    );
  }

  async getColumns() {
    return this.repository.metadata.columns.map(
      (c) =>
        c.propertyName,
    );
  }
}