import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { SuppliersService } from '../services/suppliers.service';
import { ListQueryDto } from "../../../shared/dto/list-query.dto";
import { PartyType } from "../../../shared/domain";
type SupplierListResponse = {
    data: PartyType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    list(query: ListQueryDto): Promise<SupplierListResponse>;
    create(payload: CreateSupplierDto): Promise<{
        id: string;
        name: string;
        phone: string | null;
        email: string | null;
    }>;
}
export {};
