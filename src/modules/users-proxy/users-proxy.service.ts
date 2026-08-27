import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppCacheService } from '../../common/cache/cache.service';

@Injectable()
export class UsersProxyService {
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

  private cacheKey(prefix: string, token: string, ...parts: string[]): string {
    return `proxy:users:${prefix}:${token.slice(-12)}:${parts.join(':')}`;
  }

  async list(token: string, query?: Record<string, string>): Promise<any> {
    const key = this.cacheKey('list', token, JSON.stringify(query ?? {}));
    const cached = await this.cache.get<any>(key);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: query ?? {},
      }),
    );
    await this.cache.set(key, data, 30);
    return data;
  }

  async listByApiKey(query?: Record<string, string>): Promise<any> {
    const params = query ?? {};
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/users`, {
        headers: { 'x-api-key': this.internalApiKey },
        params,
      }),
    );
    return data;
  }

  async findOne(token: string, id: string): Promise<any> {
    const key = this.cacheKey('findOne', token, id);
    const cached = await this.cache.get<any>(key);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    await this.cache.set(key, data, 60);
    return data;
  }

  async login(username: string, password: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.post(`${this.baseUrl}/auth/login`, { username, password }),
    );
    return data;
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.post(`${this.baseUrl}/auth/refresh-token`, { refreshToken }),
    );
    return data;
  }

  async register(payload: { username: string; password: string; phone?: string; email?: string }): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.post(`${this.baseUrl}/auth/register`, payload),
    );
    return data;
  }

  async create(token: string, payload: any): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.post(`${this.baseUrl}/users`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    await this.cache.invalidateByPrefix('proxy:users:list:');
    return data;
  }

  async update(token: string, id: string, payload: any): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.put(`${this.baseUrl}/users/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    await this.cache.invalidateByPrefix('proxy:users:');
    return data;
  }

  async delete(token: string, id: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.delete(`${this.baseUrl}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    await this.cache.invalidateByPrefix('proxy:users:');
    return data;
  }

  async findById(organizationId: string, userId: string): Promise<any> {
    const key = this.cacheKey('findById', organizationId, userId);
    const cached = await this.cache.get<any>(key);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/users/${userId}`, {
        headers: { 'x-api-key': this.internalApiKey },
        params: { organizationId },
      }),
    );
    await this.cache.set(key, data, 60);
    return data;
  }

  async me(token: string): Promise<any> {
    const key = this.cacheKey('me', token);
    const cached = await this.cache.get<any>(key);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    await this.cache.set(key, data, 30);
    return data;
  }

  // ── Roles proxy ──────────────────────────────────────────────

  async listRoles(token: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/roles`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return data;
  }

  async getRole(token: string, id: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return data;
  }

  async createRole(token: string, payload: any): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.post(`${this.baseUrl}/roles`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return data;
  }

  async updateRole(token: string, id: string, payload: any): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.put(`${this.baseUrl}/roles/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return data;
  }

  async deleteRole(token: string, id: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.delete(`${this.baseUrl}/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return data;
  }

  // ── Permissions proxy ────────────────────────────────────────

  async listPermissionModules(token: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/permissions/modules`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return data;
  }
}
