import type { GenericProductType } from '../../../shared/domain';
import { HealthcareConceptsService } from '../../../services/healthcare-concepts.service';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
import type { ListGenericProductsDto } from '../dto/generic-products.dto';
export declare class GenericProductsService {
    private readonly healthcare;
    private readonly cache;
    constructor(healthcare: HealthcareConceptsService, cache: GenericDrugCacheService);
    list(query: ListGenericProductsDto, _organizationId?: string): Promise<{
        data: GenericProductType[];
        total: number;
    }>;
    get(idOrCode: string, _organizationId?: string): Promise<GenericProductType>;
    create(payload: any, _organizationId?: string): Promise<GenericProductType>;
    update(id: string, payload: any, _organizationId?: string): Promise<GenericProductType>;
    remove(id: string, _organizationId?: string): Promise<void>;
}
