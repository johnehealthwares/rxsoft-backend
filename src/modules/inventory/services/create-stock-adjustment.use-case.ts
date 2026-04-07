import { BadRequestException, Inject, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AppCacheService } from '../../../common/cache/cache.service';
import { CreateStockAdjustmentDto } from '../dto/create-stock-adjustment.dto';
import { StockAdjustment } from '../domains/stock-adjustment.entity';
import { INVENTORY_REPOSITORY } from './inventory.di-tokens';
import type { InventoryRepository } from '../repositories/inventory.repository';

@Injectable()
export class CreateStockAdjustmentUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    payload: CreateStockAdjustmentDto,
    performedByUserId: string,
    organizationId: string,
  ): Promise<Awaited<ReturnType<InventoryRepository['applyStockAdjustment']>>> {
    if (payload.deltaQuantity === 0) {
      throw new BadRequestException('Adjustment quantity cannot be zero');
    }

    const existing = await this.inventoryRepository.findStockBalanceById(payload.stockBalanceId, organizationId);
    if (!existing) {
      throw new NotFoundException('Stock balance not found');
    }

    if (existing.quantityOnHand + payload.deltaQuantity < 0) {
      throw new BadRequestException('Adjustment would make stock negative');
    }

    const adjustment = new StockAdjustment(
      randomUUID(),
      payload.stockBalanceId,
      payload.reason,
      payload.deltaQuantity,
      performedByUserId,
      new Date(),
    );

    const result = await this.inventoryRepository.applyStockAdjustment(adjustment, organizationId);
    await this.cacheService?.invalidateByPrefix(`inventory:list:${organizationId}:`);
    return result;
  }
}
