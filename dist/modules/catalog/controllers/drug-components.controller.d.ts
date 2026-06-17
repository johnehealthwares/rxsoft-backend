import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { DrugComponentType } from '../../../shared/domain';
import { CreateDrugComponentDto, ListDrugComponentsDto, UpdateDrugComponentDto } from '../dto/drug-components.dto';
import { DrugComponentsService } from '../services/drug-components.service';
type DrugComponentListResponse = {
    data: DrugComponentType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class DrugComponentsController {
    private readonly drugComponentsService;
    constructor(drugComponentsService: DrugComponentsService);
    list(query: ListDrugComponentsDto, currentUser: RequestUser): Promise<DrugComponentListResponse>;
    get(drugComponentId: string, currentUser: RequestUser): Promise<DrugComponentType>;
    create(payload: CreateDrugComponentDto, currentUser: RequestUser): Promise<DrugComponentType>;
    replace(drugComponentId: string, payload: UpdateDrugComponentDto, currentUser: RequestUser): Promise<DrugComponentType>;
    patch(drugComponentId: string, payload: UpdateDrugComponentDto, currentUser: RequestUser): Promise<DrugComponentType>;
    remove(drugComponentId: string, currentUser: RequestUser): Promise<void>;
}
export {};
