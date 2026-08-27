import { BadRequestException, Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { StockBalanceType } from '../../../shared/domain';
import { toStockBalanceType } from '../../../shared/domain/mappers';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { convertUomQuantity, type UomFactorInfo } from '../../../shared/utils/uom';
import { AccountingIntegrationService } from '../../accounting/services/accounting-integration.service';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { UomOrmEntity } from '../../sales/entities';
import type { InventoryRepository } from '../repositories/inventory.repository';
import { AdjustStockByReferenceDto } from '../dto/stock-locations.dto';
import { CreateStockTransferDto } from '../dto/create-stock-transfer.dto';
import { INVENTORY_REPOSITORY } from './inventory.di-tokens';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    @Optional()
    @InjectRepository(UomOrmEntity)
    private readonly uomRepository?: Repository<UomOrmEntity>,
    @Optional()
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepository?: Repository<ItemOrmEntity>,
    @Optional()
    private readonly accountingIntegration?: AccountingIntegrationService,
  ) {}

  async list(organizationId: string, query: ListQueryDto): Promise<{ data: Array<Record<string, unknown>>; total: number }> {
    const result = await this.inventoryRepository.listStockBalances({
      organizationId,
      offset: query.offset,
      limit: query.limit,
    });

    return {
      data: result.items.map((item) => ({
        id: item.id,
        itemId: item.item.id,
        branchId: item.location.id,
        quantity: item.quantityOnHand,
        reorderLevel: 0,
        createdAt: null,
        updatedAt: null,
        archivedAt: null,
      })),
      total: result.total,
    };
  }

  async listAll(organizationId: string): Promise<Array<{ quantity: number }>> {
    const result = await this.inventoryRepository.listStockBalances({
      organizationId,
      offset: 0,
      limit: 10000,
    });

    return result.items.map((item) => ({
      quantity: item.quantityOnHand,
    }));
  }

  // Re-expresses every stock balance of `itemId` from the old base UOM into the
  // new base UOM, recording a 'base-conversion' adjustment per balance.
  async rebaseForBaseUomChange(payload: {
    itemId: string;
    oldBase: UomFactorInfo;
    newBase: UomFactorInfo;
    newBaseUomId?: string | null;
    performedByUserId?: string | null;
  }): Promise<number> {
    return this.inventoryRepository.rebaseStockForBaseUomChange(payload);
  }

  async adjustByReference(
    payload: AdjustStockByReferenceDto,
    performedByUserId: string,
    organizationId: string,
  ): Promise<StockBalanceType> {
    const stockBalance = await this.inventoryRepository.adjustStockByReference({
      organizationId,
      itemId: payload.itemId,
      locationId: payload.locationId,
      lotId: payload.lotId ?? null,
      deltaQuantity: payload.deltaQuantity,
      reason: payload.reason,
      performedByUserId,
      uomId: payload.uomId ?? null,
      reorderMinQty: payload.reorderMinQty ?? null,
      reorderMaxQty: payload.reorderMaxQty ?? null,
    });

    if (this.accountingIntegration) {
      this.accountingIntegration
        .recordStockAdjustment(organizationId, {
          stockBalanceId: stockBalance.id,
          deltaQuantity: payload.deltaQuantity,
          reason: payload.reason,
          averageCost: stockBalance.averageCost,
        })
        .catch((err: Error) => this.logger.error(`Accounting: failed to record adjust-by-ref: ${err.message}`, err.stack));
    }

    return toStockBalanceType(stockBalance);
  }

  async transfer(
    payload: CreateStockTransferDto,
    performedByUserId: string,
    organizationId: string,
  ): Promise<{ fromBalance: StockBalanceType; toBalance: StockBalanceType }> {
    const baseQuantity = await this.toBaseQuantity(payload.itemId, payload.quantity, payload.uomId);

    const result = await this.inventoryRepository.transferStock({
      organizationId,
      fromLocationId: payload.fromLocationId,
      toLocationId: payload.toLocationId,
      itemId: payload.itemId,
      lotId: payload.lotId ?? null,
      quantity: baseQuantity,
      reason: payload.reason ?? 'stock_transfer',
      performedByUserId,
      uomId: payload.uomId ?? null,
    });

    if (this.accountingIntegration) {
      this.accountingIntegration
        .recordStockTransfer(organizationId, {
          itemId: payload.itemId,
          quantity: baseQuantity,
          fromLocationId: payload.fromLocationId,
          toLocationId: payload.toLocationId,
        })
        .catch((err: Error) => this.logger.error(`Accounting: failed to record stock transfer: ${err.message}`, err.stack));
    }

    return {
      fromBalance: toStockBalanceType(result.fromBalance),
      toBalance: toStockBalanceType(result.toBalance),
    };
  }

  // Converts a quantity expressed in `uomId` into the item's base UOM units.
  // Falls back to treating the quantity as base units when no uomId (or no UOM
  // repositories available, e.g. in-memory mode) is provided.
  private async toBaseQuantity(
    itemId: string,
    quantity: number,
    uomId?: string,
  ): Promise<number> {
    if (!uomId || !this.uomRepository || !this.itemRepository) {
      return quantity;
    }

    const item = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: { baseUom: true },
    });
    if (!item) {
      throw new BadRequestException('Item not found');
    }

    const uom = await this.uomRepository.findOne({ where: { id: uomId } });
    if (!uom) {
      throw new BadRequestException('UOM not found');
    }

    const baseUom = item.baseUom ?? null;
    if (!baseUom || baseUom.id === uom.id) {
      return quantity;
    }

    if (baseUom.categoryId !== uom.categoryId) {
      throw new BadRequestException(
        `UOM "${uom.name}" is not in the same category as the item's base UOM`,
      );
    }

    return convertUomQuantity(quantity, uom, baseUom);
  }
}
