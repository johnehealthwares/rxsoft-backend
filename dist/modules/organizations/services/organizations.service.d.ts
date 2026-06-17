import { Repository } from 'typeorm';
import { toOrganizationType } from '../../../shared/domain/mappers';
import { CreateOrganizationDto, ListOrganizationsDto, UpdateOrganizationDto } from '../dto/organizations.dto';
import { OrganizationOrmEntity } from '../entities/organization.orm-entity';
export type OrganizationType = ReturnType<typeof toOrganizationType>;
export declare class OrganizationsService {
    private readonly organizationRepository;
    constructor(organizationRepository: Repository<OrganizationOrmEntity>);
    list(query: ListOrganizationsDto): Promise<{
        data: OrganizationType[];
        total: number;
    }>;
    get(id: string): Promise<OrganizationType>;
    create(payload: CreateOrganizationDto): Promise<OrganizationType>;
    update(id: string, payload: UpdateOrganizationDto): Promise<OrganizationType>;
    remove(id: string): Promise<void>;
}
