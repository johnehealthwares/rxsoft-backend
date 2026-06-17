import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { SalesService } from '../../sales/services/sales.service';
import { InventoryService } from '../../inventory/services/inventory.service';
export declare class ReportsController {
    private readonly salesService;
    private readonly inventoryService;
    constructor(salesService: SalesService, inventoryService: InventoryService);
    dailySales(): Promise<Array<{
        day: string;
        salesCount: number;
        totalAmount: number;
    }>>;
    inventoryValuation(): Promise<{
        itemsCount: number;
        totalQuantity: number;
    }>;
    topSellingProducts(): Array<{
        itemCode: string;
        quantitySold: number;
        revenue: number;
    }>;
    exportSummary(query: ListQueryDto): Promise<string>;
}
