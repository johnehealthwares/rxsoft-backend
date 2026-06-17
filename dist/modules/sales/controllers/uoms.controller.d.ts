import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { UomType } from '../../../shared/domain';
import { CreateUomDto } from '../dto/create-uom.dto';
import { ListUomsDto } from '../dto/list-uoms.dto';
import { UpdateUomDto } from '../dto/update-uom.dto';
import { UomsService } from '../services/uoms.service';
type UomListResponse = {
    data: UomType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class UomsController {
    private readonly uomsService;
    constructor(uomsService: UomsService);
    list(query: ListUomsDto, currentUser: RequestUser): Promise<UomListResponse>;
    getById(uomId: string, currentUser: RequestUser): Promise<UomType>;
    create(payload: CreateUomDto, currentUser: RequestUser): Promise<UomType>;
    replace(uomId: string, payload: UpdateUomDto, currentUser: RequestUser): Promise<UomType>;
    patch(uomId: string, payload: UpdateUomDto, currentUser: RequestUser): Promise<UomType>;
}
export {};
