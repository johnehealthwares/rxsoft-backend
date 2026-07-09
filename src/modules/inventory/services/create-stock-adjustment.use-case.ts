import { BadRequestException, Inject, Injectable, Logger, NotFoundException, Optional } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AppCacheService } from '../../../common/cache/cache.service';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { CreateStockAdjustmentDto } from '../dto/create-stock-adjustment.dto';
import { StockAdjustment } from '../domains/stock-adjustment.entity';
import { INVENTORY_REPOSITORY } from './inventory.di-tokens';
import type { InventoryRepository } from '../repositories/inventory.repository';

@Injectable()
export class CreateStockAdjustmentUseCase {
  private readonly logger = new Logger(CreateStockAdjustmentUseCase.name);

  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
    @Optional()
    private readonly accountingIntegration?: AccountingIntegrationService,
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

    if (this.accountingIntegration) {
      this.accountingIntegration
        .recordStockAdjustment(organizationId, {
          stockBalanceId: payload.stockBalanceId,
          deltaQuantity: payload.deltaQuantity,
          reason: payload.reason,
          averageCost: existing.averageCost,
        })
        .catch((err: Error) => this.logger.error(`Accounting: failed to record stock adjustment: ${err.message}`, err.stack));
    }

    return result;
  }
}
