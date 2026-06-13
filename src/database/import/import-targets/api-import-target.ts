import {
  HttpService,
} from '@nestjs/axios';
import { ImportTarget } from '../types';

export class ApiImportTarget
  implements ImportTarget
{
  constructor(
    private readonly http: HttpService,
    private readonly baseUrl: string,
  ) {}

  async findAll() {
    const response =
      await this.http.axiosRef.get(
        this.baseUrl,
      );

    return response.data;
  }

  create() {
    return {};
  }

  async save(
    entities: any[],
  ) {
    const response =
      await this.http.axiosRef.post(
        `${this.baseUrl}/bulk-sync`,
        entities,
      );

    return response.data;
  }

  async getColumns() {
    return [];
  }
}