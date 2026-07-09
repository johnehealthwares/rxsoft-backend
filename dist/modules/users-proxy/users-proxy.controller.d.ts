import { type RequestUser } from '../../common/decorators/current-user.decorator';
import { UserPosConfigService } from '../user-pos-config/services/user-pos-config.service';
import { UsersProxyService } from './users-proxy.service';
export declare class UsersProxyController {
    private readonly proxy;
    private readonly posConfigService;
    constructor(proxy: UsersProxyService, posConfigService: UserPosConfigService);
    list(auth: string, query: Record<string, string>): Promise<any>;
    get(auth: string, id: string): Promise<any>;
    update(auth: string, id: string, payload: any, currentUser: RequestUser): Promise<any>;
    updateViaPost(auth: string, id: string, payload: any, currentUser: RequestUser): Promise<any>;
}
