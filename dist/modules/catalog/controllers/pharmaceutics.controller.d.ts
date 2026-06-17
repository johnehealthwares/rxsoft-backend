import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { PharmaceuticsType } from '../../../shared/domain';
import { CreatePharmaceuticsDto, ListPharmaceuticsDto, UpdatePharmaceuticsDto } from '../dto/pharmaceutics.dto';
import { PharmaceuticsService } from '../services/pharmaceutics.service';
type PharmaceuticsListResponse = {
    data: PharmaceuticsType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class PharmaceuticsController {
    private readonly pharmaceuticsService;
    constructor(pharmaceuticsService: PharmaceuticsService);
    list(query: ListPharmaceuticsDto, currentUser: RequestUser): Promise<PharmaceuticsListResponse>;
    get(pharmaceuticsId: string, currentUser: RequestUser): Promise<PharmaceuticsType>;
    create(payload: CreatePharmaceuticsDto, currentUser: RequestUser): Promise<PharmaceuticsType>;
    replace(pharmaceuticsId: string, payload: UpdatePharmaceuticsDto, currentUser: RequestUser): Promise<PharmaceuticsType>;
    patch(pharmaceuticsId: string, payload: UpdatePharmaceuticsDto, currentUser: RequestUser): Promise<PharmaceuticsType>;
    remove(pharmaceuticsId: string, currentUser: RequestUser): Promise<void>;
}
export {};
