import { EntityManager, Repository } from 'typeorm';
import { OrganisationConfigService } from '../../organisation-config/services/organisation-config.service';
import { UpdateUserPosConfigDto, UserPosConfigType } from '../dto/user-pos-config.dto';
import { UserPosConfigOrmEntity } from '../entities/user-pos-config.orm-entity';
export declare class UserPosConfigService {
    private readonly repo;
    private readonly entityManager;
    private readonly orgConfigService;
    constructor(repo: Repository<UserPosConfigOrmEntity>, entityManager: EntityManager, orgConfigService: OrganisationConfigService);
    getOrCreate(userId: string, organizationId: string): Promise<UserPosConfigType>;
    update(userId: string, organizationId: string, payload: UpdateUserPosConfigDto): Promise<UserPosConfigType>;
}
