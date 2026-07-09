import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AppCacheService } from '../../common/cache/cache.service';
export declare class UsersProxyService {
    private readonly http;
    private readonly config;
    private readonly cache;
    private readonly internalApiKey;
    constructor(http: HttpService, config: ConfigService, cache: AppCacheService);
    private get baseUrl();
    private cacheKey;
    list(token: string, query?: Record<string, string>): Promise<any>;
    findOne(token: string, id: string): Promise<any>;
    login(username: string, password: string): Promise<any>;
    refreshToken(refreshToken: string): Promise<any>;
    register(payload: {
        username: string;
        password: string;
        phone?: string;
        email?: string;
    }): Promise<any>;
    create(token: string, payload: any): Promise<any>;
    update(token: string, id: string, payload: any): Promise<any>;
    findById(organizationId: string, userId: string): Promise<any>;
    me(token: string): Promise<any>;
    listRoles(token: string): Promise<any>;
    getRole(token: string, id: string): Promise<any>;
    createRole(token: string, payload: any): Promise<any>;
    updateRole(token: string, id: string, payload: any): Promise<any>;
    deleteRole(token: string, id: string): Promise<any>;
    listPermissionModules(token: string): Promise<any>;
}
