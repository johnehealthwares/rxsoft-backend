import type { PharmaceuticsType } from '../../../shared/domain';
import { HealthcareConceptsService } from '../../../services/healthcare-concepts.service';
import type { ListPharmaceuticsDto } from '../dto/pharmaceutics.dto';
export declare class PharmaceuticsService {
    private readonly healthcare;
    constructor(healthcare: HealthcareConceptsService);
    list(query: ListPharmaceuticsDto, _organizationId?: string): Promise<{
        data: PharmaceuticsType[];
        total: number;
    }>;
    get(id: string, _organizationId?: string): Promise<PharmaceuticsType>;
    create(payload: any, _organizationId?: string): Promise<PharmaceuticsType>;
    update(id: string, payload: any, _organizationId?: string): Promise<PharmaceuticsType>;
    remove(id: string, _organizationId?: string): Promise<void>;
}
