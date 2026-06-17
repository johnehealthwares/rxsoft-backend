import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { CreatePurchaseDto, UpdatePurchaseDto } from '../dto/purchases.dto';
import { PurchasesService } from '../services/purchases.service';
type PurchaseSummaryType = Awaited<ReturnType<PurchasesService['getById']>>;
type PurchaseListResponse = {
    data: PurchaseSummaryType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class PurchasesController {
    private readonly purchasesService;
    constructor(purchasesService: PurchasesService);
    list(query: ListQueryDto, currentUser: RequestUser): Promise<PurchaseListResponse>;
    getById(purchaseId: string, currentUser: RequestUser): Promise<PurchaseSummaryType>;
    create(payload: CreatePurchaseDto, currentUser: RequestUser): Promise<PurchaseSummaryType>;
    replace(purchaseId: string, payload: UpdatePurchaseDto, currentUser: RequestUser): Promise<PurchaseSummaryType>;
    patch(purchaseId: string, payload: UpdatePurchaseDto, currentUser: RequestUser): Promise<PurchaseSummaryType>;
    remove(purchaseId: string, currentUser: RequestUser): Promise<void>;
}
export {};
