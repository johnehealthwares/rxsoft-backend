import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { ReceiveGoodsDto } from '../dto/goods-receipt.dto';
import { UnpostGoodsDto } from '../dto/unpost-goods.dto';
import { ReceiveGoodsUseCase } from '../services/receive-goods.use-case';
import type { PurchasesRepository } from '../repositories/purchases.repository';
export declare class InflowController {
    private readonly receiveGoodsUseCase;
    private readonly purchasesRepo;
    constructor(receiveGoodsUseCase: ReceiveGoodsUseCase, purchasesRepo: PurchasesRepository);
    receiveGoods(id: string, payload: ReceiveGoodsDto, currentUser: RequestUser): Promise<import("../repositories/purchases.repository").ReceiveGoodsResult>;
    unpostGoods(_id: string, payload: UnpostGoodsDto, currentUser: RequestUser): Promise<{
        message: string;
    }>;
    listReceiptsByPo(id: string, page?: number, limit?: number, currentUser?: RequestUser): Promise<{
        data: import("../entities").GoodsReceiptOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    listAllReceipts(page?: number, limit?: number, currentUser?: RequestUser): Promise<{
        data: import("../entities").GoodsReceiptOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
}
