"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersProxyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const cache_service_1 = require("../../common/cache/cache.service");
let UsersProxyService = class UsersProxyService {
    http;
    config;
    cache;
    internalApiKey;
    constructor(http, config, cache) {
        this.http = http;
        this.config = config;
        this.cache = cache;
        this.internalApiKey = this.config.get('INTERNAL_API_KEY', 'rxsoft-internal-key');
    }
    get baseUrl() {
        return this.config.get('IDENTITY_SERVICE_URL', 'http://localhost:8092');
    }
    cacheKey(prefix, token, ...parts) {
        return `proxy:users:${prefix}:${token.slice(-12)}:${parts.join(':')}`;
    }
    async list(token, query) {
        const key = this.cacheKey('list', token, JSON.stringify(query ?? {}));
        const cached = await this.cache.get(key);
        if (cached)
            return cached;
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.get(`${this.baseUrl}/users`, {
            headers: { Authorization: `Bearer ${token}` },
            params: query ?? {},
        }));
        await this.cache.set(key, data, 30);
        return data;
    }
    async findOne(token, id) {
        const key = this.cacheKey('findOne', token, id);
        const cached = await this.cache.get(key);
        if (cached)
            return cached;
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.get(`${this.baseUrl}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        await this.cache.set(key, data, 60);
        return data;
    }
    async login(username, password) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.post(`${this.baseUrl}/auth/login`, { username, password }));
        return data;
    }
    async refreshToken(refreshToken) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.post(`${this.baseUrl}/auth/refresh-token`, { refreshToken }));
        return data;
    }
    async register(payload) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.post(`${this.baseUrl}/auth/register`, payload));
        return data;
    }
    async create(token, payload) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.post(`${this.baseUrl}/users`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        await this.cache.invalidateByPrefix('proxy:users:list:');
        return data;
    }
    async update(token, id, payload) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.put(`${this.baseUrl}/users/${id}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        await this.cache.invalidateByPrefix('proxy:users:');
        return data;
    }
    async findById(organizationId, userId) {
        const key = this.cacheKey('findById', organizationId, userId);
        const cached = await this.cache.get(key);
        if (cached)
            return cached;
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.get(`${this.baseUrl}/users/${userId}`, {
            headers: { 'x-api-key': this.internalApiKey },
            params: { organizationId },
        }));
        await this.cache.set(key, data, 60);
        return data;
    }
    async me(token) {
        const key = this.cacheKey('me', token);
        const cached = await this.cache.get(key);
        if (cached)
            return cached;
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.get(`${this.baseUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        await this.cache.set(key, data, 30);
        return data;
    }
    async listRoles(token) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.get(`${this.baseUrl}/roles`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return data;
    }
    async getRole(token, id) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.get(`${this.baseUrl}/roles/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return data;
    }
    async createRole(token, payload) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.post(`${this.baseUrl}/roles`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return data;
    }
    async updateRole(token, id, payload) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.put(`${this.baseUrl}/roles/${id}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return data;
    }
    async deleteRole(token, id) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.delete(`${this.baseUrl}/roles/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return data;
    }
    async listPermissionModules(token) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.http.get(`${this.baseUrl}/permissions/modules`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return data;
    }
};
exports.UsersProxyService = UsersProxyService;
exports.UsersProxyService = UsersProxyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        cache_service_1.AppCacheService])
], UsersProxyService);
//# sourceMappingURL=users-proxy.service.js.map