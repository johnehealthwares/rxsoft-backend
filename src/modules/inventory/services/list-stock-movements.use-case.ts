import { Inject, Injectable } from '@nestjs/common';
import { INVENTORY_REPOSITORY } from './inventory.di-tokens';
import type { InventoryRepository } from '../repositories/inventory.repository';
import { ListStockMovementsDto } from '../dto/list-stock-movements.dto';

@Injectable()
export class ListStockMovementsUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(
    payload: ListStockMovementsDto,
    organizationId: string,
  ): Promise<Awaited<ReturnType<InventoryRepository['listStockMovements']>>> {
    return this.inventoryRepository.listStockMovements({
      organizationId,
      offset: payload.offset,
      limit: payload.limit,
      movementType: payload.movementType,
      itemId: payload.itemId,
      locationId: payload.locationId,
      fromDate: payload.fromDate,
      toDate: payload.toDate,
    });
  }
}
