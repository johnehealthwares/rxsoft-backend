import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { UpdateOrganisationConfigDto, OrganisationConfigType } from '../dto/organisation-config.dto';
import { OrganisationConfigService } from '../services/organisation-config.service';
export declare class OrganisationConfigController {
    private readonly service;
    constructor(service: OrganisationConfigService);
    getConfig(currentUser: RequestUser): Promise<OrganisationConfigType>;
    updateConfig(payload: UpdateOrganisationConfigDto, currentUser: RequestUser): Promise<OrganisationConfigType>;
}
