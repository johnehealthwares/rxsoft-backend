import { Repository } from 'typeorm';
import { UpdateOrganisationConfigDto, OrganisationConfigType } from '../dto/organisation-config.dto';
import { OrganisationConfigOrmEntity } from '../entities/organisation-config.orm-entity';
export declare class OrganisationConfigService {
    private readonly repo;
    constructor(repo: Repository<OrganisationConfigOrmEntity>);
    getOrCreate(organizationId: string): Promise<OrganisationConfigType>;
    update(organizationId: string, payload: UpdateOrganisationConfigDto): Promise<OrganisationConfigType>;
}
