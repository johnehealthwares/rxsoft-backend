import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppCacheService } from '../../common/cache/cache.service';

@Injectable()
export class OrganisationsProxyService {
  private readonly internalApiKey: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly cache: AppCacheService,
  ) {
    this.internalApiKey = this.config.get<string>('INTERNAL_API_KEY', 'rxsoft-internal-key');
  }

  private get baseUrl(): string {
    return this.config.get<string>('IDENTITY_SERVICE_URL', 'https://api.ehealthwares.com/identity');
  }

  private cacheKey(prefix: string, ...parts: string[]): string {
    return `proxy:organisations:${prefix}:${parts.join(':')}`;
  }

  async list(query?: Record<string, string>): Promise<any> {
    const key = this.cacheKey('list', JSON.stringify(query ?? {}));
    const cached = await this.cache.get<any>(key);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/organizations`, {
        headers: { 'x-api-key': this.internalApiKey },
        params: query ?? {},
      }),
    );
    await this.cache.set(key, data, 60);
    return data;
  }

  async findById(organizationId: string): Promise<any> {
    const key = this.cacheKey('findById', organizationId);
    const cached = await this.cache.get<any>(key);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/organizations/${organizationId}`, {
        headers: { 'x-api-key': this.internalApiKey },
      }),
    );
    await this.cache.set(key, data, 300);
    return data;
  }

  async findByCode(code: string): Promise<any> {
    const key = this.cacheKey('findByCode', code);
    const cached = await this.cache.get<any>(key);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/organizations`, {
        headers: { 'x-api-key': this.internalApiKey },
        params: { search: code, limit: 1 },
      }),
    );
    await this.cache.set(key, data, 300);
    return data;
  }

  async create(payload: any): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.post(`${this.baseUrl}/organizations`, payload, {
        headers: { 'x-api-key': this.internalApiKey },
      }),
    );
    await this.cache.invalidateByPrefix('proxy:organisations:');
    return data;
  }

  async update(id: string, payload: any): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.put(`${this.baseUrl}/organizations/${id}`, payload, {
        headers: { 'x-api-key': this.internalApiKey },
      }),
    );
    await this.cache.invalidateByPrefix('proxy:organisations:');
    return data;
  }

  async remove(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.baseUrl}/organizations/${id}`, {
        headers: { 'x-api-key': this.internalApiKey },
      }),
    );
    await this.cache.invalidateByPrefix('proxy:organisations:');
  }
}
