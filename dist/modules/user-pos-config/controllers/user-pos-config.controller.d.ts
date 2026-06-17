import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { UpdateUserPosConfigDto, UserPosConfigType } from '../dto/user-pos-config.dto';
import { UserPosConfigService } from '../services/user-pos-config.service';
export declare class UserPosConfigController {
    private readonly service;
    constructor(service: UserPosConfigService);
    getMyConfig(currentUser: RequestUser): Promise<UserPosConfigType>;
    updateMyConfig(payload: UpdateUserPosConfigDto, currentUser: RequestUser): Promise<UserPosConfigType>;
}
