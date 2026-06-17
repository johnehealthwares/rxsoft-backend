import { CreateOrganizationDto, ListOrganizationsDto, UpdateOrganizationDto } from '../dto/organizations.dto';
import { OrganizationType, OrganizationsService } from '../services/organizations.service';
type OrganizationListResponse = {
    data: OrganizationType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    list(query: ListOrganizationsDto): Promise<OrganizationListResponse>;
    get(organizationId: string): Promise<OrganizationType>;
    create(payload: CreateOrganizationDto): Promise<OrganizationType>;
    replace(organizationId: string, payload: UpdateOrganizationDto): Promise<OrganizationType>;
    patch(organizationId: string, payload: UpdateOrganizationDto): Promise<OrganizationType>;
    remove(organizationId: string): Promise<void>;
}
export {};
