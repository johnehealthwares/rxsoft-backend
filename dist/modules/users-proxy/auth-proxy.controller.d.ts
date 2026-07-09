import { UsersProxyService } from './users-proxy.service';
export declare class AuthProxyController {
    private readonly proxy;
    constructor(proxy: UsersProxyService);
    login(body: {
        username: string;
        password: string;
    }): Promise<any>;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<any>;
    me(auth: string): Promise<any>;
}
