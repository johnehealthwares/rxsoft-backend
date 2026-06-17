import type { DrugComponentType } from '../../../shared/domain';
import { HealthcareConceptsService } from '../../../services/healthcare-concepts.service';
import type { ListDrugComponentsDto } from '../dto/drug-components.dto';
export declare class DrugComponentsService {
    private readonly healthcare;
    constructor(healthcare: HealthcareConceptsService);
    list(query: ListDrugComponentsDto, _organizationId?: string): Promise<{
        data: DrugComponentType[];
        total: number;
    }>;
    get(id: string, _organizationId?: string): Promise<DrugComponentType>;
    create(payload: any, _organizationId?: string): Promise<DrugComponentType>;
    update(id: string, payload: any, _organizationId?: string): Promise<DrugComponentType>;
    remove(id: string, _organizationId?: string): Promise<void>;
}
