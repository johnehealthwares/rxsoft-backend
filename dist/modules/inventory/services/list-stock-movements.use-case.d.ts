import type { InventoryRepository } from '../repositories/inventory.repository';
import { ListStockMovementsDto } from '../dto/list-stock-movements.dto';
export declare class ListStockMovementsUseCase {
    private readonly inventoryRepository;
    constructor(inventoryRepository: InventoryRepository);
    execute(payload: ListStockMovementsDto, organizationId: string): Promise<Awaited<ReturnType<InventoryRepository['listStockMovements']>>>;
}
