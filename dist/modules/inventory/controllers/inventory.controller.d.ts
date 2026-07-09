import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { CreateStockAdjustmentDto } from '../dto/create-stock-adjustment.dto';
import { CreateStockTransferDto } from '../dto/create-stock-transfer.dto';
import { ListStockBalancesDto } from '../dto/list-stock-balances.dto';
import { ListStockMovementsDto } from '../dto/list-stock-movements.dto';
import { AdjustStockByReferenceDto } from '../dto/stock-locations.dto';
import { StockBalanceResponseDto } from '../dto/stock-balance-response.dto';
import { CreateStockAdjustmentUseCase } from '../services/create-stock-adjustment.use-case';
import { ListStockBalancesUseCase } from '../services/list-stock-balances.use-case';
import { ListStockMovementsUseCase } from '../services/list-stock-movements.use-case';
import { InventoryService } from '../services/inventory.service';
type InventoryListResponse<T> = {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class InventoryController {
    private readonly listStockBalancesUseCase;
    private readonly listStockMovementsUseCase;
    private readonly createStockAdjustmentUseCase;
    private readonly inventoryService;
    constructor(listStockBalancesUseCase: ListStockBalancesUseCase, listStockMovementsUseCase: ListStockMovementsUseCase, createStockAdjustmentUseCase: CreateStockAdjustmentUseCase, inventoryService: InventoryService);
    listStockBalances(query: ListStockBalancesDto, currentUser: RequestUser): Promise<InventoryListResponse<StockBalanceResponseDto>>;
    listStockMovements(query: ListStockMovementsDto, currentUser: RequestUser): Promise<InventoryListResponse<Awaited<ReturnType<ListStockMovementsUseCase['execute']>>['items'][number]>>;
    exportStockMovements(query: ListStockMovementsDto, currentUser: RequestUser): Promise<string>;
    createAdjustment(payload: CreateStockAdjustmentDto, currentUser: RequestUser): Promise<StockBalanceResponseDto>;
    adjustQuantity(payload: AdjustStockByReferenceDto, currentUser: RequestUser): Promise<StockBalanceResponseDto>;
    transferStock(payload: CreateStockTransferDto, currentUser: RequestUser): Promise<{
        message: string;
        fromBalance: StockBalanceResponseDto;
        toBalance: StockBalanceResponseDto;
    }>;
}
export {};
