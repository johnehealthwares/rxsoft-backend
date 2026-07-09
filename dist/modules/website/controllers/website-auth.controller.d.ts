import { Repository } from 'typeorm';
import { UsersProxyService } from '../../../modules/users-proxy/users-proxy.service';
import { RegisterDto } from '../dto/website.dto';
import { PartyOrmEntity } from '../../../modules/customers/entities/party.orm-entity';
export declare class WebsiteAuthController {
    private readonly usersProxy;
    private readonly partyRepo;
    constructor(usersProxy: UsersProxyService, partyRepo: Repository<PartyOrmEntity>);
    register(dto: RegisterDto): Promise<any>;
    login(body: {
        username: string;
        password: string;
    }): Promise<any>;
}
