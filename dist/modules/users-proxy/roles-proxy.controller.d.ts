import { UsersProxyService } from './users-proxy.service';
export declare class RolesProxyController {
    private readonly proxy;
    constructor(proxy: UsersProxyService);
    listModules(auth: string): Promise<any>;
    create(auth: string, payload: any): Promise<any>;
    list(auth: string): Promise<any>;
    get(auth: string, id: string): Promise<any>;
    update(auth: string, id: string, payload: any): Promise<any>;
    delete(auth: string, id: string): Promise<any>;
}
