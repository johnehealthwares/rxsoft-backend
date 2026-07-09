import type { StockBalanceType } from '../../../shared/domain';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import type { InventoryRepository } from '../repositories/inventory.repository';
import { AdjustStockByReferenceDto } from '../dto/stock-locations.dto';
import { CreateStockTransferDto } from '../dto/create-stock-transfer.dto';
export declare class InventoryService {
    private readonly inventoryRepository;
    private readonly accountingIntegration?;
    private readonly logger;
    constructor(inventoryRepository: InventoryRepository, accountingIntegration?: AccountingIntegrationService | undefined);
    list(query: ListQueryDto): Promise<{
        data: Array<Record<string, unknown>>;
        total: number;
    }>;
    listAll(): Promise<Array<{
        quantity: number;
    }>>;
    adjustByReference(payload: AdjustStockByReferenceDto, performedByUserId: string, organizationId: string): Promise<StockBalanceType>;
    transfer(payload: CreateStockTransferDto, performedByUserId: string, organizationId: string): Promise<{
        fromBalance: StockBalanceType;
        toBalance: StockBalanceType;
    }>;
}
